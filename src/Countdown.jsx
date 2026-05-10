import { useEffect, useState } from "react";

const targetDate = new Date("December 2, 2026 00:00:00");
const totalDays = 207;

const messages = [
  "Discipline builds your future.",
  "Time is your real enemy.",
  "No excuses today.",
  "Stay consistent.",
  "Focus now.",
  "Execute daily.",
  "Keep going.",
  "Lock in.",
  "Progress daily.",
];

export default function FocusCountdown({ setShow }) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak")) || 0;
  });

  const [doneDays, setDoneDays] = useState(() => {
    return JSON.parse(localStorage.getItem("doneDays")) || [];
  });

  const [lastDoneDate, setLastDoneDate] = useState(() => {
    return localStorage.getItem("lastDoneDate") || null;
  });

  const [message, setMessage] = useState(messages[0]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return;

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const random =
        messages[Math.floor(Math.random() * messages.length)];

      setMessage(random);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  function remainingHoursNoSundays() {
    let count = 0;
    let current = new Date();

    while (current <= targetDate) {
      if (current.getDay() !== 0) count++;
      current.setDate(current.getDate() + 1);
    }

    return count * 2;
  }

  function markDone() {
    const today = new Date().toDateString();

    if (doneDays.includes(today)) {
      setStatus("Already completed today");
      return;
    }

    const updatedDays = [...doneDays, today];
    const updatedStreak =
      lastDoneDate !== today ? streak + 1 : streak;

    localStorage.setItem(
      "doneDays",
      JSON.stringify(updatedDays)
    );

    localStorage.setItem(
      "streak",
      updatedStreak.toString()
    );

    localStorage.setItem(
      "lastDoneDate",
      today
    );

    setDoneDays(updatedDays);
    setStreak(updatedStreak);
    setLastDoneDate(today);
    setStatus("Marked Done");
  }

  const progress =
    ((totalDays - time.days) / totalDays) * 100;

  return (
    <div className="bg-slate-950 text-white min-h-screen p-4">
      <div className="max-w-5xl mx-auto">

        <h1 onClick={() => setShow(false)} className="text-4xl font-bold text-center mb-6">
          Focus Countdown
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(time).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-900 p-6 rounded-xl text-center"
            >
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-gray-400 capitalize">
                {key}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card
            title="Hours Left"
            value={remainingHoursNoSundays()}
          />

          <Card
            title="Streak"
            value={`${streak} days`}
          />

          <Card
            title="Days Done"
            value={doneDays.length}
          />

          <Card
            title="Remaining Days"
            value={time.days}
          />
        </div>

        <div className="mt-6">
          <p className="mb-2">
            {progress.toFixed(1)}%
          </p>

          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${Math.max(
                  0,
                  Math.min(100, progress)
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={markDone}
            className="bg-green-600 px-6 py-3 rounded-xl"
          >
            Mark Today Done
          </button>

          <p className="text-gray-400 mt-2">
            {status}
          </p>
        </div>

        <div className="mt-6 bg-gray-900 rounded-xl p-4 text-center">
          {message}
        </div>

      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl text-center">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
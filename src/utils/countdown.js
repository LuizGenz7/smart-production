export function getCountdown(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const now = new Date() < start ? start : new Date();
  const diff = end - now;

  if (diff <= 0) {
    return {
      D: "00",
      H: "00",
      M: "00",
      S: "00",
    };
  }

  const format = (num) => String(num).padStart(2, "0");

  return {
    D: format(Math.floor(diff / (1000 * 60 * 60 * 24))),
    H: format(
      Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ),
    M: format(
      Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    ),
    S: format(
      Math.floor((diff % (1000 * 60)) / 1000)
    ),
  };
}
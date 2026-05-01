import { useEffect, useRef, useState } from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  ArrowDownTrayIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BoltIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const smartMarkShots = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
];

const apps = [
  {
    id: "smartmark",
    title: "SmartMark App",
    icon: DevicePhoneMobileIcon,
    iconColor: "text-orange-400",

    appIcon: '/profile.webp',
    downloadUrl: 'https://drive.google.com/file/d/1QryNBkswzt_VX8nBvZmDPLjDJY6TXnhY/view?usp=sharing',
    description:
      "School management system for attendance, pupils, and reports.",

    version: "1.0.2",
    newVersion: true,
    releaseDate: "April 2026",

    requirement: "Android 7+",
    status: "Latest Stable Release",

    updates: [
      "Improved UI design",
      "Faster performance",
      "Bug fixes and stability improvements",
      "Enhanced attendance system",
    ],

    screenshots: smartMarkShots,

    type: "release",

    button: {
      text: "Download APK",
      color: "bg-green-500 hover:bg-green-600",
      icon: ArrowDownTrayIcon,
    },
  },

  {
    id: "smartreports",
    title: "Smart Reports",
    icon: ChartBarIcon,
    iconColor: "text-yellow-400",

    appIcon: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png",

    description: "Advanced analytics system for schools and institutions.",

    version: "0.1.0",
    newVersion: false,
    releaseDate: "In Development",

    requirement: "Android 7+",
    status: "Coming Soon",

    updates: [
      "Analytics engine in development",
      "Report system architecture design",
      "UI wireframe completed",
    ],

    screenshots: [1, 2, 3],

    type: "coming",

    button: null,
  },
];
const links = [
  { name: "Home", href: "#home", icon: HomeIcon },
  { name: "Apps", href: "#apps", icon: Squares2X2Icon },
  { name: "Releases", href: "#releases", icon: ArrowDownTrayIcon },
  { name: "Support", href: "#support", icon: ShieldCheckIcon },
  { name: "Contact", href: "#contact", icon: PhoneIcon },
];

export default function App() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const floatingImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800",
  ];
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-slate-950 text-white">
      {/* HEADER */}
      <header
        className={`sm:fixed py-1 top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300
  ${
    scrolled
      ? "bg-slate-950/70 border-b border-slate-800"
      : "bg-slate-950/40 border-b border-transparent"
  }`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-6 py-3">
          <div className="flex flex-col leading-tight text-center sm:text-left">
            <h1 className="text-orange-500 text-xl sm:text-2xl font-bold">
              Smart Production
            </h1>

            <p className="text-xs text-slate-400 tracking-wide">
              Building smart systems for modern education
            </p>
          </div>

          <nav className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-end gap-2 text-sm text-slate-300">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 hover:text-white transition"
                >
                  <div className="bg-slate-900/50 border text-slate-200 size-7 sm:size-8 flex items-center justify-center rounded-sm hover:border-slate-700 border-slate-800">
                    <Icon className="size-5 sm:size-6 p-1" />
                  </div>

                  <p className="text-slate-200 text-xs sm:text-sm">
                    {link.name}
                  </p>
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-20 overflow-hidden"
      >
        {/* BACKGROUND FLOATING CARDS */}
        <div className="absolute inset-0 overflow-hidden">
          {/* LEFT TO RIGHT MARQUEE */}
          <div className="absolute top-10 left-0 flex gap-4 sm:gap-6 animate-[marqueeX_25s_linear_infinite] opacity-20">
            {[...floatingImages, ...floatingImages].map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-48 sm:w-64 md:w-72 h-32 sm:h-40 md:h-44 object-cover rounded-2xl border border-slate-700 shadow-xl"
              />
            ))}
          </div>

          {/* RIGHT TO LEFT MARQUEE (reverse layer for depth) */}
          <div className="absolute bottom-10 left-0 flex gap-4 sm:gap-6 animate-[marqueeXReverse_30s_linear_infinite] opacity-10">
            {[...floatingImages, ...floatingImages].map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-56 sm:w-72 md:w-80 h-36 sm:h-44 md:h-52 object-cover rounded-3xl border border-slate-700 shadow-2xl"
              />
            ))}
          </div>

          {/* CENTER SOFT GLOW DEPTH */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-72 sm:w-96 md:w-125 h-72 sm:h-96 md:h-125 bg-linear-to-br from-orange-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        {/* HERO CONTENT (FRONT LAYER) */}
        <div className="relative z-10 px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Smart Production
          </h2>

          <p className="text-slate-400 mt-4 max-w-xl text-sm sm:text-base">
            Modern school systems, reporting tools, and productivity apps built
            for speed, clarity, and scale.
          </p>

          {/* EXTRA INFO STRIP */}
          <div className="mt-4 text-xs flex flex-col items-center justify-center text-slate-500 space-y-2">
            <div className="flex items-center gap-2 text-center">
              <ShieldCheckIcon className="w-4 h-4 text-green-400" />
              Built for schools, institutions & developers
            </div>

            <div className="flex items-center gap-2 text-center">
              <BoltIcon className="w-4 h-4 text-orange-400" />
              Optimized for Android & web systems
            </div>

            <div className="flex items-center gap-2 text-center">
              <CpuChipIcon className="w-4 h-4 text-yellow-400" />
              Lightweight, fast & secure architecture
            </div>
          </div>

          {/* FEATURE TAGS */}
          <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 text-xs px-2">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-full">
              <BoltIcon className="w-4 h-4 text-orange-400" />
              High Performance
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-full">
              <ShieldCheckIcon className="w-4 h-4 text-green-400" />
              Secure Data
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-full">
              <RocketLaunchIcon className="w-4 h-4 text-blue-400" />
              Rapid Development
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-full">
              <CpuChipIcon className="w-4 h-4 text-yellow-400" />
              Smart Automation
            </div>
          </div>

          {/* MINI STATS */}
          <div className="mt-6  flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <div className="flex flex-col items-center">
              <p className="text-white font-bold text-sm">2+ Apps</p>
              <p>Active Products</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-white font-bold text-sm">1.0.2</p>
              <p>Latest Release</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-white font-bold text-sm">Android 7+</p>
              <p>Compatibility</p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#apps"
            className="mt-10 inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold transition text-sm sm:text-base"
          >
            Explore Apps
          </a>
        </div>
      </section>

      {/* APPS */}
      <section
        id="apps"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-8 sm:space-y-10"
      >
        {apps.map((app) => {
          const Icon = app.icon;

          return (
            <div
              key={app.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 relative overflow-hidden"
            >
              {/* NEW VERSION BADGE */}
              {app.newVersion && (
                <span className="absolute top-4 right-4 text-[10px] sm:text-xs bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full">
                  NEW VERSION
                </span>
              )}

              {/* HEADER */}
              <div className="flex items-start sm:items-center gap-3">
                {/* APP ICON */}
                <img
                  src={app.appIcon}
                  alt="app icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-slate-700 object-cover"
                />

                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 truncate">
                    <Icon className={`w-5 h-5 ${app.iconColor}`} />
                    {app.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-500">
                    Released: {app.releaseDate}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-slate-400 mt-3 text-xs sm:text-sm">
                {app.description}
              </p>

              {/* META INFO */}
              <div className="mt-4 text-[11px] sm:text-xs text-slate-300 space-y-1">
                <p>Version: {app.version}</p>
                <p>Requirement: {app.requirement}</p>
                <p>Status: {app.status}</p>
              </div>

              {/* WHAT'S NEW */}
              {app.updates?.length > 0 && (
                <div className="mt-5">
                  <p className="text-[11px] sm:text-xs text-orange-400 font-semibold mb-2">
                    What’s New
                  </p>

                  <div className="space-y-1">
                    {app.updates.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300"
                      >
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREENSHOTS */}
              <div className="mt-6">
                <p className="text-[11px] sm:text-xs text-slate-400 mb-3">
                  Screenshots
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {app.type === "release"
                    ? app.screenshots.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="screenshot"
                          className="w-full h-28 sm:h-44 object-cover rounded-xl border border-slate-700 hover:scale-105 transition duration-300"
                        />
                      ))
                    : app.screenshots.map((_, i) => (
                        <div
                          key={i}
                          className="h-24 sm:h-40 bg-slate-800 rounded-xl animate-pulse"
                        />
                      ))}
                </div>
              </div>

              {/* BUTTON */}
              {app.type === "release" && (
                <a
                  href={app.downloadUrl || '#'}
                  className={`inline-flex items-center gap-2 mt-6 text-sm sm:text-base ${app.button.color} px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold`}
                >
                  <app.button.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {app.button.text}
                </a>
              )}
            </div>
          );
        })}
      </section>

      <section
        id="releases"
        className="no-scrollbar max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20"
      >
        {/* TITLE */}
        <h3 className="text-xl sm:text-2xl font-bold text-orange-500 flex items-center gap-2 mb-8">
          <ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          Releases & Downloads
        </h3>

        {/* HORIZONTAL SCROLL ROW */}
        <div className="flex no-scrollbar gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {apps.map((app) => (
            <div
              key={app.id}
              className="min-w-70 sm:min-w-85 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
            >
              {/* TOP */}
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={app.appIcon}
                    className="w-10 h-10 rounded-xl border border-slate-700"
                    alt="app"
                  />

                  <div className="min-w-0">
                    <h4 className="text-white font-bold flex items-center gap-2 truncate">
                      <app.icon className={`w-5 h-5 ${app.iconColor}`} />
                      {app.title}
                    </h4>

                    <p className="text-xs text-slate-500">
                      v{app.version} • {app.releaseDate}
                    </p>
                  </div>
                </div>

                {/* STATUS */}
                <div className="mt-3">
                  <span
                    className={`text-[11px] px-2 py-1 rounded-full
              ${
                app.type === "release"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
                  >
                    {app.type === "release" ? "Stable Release" : "Coming Soon"}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-slate-400 text-xs mt-3 line-clamp-3">
                  {app.description}
                </p>

                {/* MINI UPDATES */}
                {app.updates?.length > 0 && (
                  <div className="mt-4 space-y-1">
                    {app.updates.slice(0, 2).map((u, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-slate-300 flex gap-2"
                      >
                        <span className="text-green-400">•</span>
                        <span>{u}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* BOTTOM ACTION */}
              <div className="mt-5 flex items-center justify-between">
                {app.type === "release" ? (
                  <a
                    href={app.downloadUrl || '#'}
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-sm font-semibold"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Download
                  </a>
                ) : (
                  <button className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-sm">
                    Coming Soon
                  </button>
                )}

                <p className="text-[11px] text-slate-500">
                  Android {app.requirement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="support"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20"
      >
        {/* TITLE */}
        <h3 className="text-xl sm:text-2xl font-bold text-orange-500 flex items-center gap-2 mb-8">
          <RocketLaunchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          Support & Sponsor Me
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WHAT I CAN DO */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h4 className="font-bold text-white text-lg mb-3">What I Can Do</h4>

            <p className="text-slate-400 text-sm mb-4">
              I build modern digital systems focused on speed, clarity, and
              real-world use.
            </p>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CpuChipIcon className="w-4 h-4 text-yellow-400" />
                Full-stack web & mobile apps
              </div>

              <div className="flex items-center gap-2">
                <BoltIcon className="w-4 h-4 text-orange-400" />
                Fast UI/UX systems (React / Tailwind)
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                Secure backend systems (Firebase / APIs)
              </div>

              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-4 h-4 text-blue-400" />
                Data dashboards & school management tools
              </div>
            </div>
          </div>

          {/* SUPPORT / SPONSOR */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h4 className="font-bold text-white text-lg mb-3">
              Sponsor My Work
            </h4>

            <p className="text-slate-400 text-sm mb-4">
              Your support helps me build more powerful systems, improve apps,
              and release faster updates.
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/260962063468"
                className="flex items-center justify-between bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl hover:border-green-500 transition"
              >
                <span className="text-sm text-slate-300">Direct Support</span>
                <span className="text-green-400 text-sm font-semibold">
                  WhatsApp
                </span>
              </a>

              <a
                href="mailto:genzlewis@gmail.com"
                className="flex items-center justify-between bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl hover:border-yellow-500 transition"
              >
                <span className="text-sm text-slate-300">Business Email</span>
                <span className="text-yellow-400 text-sm font-semibold">
                  Contact
                </span>
              </a>

              <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl">
                <p className="text-xs text-slate-400">
                  Sponsorship helps cover:
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Hosting • Development • App releases • New features
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-8 sm:mb-10 flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          Contact Smart Production
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* WHATSAPP */}
          <a
            href="https://wa.me/260962063468"
            target="_blank"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-green-500 transition"
          >
            <h4 className="font-bold flex items-center gap-2 text-sm sm:text-base">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-400" />
              WhatsApp
            </h4>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm">
              Chat directly with Smart Production
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              +260 962 063 468
            </p>
          </a>

          {/* CALL */}
          <a
            href="tel:+260962063468"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-blue-500 transition"
          >
            <h4 className="font-bold flex items-center gap-2 text-sm sm:text-base">
              <PhoneIcon className="w-5 h-5 text-blue-400" />
              Direct Call
            </h4>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm">
              Tap to call instantly
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              +260 962 063 468
            </p>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:genzlewis@gmail.com"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-yellow-500 transition"
          >
            <h4 className="font-bold flex items-center gap-2 text-sm sm:text-base">
              <EnvelopeIcon className="w-5 h-5 text-yellow-400" />
              Email
            </h4>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm">
              Send us an email directly
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              genzlewis@gmail.com
            </p>
          </a>

          {/* FACEBOOK */}
          <a
            href="https://web.facebook.com/genzlewis/"
            target="_blank"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-blue-400 transition"
          >
            <h4 className="font-bold flex items-center gap-2 text-sm sm:text-base">
              <GlobeAltIcon className="w-5 h-5 text-blue-500" />
              Facebook
            </h4>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm">
              Visit our official page
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              Smart Production Official
            </p>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        ref={footerRef}
        className={`border-t border-slate-800 py-10 sm:py-12 text-center transition-all duration-700 px-4 sm:px-6
  ${visible ? "opacity-100" : "opacity-0 translate-y-10"}`}
      >
        <h4 className="text-orange-500 font-bold text-base sm:text-lg">
          Smart Production
        </h4>

        <p className="text-slate-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
          Building intelligent education systems and productivity tools for the
          future.
        </p>

        <p className="text-slate-600 text-[11px] sm:text-xs mt-5 sm:mt-6">
          © 2026 Smart Production. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

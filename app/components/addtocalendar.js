"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventConfig } from "./eventConfig";

const formatICSDate = (d) =>
  d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

const eventTitle = `${eventConfig.couple.joined} \u2014 Gender Reveal Party`;
const eventDescription = `Join ${eventConfig.couple.joined} for the big reveal! ${eventConfig.dressCode}`;
const eventLocation = `${eventConfig.venue.name}, ${eventConfig.venue.address} (${eventConfig.venue.transit})`;

const buildGoogleCalendarUrl = () => {
  const start = eventConfig.reveal.date;
  const end = eventConfig.reveal.endDate;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle,
    dates: `${formatICSDate(start)}/${formatICSDate(end)}`,
    details: eventDescription,
    location: eventLocation,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
};

const buildICSDataUri = () => {
  const start = eventConfig.reveal.date;
  const end = eventConfig.reveal.endDate;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Phyo and Mon//Gender Reveal//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:gender-reveal-${start.getTime()}@phyo-mon`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:${eventDescription}`,
    `LOCATION:${eventLocation.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};

const AddToCalendar = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-cream/40 text-cream font-montserrat tracking-[0.2em] text-xs uppercase hover:bg-white/20 transition-colors backdrop-blur-sm"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
        </svg>
        Add to Calendar
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 top-full mt-3 left-1/2 -translate-x-1/2 w-64 rounded-2xl bg-white shadow-2xl border border-charcoal/10 overflow-hidden"
          >
            <a
              href={buildGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-charcoal font-montserrat text-sm hover:bg-babyPink/20 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-babyPink/40 flex items-center justify-center text-xs font-semibold">
                G
              </span>
              <div className="flex flex-col items-start">
                <span className="font-medium">Google Calendar</span>
                <span className="text-xs text-charcoal/60">Opens in a new tab</span>
              </div>
            </a>
            <a
              href={buildICSDataUri()}
              download="phyo-mon-gender-reveal.ics"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-charcoal font-montserrat text-sm hover:bg-babyBlue/20 transition-colors border-t border-charcoal/10"
            >
              <span className="w-8 h-8 rounded-full bg-babyBlue/40 flex items-center justify-center text-xs font-semibold">
                A
              </span>
              <div className="flex flex-col items-start">
                <span className="font-medium">Apple / Outlook / Other</span>
                <span className="text-xs text-charcoal/60">Downloads .ics file</span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddToCalendar;

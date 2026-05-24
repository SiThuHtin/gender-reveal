"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "./eventConfig";

const getTimeLeft = (target) => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
};

const Cell = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-babyPink/30 via-transparent to-babyBlue/30" />
      <span className="relative font-playfair text-2xl sm:text-3xl md:text-4xl text-white drop-shadow">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 text-[10px] sm:text-xs font-montserrat tracking-[0.25em] uppercase text-white/80">
      {label}
    </span>
  </div>
);

const Countdown = ({ variant = "hero" }) => {
  const target = eventConfig.reveal.date;
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (variant === "section") {
    return (
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-babyPink/40 via-cream to-babyBlue/40 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-babyPink/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-babyBlue/40 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] font-montserrat uppercase text-charcoal/60 mb-3">
            The Big Reveal In
          </p>
          <h2 className="text-3xl md:text-5xl font-satisfy text-charcoal mb-8 md:mb-10">
            Boy or Girl?
          </h2>
          {time.done ? (
            <div className="text-2xl md:text-4xl font-playfair text-charcoal">
              It&apos;s time! The reveal is here.
            </div>
          ) : (
            <div className="flex justify-center gap-3 sm:gap-5 md:gap-6 [&_span]:!text-charcoal [&_div>div]:!bg-white/60 [&_div>div]:!border-white/80">
              <Cell value={time.days} label="Days" />
              <Cell value={time.hours} label="Hours" />
              <Cell value={time.minutes} label="Minutes" />
              <Cell value={time.seconds} label="Seconds" />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="mt-8 md:mt-10 flex justify-center gap-3 sm:gap-4 md:gap-5"
    >
      <Cell value={time.days} label="Days" />
      <Cell value={time.hours} label="Hours" />
      <Cell value={time.minutes} label="Minutes" />
      <Cell value={time.seconds} label="Seconds" />
    </motion.div>
  );
};

export default Countdown;

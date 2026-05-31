"use client";
import { motion } from "framer-motion";
import { eventConfig } from "./eventConfig";

const events = [
  {
    time: "6:00 PM – 7:00 PM",
    emoji: "✨",
    title: "Reception, Photo Time & Memory Messages",
    description: "Take photos together and leave your sweet wishes for the baby 💌",
  },
  {
    time: "7:00 PM – 7:30 PM",
    emoji: "🎂",
    title: "Gender Reveal Moment",
    description: "Time for the big surprise! Let's cut the cake together and discover whether Baby is a boy or a girl 💙💖",
  },
  {
    time: "7:30 PM – 9:00 PM",
    emoji: "🍽",
    title: "Dinner & Karaoke",
    description: "Enjoy delicious food, music, laughter, and fun together 🎤",
  },
  {
    time: "9:00 PM – 9:30 PM",
    emoji: "🎁",
    title: "Lucky Draw for the Correct Guess",
    description: "One guest who guessed the baby's gender correctly will win a special gift!",
  },
  {
    time: "9:30 PM – 10:00 PM",
    emoji: "🥂",
    title: "After Party & Free Time",
    description: "More songs, more laughter, and more happy moments together ✨",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Weddingevents = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream relative overflow-hidden py-16 md:py-24">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-babyPink/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-babyBlue/30 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 md:gap-16 px-6 md:px-16 relative z-10">

        {/* Left — heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-2/5 flex flex-col justify-center"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] font-montserrat uppercase text-charcoal/60 mb-3">
            What&apos;s Happening
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold text-charcoal leading-tight">
            Event Schedule
          </h2>
          <p className="text-xl sm:text-2xl font-satisfy text-babyPinkDeep mt-4 drop-shadow-sm">
            {eventConfig.reveal.displayDate}
          </p>
          <p className="font-montserrat text-charcoal/60 text-sm mt-2">
            {eventConfig.reveal.displayTime}
          </p>
        </motion.div>

        {/* Right — timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="md:w-3/5 flex flex-col gap-0"
        >
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative flex gap-4 pb-8 last:pb-0 group"
            >
              {/* Timeline line */}
              {idx < events.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-babyPinkDeep/40 to-babyBlueDeep/40" />
              )}

              {/* Emoji bubble */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-white shadow-md border border-charcoal/10 flex items-center justify-center text-lg z-10">
                {event.emoji}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <span className="font-montserrat text-xs tracking-[0.2em] uppercase text-charcoal/50">
                  {event.time}
                </span>
                <h3 className="font-satisfy text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-babyPinkDeep to-babyBlueDeep mt-1">
                  {event.title}
                </h3>
                <p className="font-montserrat text-sm text-charcoal/60 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Weddingevents;

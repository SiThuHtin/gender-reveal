"use client";
import { motion } from "framer-motion";

const milestones = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    label: "We Married",
    detail: "Two became one",
    accent: "babyPinkDeep",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
    label: "We're Expecting",
    detail: "A little one on the way",
    accent: "babyBlueDeep",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
      </svg>
    ),
    label: "The Big Reveal",
    detail: "Boy or Girl? You decide!",
    accent: "babyPinkDeep",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const GallerySection = () => {
  return (
    <section className="relative bg-cream min-h-[80vh] py-16 md:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-babyPink/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-babyBlue/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] font-montserrat uppercase text-charcoal/60 mb-3">
            Our Journey
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-satisfy text-charcoal leading-tight">
            Two hearts became one,
            <br className="hidden sm:block" />
            and now we&apos;re becoming three.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="relative bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-8 md:p-10 text-center shadow-xl overflow-hidden group hover:-translate-y-1 transition-transform"
            >
              {/* Soft glow */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-60"
                style={{ backgroundColor: m.accent === "babyPinkDeep" ? "#f7c8d3" : "#bcdcef" }}
              />
              <div
                className="relative z-10 mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: m.accent === "babyPinkDeep" ? "#e89eb1" : "#7fb6d8" }}
              >
                {m.icon}
              </div>
              <div className="relative z-10 font-satisfy text-2xl md:text-3xl text-charcoal mb-2">
                {m.label}
              </div>
              <div className="relative z-10 font-playfair italic text-charcoal/70 text-sm md:text-base">
                {m.detail}
              </div>
              <div className="relative z-10 mt-5 font-montserrat tracking-[0.3em] uppercase text-[10px] text-charcoal/40">
                Step {idx + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;

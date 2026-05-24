"use client";

import { motion } from "framer-motion";
import Countdown from "./countdown";
import { eventConfig } from "./eventConfig";

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-16">
            {/* Gradient background \u2014 no photo */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-babyPink via-cream to-babyBlue" />
                <div className="absolute inset-0 bg-gradient-to-tr from-babyPinkDeep/20 via-transparent to-babyBlueDeep/20" />
            </div>

            {/* Floating decorative blobs */}
            <motion.div
                animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 md:top-20 md:left-20 w-40 h-40 md:w-72 md:h-72 bg-babyPinkDeep/40 rounded-full blur-3xl z-0"
            />
            <motion.div
                animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-40 h-40 md:w-72 md:h-72 bg-babyBlueDeep/40 rounded-full blur-3xl z-0"
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] bg-white/30 rounded-full blur-[120px] z-0"
            />

            {/* Floating dots */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[
                    { left: "10%", top: "20%", size: 10, bg: "#e89eb1", delay: 0 },
                    { left: "80%", top: "30%", size: 14, bg: "#7fb6d8", delay: 1 },
                    { left: "15%", top: "70%", size: 8, bg: "#7fb6d8", delay: 2 },
                    { left: "85%", top: "75%", size: 12, bg: "#e89eb1", delay: 0.5 },
                    { left: "50%", top: "12%", size: 8, bg: "#7fb6d8", delay: 1.5 },
                    { left: "30%", top: "85%", size: 10, bg: "#e89eb1", delay: 2.5 },
                ].map((dot, i) => (
                    <motion.span
                        key={i}
                        style={{
                            left: dot.left,
                            top: dot.top,
                            width: dot.size,
                            height: dot.size,
                            backgroundColor: dot.bg,
                        }}
                        className="absolute rounded-full opacity-70"
                        animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: dot.delay,
                        }}
                    />
                ))}
            </div>

            {/* Content card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] max-w-3xl text-center mx-4 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)",
                    backdropFilter: "blur(16px)",
                }}
            >
                {/* Eyebrow text */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-[10px] md:text-sm text-charcoal/70 font-montserrat tracking-[0.25em] md:tracking-[0.35em] uppercase mb-4 md:mb-6"
                >
                    Baby On The Way &middot; Gender Reveal
                </motion.div>

                {/* Couple names */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="text-5xl sm:text-6xl md:text-8xl font-satisfy mb-6 md:mb-8 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-babyPinkDeep via-charcoal to-babyBlueDeep"
                >
                    {eventConfig.couple.joined}
                </motion.div>

                {/* The big question */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.85, duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-playfair text-charcoal mb-6 md:mb-8"
                >
                    <span className="text-babyPinkDeep">Boy</span>
                    <span className="text-charcoal/60 italic mx-3">or</span>
                    <span className="text-babyBlueDeep">Girl?</span>
                </motion.div>

                {/* Date badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.95, duration: 0.8 }}
                    className="inline-block border border-charcoal/30 px-6 py-2 md:px-8 md:py-3 rounded-full mb-6 md:mb-8 bg-white/40"
                >
                    <span className="font-playfair text-charcoal text-lg md:text-2xl tracking-wide">
                        {eventConfig.reveal.displayDate}
                    </span>
                </motion.div>

                {/* Quote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 1 }}
                    className="text-base sm:text-lg md:text-xl font-playfair text-charcoal/80 italic leading-relaxed"
                >
                    &ldquo;{eventConfig.quote.text}&rdquo;
                </motion.p>

                {/* Countdown */}
                <div className="[&_div>div]:!bg-white/50 [&_div>div]:!border-white/80 [&_span]:!text-charcoal [&_div>span]:!text-charcoal/60">
                    <Countdown />
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-charcoal/60 font-montserrat tracking-[0.2em] text-[10px] uppercase">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-charcoal/70"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;

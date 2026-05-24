"use client";

import Image from "next/image";
import HeroImage from "../../public/heroimage.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax feel */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HeroImage}
                    alt="Wedding Rings"
                    fill
                    priority
                    className="object-cover scale-105"
                />
                {/* Sophisticated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#2d3436]"></div>
            </div>

            {/* Glowing Orbs behind the card for extra depth */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-champagne/20 rounded-full blur-[100px] z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-[100px] z-0"></div>

            {/* Glassmorphic Content Card */}
            <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 glass-panel p-6 sm:p-10 md:p-20 rounded-[2rem] md:rounded-[2.5rem] max-w-3xl text-center mx-4 border-t border-l border-white/20 border-r border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* Eyebrow Text */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-[10px] md:text-sm text-champagne font-montserrat tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 md:mb-6"
                >
                    We Are Getting Married
                </motion.div>

                {/* Main Title with Gold Gradient */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="text-5xl sm:text-6xl md:text-8xl font-satisfy mb-6 md:mb-10 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                    Shun & Ye
                </motion.div>

                {/* Date Badge */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="inline-block border border-champagne/40 px-6 py-2 md:px-8 md:py-3 rounded-full mb-6 md:mb-10"
                >
                    <span className="font-playfair text-white text-lg md:text-2xl tracking-wide">
                        March 05, 2025
                    </span>
                </motion.div>

                {/* Quote */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 1 }}
                    className="text-base sm:text-lg md:text-2xl font-playfair text-white/90 italic leading-relaxed"
                >
                    "A Great Marriage is not when the perfect couple comes together.
                    <br />
                    It is when an imperfect couple learns to enjoy their differences."
                </motion.p>

                {/* Quote Author */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="mt-8 flex items-center justify-center space-x-4"
                >
                    <div className="h-[1px] w-12 bg-champagne/50"></div>
                    <span className="text-xs font-montserrat text-champagne/80 uppercase tracking-widest">
                        Dave Meurer
                    </span>
                    <div className="h-[1px] w-12 bg-champagne/50"></div>
                </motion.div>
            </motion.div>
            
            {/* Elegant Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-white/60 font-montserrat tracking-[0.2em] text-[10px] uppercase">Scroll</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-champagne/80"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default HeroSection;
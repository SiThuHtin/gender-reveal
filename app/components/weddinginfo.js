"use client";
import { motion } from "framer-motion";
import ColorPalette from "./colorpalette";
import AddToCalendar from "./addtocalendar";
import { eventConfig } from "./eventConfig";

const Weddinginfo = () => {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-charcoal px-6 py-16 md:py-24 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-babyPinkDeep/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-babyBlueDeep/20 rounded-full blur-3xl" />

            {/* Centered card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-2xl w-full text-center"
            >
                <p className="text-xs md:text-sm tracking-[0.3em] font-montserrat uppercase text-babyPink/80 mb-4">
                    Save The Date
                </p>

                <h2 className="text-4xl sm:text-5xl md:text-6xl text-cream font-satisfy mb-8 md:mb-10 leading-tight drop-shadow-md">
                    {eventConfig.couple.joined}
                    <br />
                    are revealing baby
                </h2>

                {/* Pink + blue framed details */}
                <div className="relative inline-block py-8 px-8 md:px-12 mb-10 md:mb-12">
                    {/* Corner frames */}
                    <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-babyPink rounded-tl-xl" />
                    <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-babyBlue rounded-tr-xl" />
                    <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-babyPink rounded-bl-xl" />
                    <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-babyBlue rounded-br-xl" />

                    <div className="space-y-2 font-montserrat tracking-wide">
                        <div className="text-babyPink text-xl md:text-2xl font-light">
                            {eventConfig.reveal.displayDate}
                        </div>
                        <div className="text-cream text-base md:text-lg font-light opacity-90">
                            {eventConfig.reveal.displayTime}
                        </div>
                        <div className="h-px w-16 bg-cream/30 mx-auto my-3" />
                        <div className="text-cream text-lg md:text-xl font-light opacity-90">
                            {eventConfig.venue.name}
                        </div>
                        <div className="text-cream/60 text-xs md:text-sm font-light">
                            {eventConfig.venue.nameJp}
                        </div>
                        <div className="text-cream/80 text-xs md:text-sm font-light max-w-xs mx-auto leading-relaxed pt-2">
                            {eventConfig.venue.address}
                        </div>
                        <div className="text-babyBlue/90 text-xs md:text-sm font-playfair italic pt-1">
                            {eventConfig.venue.transit}
                        </div>
                    </div>
                </div>

                {/* Action buttons \u2014 calendar + directions */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    <AddToCalendar />
                    <motion.a
                        href={eventConfig.venue.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-cream/40 text-cream font-montserrat tracking-[0.2em] text-xs uppercase hover:bg-white/20 transition-colors backdrop-blur-sm"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Get Directions
                    </motion.a>
                </div>

                <div className="mb-10">
                    <p className="text-xs md:text-sm tracking-[0.3em] font-montserrat uppercase text-babyBlue/80 mb-3">
                        Dress Code
                    </p>
                    <p className="text-cream text-base md:text-lg font-playfair italic opacity-90">
                        {eventConfig.dressCode}
                    </p>
                </div>

                <div className="flex justify-center">
                    <ColorPalette />
                </div>
            </motion.div>
        </section>
    );
};

export default Weddinginfo;

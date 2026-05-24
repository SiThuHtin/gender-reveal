"use client";
import { motion } from "framer-motion";
import { eventConfig } from "./eventConfig";

const Weddingevents = () => {
    const events = [
        { time: "6:30 PM", title: "GUESTS ARRIVE" },
        { time: "7:00 PM", title: "WELCOME DRINKS & PHOTOS" },
        { time: "7:30 PM", title: "TEAM PINK vs TEAM BLUE GAMES" },
        { time: "8:00 PM", title: "PARENTS-TO-BE SPEECH" },
        { time: "8:30 PM", title: "THE BIG REVEAL" },
        { time: "9:00 PM", title: "DINNER & CELEBRATION" },
        { time: "10:00 PM", title: "PARTY ENDS" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen md:h-screen w-full flex items-center justify-center bg-cream relative overflow-hidden">
            {/* Subtle mesh background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-babyPink/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-babyBlue/30 rounded-full blur-3xl"></div>

            <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between p-6 md:p-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 flex flex-col justify-center mb-8 md:mb-0"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold text-charcoal leading-tight">
                        Reveal Party Schedule
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl font-satisfy text-babyPinkDeep mt-4 md:mt-6 drop-shadow-sm">
                        {eventConfig.reveal.displayDate}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="md:w-1/2 space-y-0"
                >
                    {events.map((event, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="border-b border-charcoal/20 py-5 text-charcoal flex justify-between items-center group"
                        >
                            <span className="font-montserrat font-medium text-base md:text-xl group-hover:text-babyPinkDeep transition-colors">
                                {event.time}
                            </span>
                            <span className="font-montserrat tracking-wide md:tracking-wider text-xs sm:text-sm md:text-base font-light opacity-80 group-hover:opacity-100 transition-opacity">
                                {event.title}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Weddingevents;
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Contact from "../../public/contact.jpeg";
import ColorPalette from "./colorpalette";

const Weddinginfo = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-charcoal p-6 md:p-12 overflow-hidden">
            {/* Wedding Info Section */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="md:w-1/2 text-center space-y-8 flex flex-col items-center justify-center relative z-10"
            >
                <div className="text-left max-w-lg px-4 md:px-0">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-cream font-satisfy mb-6 md:mb-8 leading-tight drop-shadow-md">
                        Save the date! <br /> Shun & Ye are getting married on
                    </h2>
                    
                    <div className="text-left mb-10 md:mb-12 space-y-3 font-montserrat tracking-wide">
                        <div className="text-champagne text-xl md:text-2xl font-light">
                            March 05, 2025 at 5:00 PM
                        </div>
                        <div className="text-cream text-lg md:text-xl font-light opacity-90">
                            Golden Inya, Yangon
                        </div>
                        <div className="text-cream text-lg md:text-xl font-light opacity-90">
                            Dress code : Formal attire
                        </div>
                    </div>

                    <ColorPalette />
                </div>
            </motion.div>

            {/* Image Section */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative z-10 px-4 md:px-0"
            >
                <div className="relative w-64 md:w-96 aspect-[3/4]">
                    <div className="absolute inset-0 bg-champagne rounded-2xl rotate-3 opacity-50"></div>
                    <Image
                        src={Contact}
                        alt="Couple Photo"
                        fill
                        className="object-cover rounded-2xl shadow-2xl relative z-10"
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default Weddinginfo;
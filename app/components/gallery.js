"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import One from "../../public/1.jpeg";
import Two from "../../public/2.jpg";
import Three from "../../public/3.jpeg";
import Four from "../../public/4.jpeg";

const GallerySection = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-cream min-h-screen py-12 md:py-20 overflow-hidden">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto p-4 md:p-6"
      >
        {/* Top Row: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <motion.div variants={scaleUp} className="col-span-1 h-48 sm:h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src={One}
              alt="Wedding Moment 1"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
          <motion.div variants={scaleUp} className="col-span-1 md:col-span-2 h-48 sm:h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src={Two}
              alt="Wedding Moment 2"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-charcoal text-2xl sm:text-3xl md:text-5xl font-satisfy py-12 md:py-16 leading-relaxed px-4"
        >
          Love is like a movie,<br className="hidden sm:block"/> a journey of heartbeats <br className="hidden sm:block"/> & timeless memories
        </motion.div>

        {/* Bottom Row: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <motion.div variants={scaleUp} className="col-span-1 md:col-span-2 h-48 sm:h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src={Four}
              alt="Wedding Moment 4"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
          <motion.div variants={scaleUp} className="col-span-1 h-48 sm:h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src={Three}
              alt="Wedding Moment 3"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default GallerySection;
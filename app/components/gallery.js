"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useT } from "../context/LanguageContext";

const GallerySection = () => {
  const t = useT("gallery");
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
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] font-montserrat uppercase text-charcoal/60 mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-satisfy text-charcoal leading-tight">
            {t.heading1}
            <br className="hidden sm:block" />
            {t.heading2}
          </h2>
        </motion.div>

        {/* Featured couple photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white">
            <Image
              src="/photo2.jpg"
              alt="Phyo & Mon holding their baby's first ultrasound"
              width={1335}
              height={907}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Soft gradient overlay at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            <p className="absolute bottom-4 left-0 right-0 text-center font-satisfy text-white text-2xl md:text-3xl drop-shadow-lg">
              Our little miracle 💕
            </p>
          </div>
          {/* Decorative corner accents */}
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-babyPink/50 rounded-full blur-xl" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-babyBlue/50 rounded-full blur-xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;

'use client';
import { useState } from 'react';
import Image from 'next/image';
import Wishes from '../../public/formphoto.jpeg';
import { motion } from 'framer-motion';

const WeddingSection = ({ onSubmit }) => {
  const [wish, setWish] = useState('');

  const handleInputChange = (e) => {
    setWish(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(wish); 
    setWish('');
  };

  return (
    <div className="relative flex flex-col md:flex-row py-8 md:py-16 md:h-screen min-h-screen bg-cream items-center justify-center overflow-hidden">
      
      {/* Background Image - optional blurred layer to make it premium */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src={Wishes}
          alt="Wedding Photo Background"
          fill
          className="object-cover blur-xl"
          priority
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl bg-white/80 glass-panel rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl m-4"
      >
        {/* Photo section */}
        <div className="h-48 sm:h-64 md:h-auto md:w-1/2 w-full relative">
          <Image
            src={Wishes}
            alt="Wedding Photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Form section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-6 sm:p-8 md:p-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-satisfy text-charcoal mb-6 md:mb-8 text-center drop-shadow-sm">
            Leave a Message
          </h2>
          <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-6">
            <textarea
              value={wish}
              onChange={handleInputChange}
              rows="5"
              placeholder="Share Your Blessings & Wishes for us..."
              className="w-full p-4 md:p-6 bg-white/50 backdrop-blur-sm border border-champagne/40 rounded-xl md:rounded-2xl text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-champagne resize-none leading-relaxed font-playfair italic text-base md:text-lg shadow-inner"
              required
            />
            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-charcoal text-champagne font-montserrat tracking-widest font-semibold rounded-full hover:bg-black transition-colors shadow-xl"
              >
                SEND WITH LOVE
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default WeddingSection;
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Attending from '../../public/attending.jpeg';

export default function RSVPSection({ onRSVPSubmit }) {
  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(''); 
  
  useEffect(() => {
    const handleFocus = (e) => {
      setTimeout(() => {
        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    };
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('focus', handleFocus);
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', handleFocus);
      });
    };
  }, []);

  const handleSubmit = async () => {
    if (!response || !name) {
      return alert('Please provide your name and select Joyfully Accept or Regretfully Decline.');
    }
    onRSVPSubmit({ name, response, numberOfGuests });
    setName('');
    setResponse(null);
    setNumberOfGuests('');
  };

  return (
    <div className="relative md:h-screen min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={Attending}
          alt="Wedding Rings"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-6 sm:p-8 m-4 glass-panel rounded-3xl shadow-2xl"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-satisfy mb-6 text-white text-center drop-shadow-md">
          Will you be attending?
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-6">
          <motion.div>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 bg-white/20 backdrop-blur-md text-white placeholder-white/70 font-montserrat text-base rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-champagne transition-all shadow-inner"
              required
            />
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-6 space-y-4 font-montserrat text-white text-base md:text-lg">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${response === 'Yes' ? 'border-champagne bg-champagne/20' : 'border-white/70'}`}>
                 {response === 'Yes' && <div className="w-3 h-3 rounded-full bg-champagne"></div>}
              </div>
              <input
                type="radio"
                name="response"
                value="Yes"
                checked={response === 'Yes'}
                onChange={() => setResponse('Yes')}
                className="hidden"
              />
              <span className="group-hover:text-champagne transition-colors">Joyfully Accept</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${response === 'No' ? 'border-champagne bg-champagne/20' : 'border-white/70'}`}>
                 {response === 'No' && <div className="w-3 h-3 rounded-full bg-champagne"></div>}
              </div>
              <input
                type="radio"
                name="response"
                value="No"
                checked={response === 'No'}
                onChange={() => setResponse('No')}
                className="hidden"
              />
              <span className="group-hover:text-champagne transition-colors">Regretfully Decline</span>
            </label>
          </div>

          {response === 'Yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="number"
                placeholder="Number of Guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                min="1"
                className="w-full px-5 py-4 bg-white/20 backdrop-blur-md text-white placeholder-white/70 font-montserrat text-base rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-champagne transition-all shadow-inner"
                required
              />
            </motion.div>
          )}

          {response && (
            <motion.button
              type="button"
              onClick={handleSubmit}
              className="w-full px-5 py-4 mt-4 bg-champagne text-white rounded-2xl font-montserrat tracking-widest font-semibold text-lg transition hover:bg-[#b5952f] shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SEND RSVP
            </motion.button>
          )}
        </form>
      </motion.div>
    </div>
  );
}
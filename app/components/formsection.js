'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useT } from '../context/LanguageContext';
import { eventConfig } from './eventConfig';

export default function RSVPSection() {
  const t = useT("rsvp");
  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [wish, setWish] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!response || !name.trim()) {
      setError(t.validationError);
      return;
    }

    setSending(true);
    try {
      // Run both in parallel: save a backup to our database + send the email.
      // The RSVP is never lost as long as one of them succeeds.
      const [emailResult, saveResult] = await Promise.allSettled([
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            name: name.trim(),
            response: response === 'Yes' ? 'Joyfully Accept ✅' : 'Regretfully Decline ❌',
            attending: response,
            guests: response === 'Yes' ? (numberOfGuests || '1') : '-',
            wish: wish.trim() || 'No wish left',
            event_date: eventConfig.reveal.displayDate,
            event_time: eventConfig.reveal.displayTime,
            venue: eventConfig.venue.name,
          },
          { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
        ),
        fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), response, numberOfGuests, wish: wish.trim() }),
        }),
      ]);

      const emailed = emailResult.status === 'fulfilled';
      const saved = saveResult.status === 'fulfilled' && saveResult.value.ok;

      if (!emailed) console.error('EmailJS error:', emailResult.reason);
      if (!saved) console.error('Backup save failed:', saveResult.reason || saveResult.value?.status);

      // Only fail if BOTH failed — otherwise the RSVP is safely recorded.
      if (!emailed && !saved) {
        throw new Error('Failed to submit. Please check your connection and try again.');
      }

      setSuccess({ name: name.trim(), response });
      setName('');
      setResponse(null);
      setNumberOfGuests('');
      setWish('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setSuccess(null);
    setError('');
  };

  return (
    <section id="rsvp" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24 scroll-mt-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-babyBlueDeep via-charcoal to-babyPinkDeep" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-babyPink/30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-babyBlue/30 rounded-full blur-3xl z-0" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg p-6 sm:p-8 md:p-10 m-4 glass-panel rounded-3xl shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center py-6 sm:py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-babyPink to-babyBlue flex items-center justify-center shadow-lg ring-4 ring-white/30"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <p className="text-xs md:text-sm tracking-[0.25em] font-montserrat uppercase text-white/70 mb-3">
                {t.received}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-satisfy text-white mb-3">
                {t.thankYou(success.name)}
              </h2>
              <p className="font-playfair italic text-white/90 text-base md:text-lg leading-relaxed mb-2">
                {success.response === 'Yes' ? t.attendingMsg : t.decliningMsg}
              </p>
              <p className="font-montserrat text-white/70 text-sm mb-8">
                {t.sentTo}
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-montserrat tracking-widest uppercase text-white/60 hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                {t.submitAnother}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-satisfy mb-2 text-white text-center drop-shadow-md">
                {t.heading}
              </h1>
              <p className="text-center text-white/80 font-playfair italic text-sm md:text-base mb-8">
                {t.subtitle}
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-red-500/20 border border-red-300/40 px-4 py-3 text-white text-sm font-montserrat text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-white/20 backdrop-blur-md text-white placeholder-white/70 font-montserrat text-base rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-babyPink transition-all shadow-inner"
                  required
                />

                <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-6 space-y-4 font-montserrat text-white text-base md:text-lg">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${response === 'Yes' ? 'border-babyPink bg-babyPink/20' : 'border-white/70'}`}>
                      {response === 'Yes' && <div className="w-3 h-3 rounded-full bg-babyPink"></div>}
                    </div>
                    <input
                      type="radio"
                      name="response"
                      value="Yes"
                      checked={response === 'Yes'}
                      onChange={() => setResponse('Yes')}
                      className="hidden"
                    />
                    <span className="group-hover:text-babyPink transition-colors">{t.accept}</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${response === 'No' ? 'border-babyBlue bg-babyBlue/20' : 'border-white/70'}`}>
                      {response === 'No' && <div className="w-3 h-3 rounded-full bg-babyBlue"></div>}
                    </div>
                    <input
                      type="radio"
                      name="response"
                      value="No"
                      checked={response === 'No'}
                      onChange={() => setResponse('No')}
                      className="hidden"
                    />
                    <span className="group-hover:text-babyBlue transition-colors">{t.decline}</span>
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
                      placeholder={t.guestCount}
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(e.target.value)}
                      min="1"
                      max="10"
                      className="w-full px-5 py-4 bg-white/20 backdrop-blur-md text-white placeholder-white/70 font-montserrat text-base rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-babyPink transition-all shadow-inner"
                      required
                    />
                  </motion.div>
                )}

                <div className="pt-4 mt-2 rounded-2xl bg-white/10 border border-white/25 px-4 py-5 sm:px-5 sm:py-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-babyPink to-transparent" />
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-babyPink shrink-0">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-babyBlue to-transparent" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-satisfy text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-white to-babyBlue drop-shadow-sm">
                    {t.wishTitle}
                  </h2>
                  <p className="text-center text-white/70 font-montserrat text-xs tracking-[0.2em] uppercase mb-4">
                    {t.wishEyebrow}
                  </p>
                  <textarea
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    rows="4"
                    placeholder={t.wishPlaceholder}
                    className="w-full p-4 bg-white/25 backdrop-blur-md text-white placeholder-white/60 font-playfair italic text-base rounded-2xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-babyPink resize-none leading-relaxed shadow-inner"
                  />
                </div>

                {response && (
                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full px-5 py-4 mt-2 bg-gradient-to-r from-babyPinkDeep to-babyBlueDeep text-white rounded-2xl font-montserrat tracking-widest font-semibold text-lg transition hover:opacity-90 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={sending ? {} : { scale: 1.02 }}
                    whileTap={sending ? {} : { scale: 0.98 }}
                  >
                    {sending ? t.sending : t.send}
                  </motion.button>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

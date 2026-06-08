"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { eventConfig } from "./eventConfig";

const W = 340;
const H = 230;
const CX = W / 2;
const CY = H / 2;

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [opening, setOpening] = useState(false);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(true);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
    setTimeout(() => setEntered(true), 3400);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/song.mp3" preload="auto" />

      {/* ── Envelope screen ── */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #f7c8d3 0%, #f8f4f0 50%, #bcdcef 100%)",
            }}
          >
            {/* Floating blobs */}
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-72 h-72 bg-babyPinkDeep/25 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ y: [0, -24, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-10 w-72 h-72 bg-babyBlueDeep/25 rounded-full blur-3xl pointer-events-none"
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10 flex flex-col items-center"
            >
              <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-charcoal/50 mb-10">
                You&apos;re Invited
              </p>

              {/* ── Envelope ── */}
              <div
                className="relative cursor-pointer"
                style={{ width: W, height: H, perspective: 1100 }}
                onClick={handleOpen}
              >
                {/* Ground shadow */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black/20 blur-2xl"
                  style={{ width: W * 0.9, height: 30, bottom: -20 }}
                />

                {/* Back wall */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "#ffffff", zIndex: 1 }}
                />

                {/* Card — hidden behind front, slides up */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={opening ? { y: -170 } : { y: 0 }}
                  transition={{ delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bg-white rounded-lg overflow-hidden"
                  style={{
                    width: 264,
                    height: 158,
                    left: (W - 264) / 2,
                    top: (H - 158) / 2,
                    zIndex: 2,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.14)",
                  }}
                >
                  <Image src="/photo1.jpg" alt="Boy or Girl Gender Reveal" fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 pt-6 pb-2 bg-gradient-to-t from-white via-white/90 to-transparent">
                    <p className="font-satisfy text-xl text-charcoal text-center leading-none">
                      {eventConfig.couple.joined}
                    </p>
                    <p className="font-montserrat text-[8px] text-charcoal/50 text-center tracking-wider mt-1">
                      {eventConfig.reveal.displayDate}
                    </p>
                  </div>
                </motion.div>

                {/* Front folds (SVG) with depth shading + crease shadows */}
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: 3, filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.10))" }}
                >
                  <defs>
                    {/* Left fold — pink (Team Girl) */}
                    <linearGradient id="fL" x1="0" y1="0.5" x2="1" y2="0.5">
                      <stop offset="0" stopColor="#fde0ea" />
                      <stop offset="1" stopColor="#f6c2d6" />
                    </linearGradient>
                    {/* Right fold — blue (Team Boy) */}
                    <linearGradient id="fR" x1="1" y1="0.5" x2="0" y2="0.5">
                      <stop offset="0" stopColor="#dcefff" />
                      <stop offset="1" stopColor="#b6dcf2" />
                    </linearGradient>
                    {/* Bottom fold — soft clean blush */}
                    <linearGradient id="fB" x1="0.5" y1="1" x2="0.5" y2="0">
                      <stop offset="0" stopColor="#fce6f0" />
                      <stop offset="1" stopColor="#f1d6e6" />
                    </linearGradient>
                    <clipPath id="round">
                      <rect x="0" y="0" width={W} height={H} rx="16" />
                    </clipPath>
                  </defs>

                  <g clipPath="url(#round)">
                    <path d={`M0 0 L0 ${H} L${CX} ${CY} Z`} fill="url(#fL)" />
                    <path d={`M${W} 0 L${W} ${H} L${CX} ${CY} Z`} fill="url(#fR)" />
                    <path d={`M0 ${H} L${W} ${H} L${CX} ${CY} Z`} fill="url(#fB)" />

                    {/* Crease shadows (soft, cool) + highlights (white) along each seam */}
                    <g strokeLinecap="round" fill="none">
                      {/* soft cool shadows just below each ridge */}
                      <g stroke="rgba(150,140,170,0.12)" strokeWidth="2">
                        <line x1={CX} y1={CY} x2="0" y2={H} />
                        <line x1={CX} y1={CY} x2={W} y2={H} />
                      </g>
                      {/* highlights along the top ridges */}
                      <g stroke="rgba(255,255,255,0.7)" strokeWidth="1.2">
                        <line x1={CX} y1={CY} x2="0" y2="0" />
                        <line x1={CX} y1={CY} x2={W} y2="0" />
                      </g>
                    </g>
                  </g>
                  <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="16" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                </svg>

                {/* Shadow the closed flap casts on the body (key depth cue) */}
                <motion.div
                  animate={opening ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 w-full pointer-events-none"
                  style={{ height: CY, zIndex: 4 }}
                >
                  <svg viewBox={`0 0 ${W} ${CY}`} className="w-full h-full" style={{ overflow: "visible" }}>
                    <path
                      d={`M0 0 L${W} 0 L${CX} ${CY} Z`}
                      fill="rgba(120,120,150,0.18)"
                      transform="translate(0,7)"
                      style={{ filter: "blur(5px)" }}
                    />
                  </svg>
                </motion.div>

                {/* Top flap — opens */}
                <motion.div
                  initial={{ rotateX: 0, opacity: 1 }}
                  animate={
                    opening ? { rotateX: -176, opacity: 0 } : { rotateX: 0, opacity: 1 }
                  }
                  transition={{
                    rotateX: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
                    opacity: { delay: 0.62, duration: 0.4 },
                  }}
                  className="absolute left-0 top-0 w-full"
                  style={{ height: CY, transformOrigin: "50% 0%", zIndex: 6 }}
                >
                  <svg viewBox={`0 0 ${W} ${CY}`} className="w-full h-full">
                    <defs>
                      <linearGradient id="flap" x1="0" y1="0.3" x2="1" y2="0.6">
                        <stop offset="0" stopColor="#f7c6d8" />
                        <stop offset="1" stopColor="#bbddf2" />
                      </linearGradient>
                      <linearGradient id="flapShade" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="0.6" stopColor="rgba(255,255,255,0)" />
                        <stop offset="1" stopColor="rgba(150,140,170,0.1)" />
                      </linearGradient>
                    </defs>
                    <path d={`M0 0 L${W} 0 L${CX} ${CY} Z`} fill="url(#flap)" />
                    <path d={`M0 0 L${W} 0 L${CX} ${CY} Z`} fill="url(#flapShade)" />
                    <path d={`M0 0 L${W} 0 L${CX} ${CY} Z`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                {/* Heart seal — clean white disc with pink→blue gradient heart */}
                <motion.div
                  animate={opening ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    left: CX - 28,
                    top: CY - 28,
                    zIndex: 7,
                    background: "linear-gradient(145deg, #ffffff, #fdf3f6)",
                    boxShadow:
                      "0 6px 14px rgba(140,120,160,0.22), inset 0 0 0 1px rgba(255,255,255,0.9)",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <defs>
                      <linearGradient id="sealHeart" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#ef9bb4" />
                        <stop offset="1" stopColor="#8fc0e6" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#sealHeart)"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Tap to open hint */}
              <AnimatePresence>
                {!opening && (
                  <motion.div exit={{ opacity: 0 }} className="mt-12 flex flex-col items-center gap-2">
                    <motion.div
                      animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg className="w-5 h-5 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                    <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-charcoal/45">
                      Tap to Open
                    </p>
                    <p className="mt-3 font-montserrat text-[11px] tracking-wide text-charcoal/55">
                      ⏰ RSVP Deadline: June 20, 2026
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating play / pause button ── */}
      <AnimatePresence>
        {entered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <div className="flex items-end gap-[3px] h-5 pb-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-babyPinkDeep"
                    animate={{ scaleY: [0.4, 1, 0.6, 0.9, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                    style={{ height: 16, transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-charcoal/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13" />
                <circle cx="6" cy="19" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

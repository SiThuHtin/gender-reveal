"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "gender-reveal-votes";
const MY_VOTE_KEY = "gender-reveal-my-vote";

const loadVotes = () => {
  if (typeof window === "undefined") return { girl: 0, boy: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { girl: 0, boy: 0 };
    const parsed = JSON.parse(raw);
    return {
      girl: Number(parsed.girl) || 0,
      boy: Number(parsed.boy) || 0,
    };
  } catch {
    return { girl: 0, boy: 0 };
  }
};

const TeamIcon = ({ type }) => (
  <div
    className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-lg ${
      type === "girl"
        ? "bg-gradient-to-br from-babyPink to-babyPinkDeep ring-4 ring-white/50"
        : "bg-gradient-to-br from-babyBlue to-babyBlueDeep ring-4 ring-white/50"
    }`}
  >
    <span
      className="text-5xl md:text-6xl leading-none select-none"
      role="img"
      aria-label={type === "girl" ? "Baby girl" : "Baby boy"}
    >
      {type === "girl" ? "\u{1F467}" : "\u{1F466}"}
    </span>
  </div>
);

const VoteSection = () => {
  const [votes, setVotes] = useState({ girl: 0, boy: 0 });
  const [myVote, setMyVote] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVotes(loadVotes());
    setMyVote(typeof window !== "undefined" ? localStorage.getItem(MY_VOTE_KEY) : null);
    setMounted(true);
  }, []);

  const total = votes.girl + votes.boy;
  const girlPct = total === 0 ? 50 : Math.round((votes.girl / total) * 100);
  const boyPct = total === 0 ? 50 : 100 - girlPct;

  const castVote = (team) => {
    if (myVote) return;
    const next = { ...votes, [team]: votes[team] + 1 };
    setVotes(next);
    setMyVote(team);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      localStorage.setItem(MY_VOTE_KEY, team);
    }
  };

  const resetVote = () => {
    setMyVote(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(MY_VOTE_KEY);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-babyPink/60 via-cream to-babyBlue/60" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-babyPinkDeep/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-babyBlueDeep/40 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl w-full px-4 sm:px-6 text-center"
      >
        <p className="text-xs md:text-sm tracking-[0.3em] font-montserrat uppercase text-charcoal/70 mb-3">
          Cast Your Guess
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-satisfy text-charcoal mb-3 md:mb-4">
          Team Girl or Team Boy?
        </h2>
        <p className="font-playfair italic text-charcoal/70 mb-10 md:mb-14 text-base md:text-lg">
          Tap your guess. Your vote is saved on this device.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
          {/* Girl card */}
          <motion.button
            type="button"
            disabled={!!myVote}
            onClick={() => castVote("girl")}
            whileHover={!myVote ? { scale: 1.03 } : {}}
            whileTap={!myVote ? { scale: 0.97 } : {}}
            className={`relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all shadow-xl ${
              myVote === "girl"
                ? "border-babyPinkDeep bg-babyPink/80 ring-4 ring-babyPinkDeep/40"
                : "border-babyPinkDeep/40 bg-babyPink/50 hover:bg-babyPink/70"
            } ${myVote && myVote !== "girl" ? "opacity-60" : ""}`}
          >
            <div className="flex justify-center mb-5">
              <TeamIcon type="girl" />
            </div>
            <div className="font-satisfy text-3xl md:text-4xl text-[#7a2e44] mb-1">
              Team Girl
            </div>
            <div className="font-montserrat text-xs md:text-sm tracking-[0.25em] uppercase text-[#7a2e44]/80 mb-5">
              It&apos;s a Princess
            </div>
            {mounted && (
              <div className="text-4xl md:text-5xl font-playfair text-[#7a2e44]">
                {girlPct}%
              </div>
            )}
            <div className="mt-2 font-montserrat text-xs text-[#7a2e44]/70">
              {mounted ? `${votes.girl} vote${votes.girl === 1 ? "" : "s"}` : "\u00A0"}
            </div>
          </motion.button>

          {/* Boy card */}
          <motion.button
            type="button"
            disabled={!!myVote}
            onClick={() => castVote("boy")}
            whileHover={!myVote ? { scale: 1.03 } : {}}
            whileTap={!myVote ? { scale: 0.97 } : {}}
            className={`relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all shadow-xl ${
              myVote === "boy"
                ? "border-babyBlueDeep bg-babyBlue/80 ring-4 ring-babyBlueDeep/40"
                : "border-babyBlueDeep/40 bg-babyBlue/50 hover:bg-babyBlue/70"
            } ${myVote && myVote !== "boy" ? "opacity-60" : ""}`}
          >
            <div className="flex justify-center mb-5">
              <TeamIcon type="boy" />
            </div>
            <div className="font-satisfy text-3xl md:text-4xl text-[#1f4e6b] mb-1">
              Team Boy
            </div>
            <div className="font-montserrat text-xs md:text-sm tracking-[0.25em] uppercase text-[#1f4e6b]/80 mb-5">
              It&apos;s a Little Prince
            </div>
            {mounted && (
              <div className="text-4xl md:text-5xl font-playfair text-[#1f4e6b]">
                {boyPct}%
              </div>
            )}
            <div className="mt-2 font-montserrat text-xs text-[#1f4e6b]/70">
              {mounted ? `${votes.boy} vote${votes.boy === 1 ? "" : "s"}` : "\u00A0"}
            </div>
          </motion.button>
        </div>

        {/* Tally bar */}
        {mounted && (
          <div className="mt-10 md:mt-14 max-w-3xl mx-auto px-2">
            <div className="h-3 md:h-4 rounded-full overflow-hidden flex shadow-inner bg-white/40">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${girlPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-babyPinkDeep"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${boyPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-babyBlueDeep"
              />
            </div>
            <div className="flex justify-between mt-2 font-montserrat text-xs tracking-widest text-charcoal/70 uppercase">
              <span>Girl</span>
              <span>{total} total {total === 1 ? "guess" : "guesses"}</span>
              <span>Boy</span>
            </div>
          </div>
        )}

        <AnimatePresence>
          {myVote && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <p className="font-playfair italic text-charcoal/80 mb-3">
                You guessed <strong>{myVote === "girl" ? "Team Girl" : "Team Boy"}</strong>. Fingers crossed!
              </p>
              <button
                type="button"
                onClick={resetVote}
                className="text-xs font-montserrat tracking-widest uppercase text-charcoal/60 underline-offset-4 hover:underline"
              >
                Change my guess
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default VoteSection;

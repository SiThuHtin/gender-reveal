"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const MY_VOTE_KEY = "gender-reveal-my-vote";

const TEAM = {
  girl: {
    active: "border-babyPinkDeep bg-babyPink/80 ring-4 ring-babyPinkDeep/40",
    idle: "border-babyPinkDeep/40 bg-babyPink/50 hover:bg-babyPink/70",
    textColor: "#7a2e44",
    label: "Team Girl",
    subtitle: "It's a Princess",
    confettiColors: ["#e89eb1", "#f7c8d3", "#ffffff"],
    barColor: "bg-babyPinkDeep",
    icon: "🎀",
    iconBg: "bg-gradient-to-br from-babyPink to-babyPinkDeep",
  },
  boy: {
    active: "border-babyBlueDeep bg-babyBlue/80 ring-4 ring-babyBlueDeep/40",
    idle: "border-babyBlueDeep/40 bg-babyBlue/50 hover:bg-babyBlue/70",
    textColor: "#1f4e6b",
    label: "Team Boy",
    subtitle: "It's a Little Prince",
    confettiColors: ["#7fb6d8", "#bcdcef", "#ffffff"],
    barColor: "bg-babyBlueDeep",
    icon: "👑",
    iconBg: "bg-gradient-to-br from-babyBlue to-babyBlueDeep",
  },
};



const VoteCard = ({ team, myVote, onVote, pct, count, loading }) => {
  const s = TEAM[team];
  const isMyVote = myVote === team;
  const isOtherVote = myVote && !isMyVote;

  return (
    <motion.button
      type="button"
      disabled={!!myVote}
      onClick={() => onVote(team)}
      whileHover={!myVote ? { scale: 1.03 } : {}}
      whileTap={!myVote ? { scale: 0.97 } : {}}
      className={`relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all shadow-xl
        ${isMyVote ? s.active : s.idle}
        ${isOtherVote ? "opacity-60" : ""}`}
    >
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full shadow-lg ring-4 ring-white/50 flex items-center justify-center ${s.iconBg}`}>
          <span className="text-5xl md:text-6xl leading-none select-none drop-shadow-md">
            {s.icon}
          </span>
        </div>
      </div>

      {/* Labels */}
      <div className="font-satisfy text-3xl md:text-4xl mb-1" style={{ color: s.textColor }}>
        {s.label}
      </div>
      <div className="font-montserrat text-xs md:text-sm tracking-[0.25em] uppercase mb-5" style={{ color: s.textColor + "cc" }}>
        {s.subtitle}
      </div>

      {/* Count — skeleton while loading */}
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-10 md:h-12 w-16 rounded-lg bg-white/40 mx-auto" />
          <div className="h-3 w-14 rounded bg-white/30 mx-auto" />
        </div>
      ) : (
        <>
          <div className="text-4xl md:text-5xl font-playfair" style={{ color: s.textColor }}>
            {pct}%
          </div>
          <div className="mt-2 font-montserrat text-xs" style={{ color: s.textColor + "b3" }}>
            {count} vote{count === 1 ? "" : "s"}
          </div>
        </>
      )}
    </motion.button>
  );
};

const VoteSection = () => {
  const [votes, setVotes] = useState({ girl: 0, boy: 0 });
  const [myVote, setMyVote] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVotes = useCallback(async () => {
    try {
      const res = await fetch("/api/votes");
      if (res.ok) setVotes(await res.json());
    } catch {
      // silently ignore network errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMyVote(localStorage.getItem(MY_VOTE_KEY));
    setMounted(true);
    fetchVotes();
    const interval = setInterval(fetchVotes, 15000);
    return () => clearInterval(interval);
  }, [fetchVotes]);

  const total = votes.girl + votes.boy;
  const girlPct = total === 0 ? 50 : Math.round((votes.girl / total) * 100);
  const boyPct = total === 0 ? 50 : 100 - girlPct;

  const castVote = async (team) => {
    if (myVote) return;
    setVotes((v) => ({ ...v, [team]: v[team] + 1 }));
    setMyVote(team);
    localStorage.setItem(MY_VOTE_KEY, team);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: TEAM[team].confettiColors,
    });

    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team }),
      });
      if (res.ok) setVotes(await res.json());
    } catch {
      // optimistic update already applied
    }

    // Catch any concurrent votes from other guests
    setTimeout(fetchVotes, 3000);
  };

  const resetVote = () => {
    setMyVote(null);
    localStorage.removeItem(MY_VOTE_KEY);
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
        <p className="font-playfair italic text-charcoal/70 mb-6 text-base md:text-lg">
          Tap your guess and see what everyone thinks!
        </p>

        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/80 rounded-full px-5 py-2.5 mb-10 md:mb-14 shadow-sm">
          <span className="text-lg">🎁</span>
          <span className="font-montserrat text-xs md:text-sm tracking-wide text-charcoal/80">
            Correct guessers enter the <strong>Lucky Draw</strong> at 9:00 PM!
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
          <VoteCard team="girl" myVote={mounted ? myVote : null} onVote={castVote} pct={girlPct} count={votes.girl} loading={loading} />
          <VoteCard team="boy"  myVote={mounted ? myVote : null} onVote={castVote} pct={boyPct}  count={votes.boy}  loading={loading} />
        </div>

        {/* Tally bar */}
        <div className="mt-10 md:mt-14 max-w-3xl mx-auto px-2">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-3 md:h-4 rounded-full bg-white/40" />
              <div className="flex justify-between">
                <div className="h-3 w-8 rounded bg-charcoal/20" />
                <div className="h-3 w-24 rounded bg-charcoal/20" />
                <div className="h-3 w-8 rounded bg-charcoal/20" />
              </div>
            </div>
          ) : (
            <>
              <div className="h-3 md:h-4 rounded-full overflow-hidden flex shadow-inner bg-white/40">
                <motion.div
                  animate={{ width: `${girlPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-babyPinkDeep"
                />
                <motion.div
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
            </>
          )}
        </div>

        <AnimatePresence>
          {mounted && myVote && (
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

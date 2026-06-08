"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useT } from "../context/LanguageContext";

const MY_VOTE_KEY = "gender-reveal-my-vote";
const MY_NAME_KEY = "gender-reveal-voter-name";

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



const VoteCard = ({ team, myVote, onVote, pct, count, loading, disabled, label, subtitle, enterNameHint }) => {
  const s = TEAM[team];
  const isMyVote = myVote === team;
  const isOtherVote = myVote && !isMyVote;
  const isDisabled = disabled || !!myVote;

  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      onClick={() => onVote(team)}
      whileHover={!isDisabled ? { scale: 1.03 } : {}}
      whileTap={!isDisabled ? { scale: 0.97 } : {}}
      className={`relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all shadow-xl
        ${isMyVote ? s.active : s.idle}
        ${isOtherVote || (disabled && !isMyVote) ? "opacity-50" : ""}
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {/* Fix 4 — Checkmark badge on selected card */}
      <AnimatePresence>
        {isMyVote && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fix 2 — "Enter name" hint on hover when disabled by missing name */}
      {disabled && !myVote && (
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity">
          <span className="font-montserrat text-xs tracking-wide text-charcoal/80 bg-white/80 rounded-full px-4 py-2 shadow">
            {enterNameHint}
          </span>
        </div>
      )}

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
        {label}
      </div>
      <div className="font-montserrat text-xs md:text-sm tracking-[0.25em] uppercase mb-5" style={{ color: s.textColor + "cc" }}>
        {subtitle}
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
  const t = useT("vote");
  const tRsvp = useT("rsvp");
  const [votes, setVotes] = useState({ girl: 0, boy: 0 });
  const [myVote, setMyVote] = useState(null);
  const [voterName, setVoterName] = useState("");
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
    setVoterName(localStorage.getItem(MY_NAME_KEY) || "");
    setMounted(true);
    fetchVotes();
    const interval = setInterval(fetchVotes, 15000);
    return () => clearInterval(interval);
  }, [fetchVotes]);

  const total = votes.girl + votes.boy;
  const girlPct = total === 0 ? 50 : Math.round((votes.girl / total) * 100);
  const boyPct = total === 0 ? 50 : 100 - girlPct;

  const castVote = async (team) => {
    if (myVote || !voterName.trim()) return;
    const name = voterName.trim();
    setVotes((v) => ({ ...v, [team]: v[team] + 1 }));
    setMyVote(team);
    localStorage.setItem(MY_VOTE_KEY, team);
    localStorage.setItem(MY_NAME_KEY, name);

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
        body: JSON.stringify({ team, name }),
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
    // Keep the name so guest can re-vote without retyping
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
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-satisfy text-charcoal mb-6 md:mb-8">
          {t.heading}
        </h2>

        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/80 rounded-full px-5 py-2.5 mb-4 shadow-sm">
          <span className="text-lg">🎁</span>
          <span className="font-montserrat text-xs md:text-sm tracking-wide text-charcoal/80">
            {t.luckyDraw}
          </span>
        </div>

        {/* Voting deadline */}
        <p className="font-montserrat text-xs md:text-sm font-semibold text-babyPinkDeep mb-8">
          ⏰ {t.votingDeadline}
        </p>

        {/* Fix 1 — Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ backgroundColor: mounted && voterName.trim() ? "#e89eb1" : "#d1d5db" }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white font-montserrat"
            >
              {mounted && voterName.trim() ? "✓" : "1"}
            </motion.span>
            <span className={`font-montserrat text-xs tracking-wide transition-colors ${mounted && voterName.trim() ? "text-babyPinkDeep font-semibold" : "text-charcoal/50"}`}>
              {t.step1}
            </span>
          </div>
          <div className="w-8 h-px bg-charcoal/20" />
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ backgroundColor: mounted && myVote ? "#e89eb1" : mounted && voterName.trim() ? "#6b7280" : "#d1d5db" }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white font-montserrat"
            >
              {mounted && myVote ? "✓" : "2"}
            </motion.span>
            <span className={`font-montserrat text-xs tracking-wide transition-colors ${mounted && myVote ? "text-babyPinkDeep font-semibold" : mounted && voterName.trim() ? "text-charcoal/70" : "text-charcoal/30"}`}>
              {t.step2}
            </span>
          </div>
        </div>

        {/* Name input */}
        <div className="max-w-sm mx-auto mb-10 md:mb-14">
          <input
            type="text"
            placeholder={t.namePlaceholder}
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            disabled={mounted && !!myVote}
            maxLength={50}
            className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-md border-2 border-white/80 shadow-md text-charcoal font-montserrat text-base placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-babyPinkDeep transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
          <VoteCard team="girl" myVote={mounted ? myVote : null} onVote={castVote} pct={girlPct} count={votes.girl} loading={loading} disabled={mounted && !voterName.trim()} label={t.girlLabel} subtitle={t.girlSubtitle} enterNameHint={t.enterNameFirst} />
          <VoteCard team="boy"  myVote={mounted ? myVote : null} onVote={castVote} pct={boyPct}  count={votes.boy}  loading={loading} disabled={mounted && !voterName.trim()} label={t.boyLabel}  subtitle={t.boySubtitle}  enterNameHint={t.enterNameFirst} />
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
          ) : total === 0 ? (
            <div className="text-center">
              <div className="h-3 md:h-4 rounded-full bg-white/40 shadow-inner" />
              <p className="mt-3 font-montserrat text-xs tracking-widest text-charcoal/40 uppercase">
                {t.beFirst}
              </p>
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
                <span>{t.girl}</span>
                <span>{t.totalGuesses(total)}</span>
                <span>{t.boy}</span>
              </div>
            </>
          )}
        </div>

        {/* Fix 3 — Celebratory post-vote card */}
        <AnimatePresence>
          {mounted && myVote && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 max-w-sm mx-auto bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-xl"
            >
              {/* Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 16 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-babyPink to-babyBlue flex items-center justify-center mx-auto mb-4 shadow-md"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              {/* Message */}
              <h3 className="font-satisfy text-2xl md:text-3xl text-charcoal mb-1">
                {voterName ? t.youreIn(voterName) : t.youreIn("")}
              </h3>
              <p className="font-playfair italic text-charcoal/70 text-sm md:text-base mb-1">
                {t.youGuessed} <strong>{myVote === "girl" ? `${t.girlLabel} 🎀` : `${t.boyLabel} 👑`}</strong>
              </p>
              <p className="font-montserrat text-xs text-charcoal/50 mb-4">
                {t.luckyDrawEntered}
              </p>

              {/* RSVP reminder + CTA */}
              <p className="font-playfair italic text-charcoal/80 text-sm mb-2">
                {t.dontForget}
              </p>
              <p className="font-montserrat text-xs font-semibold text-babyPinkDeep mb-3">
                ⏰ {tRsvp.deadline}
              </p>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full px-5 py-3 mb-3 rounded-2xl bg-gradient-to-r from-babyPinkDeep to-babyBlueDeep text-white font-montserrat tracking-widest uppercase text-sm font-semibold shadow-lg hover:opacity-90 transition-all"
              >
                {t.rsvpCta}
              </button>

              {/* Change guess button */}
              <button
                type="button"
                onClick={resetVote}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-charcoal/20 bg-white/60 font-montserrat text-xs tracking-widest uppercase text-charcoal/60 hover:text-charcoal hover:border-charcoal/40 hover:bg-white transition-all"
              >
                {t.changeGuess}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default VoteSection;

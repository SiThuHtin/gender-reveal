"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [reveal, setReveal] = useState(null);
  const [winner, setWinner] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/voters?secret=${encodeURIComponent(password)}`);
      if (res.status === 401) {
        setError("Wrong password. Please try again.");
        return;
      }
      if (!res.ok) throw new Error(`Server error (${res.status}). Check the terminal for details.`);
      setData(await res.json());
    } catch {
      setError("Could not load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pickWinner = () => {
    const pool = reveal === "girl" ? data.girl : data.boy;
    if (!pool.length) return;
    setWinner(pool[Math.floor(Math.random() * pool.length)]);
  };

  const correctTeam = reveal ? (reveal === "girl" ? data.girl : data.boy) : [];
  const total = data ? data.girl.length + data.boy.length : 0;

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-babyPink/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-babyBlue/30 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">
            Phyo & Mon · Gender Reveal
          </p>
          <h1 className="font-satisfy text-4xl md:text-6xl text-charcoal mb-2">
            Lucky Draw 🎁
          </h1>
          <p className="font-playfair italic text-charcoal/60 text-base">
            Voting results & lucky draw management
          </p>
        </div>

        {/* Login form */}
        {!data && (
          <motion.form
            onSubmit={login}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-xl max-w-sm mx-auto"
          >
            <label className="block font-montserrat text-xs tracking-[0.2em] uppercase text-charcoal/60 mb-3">
              Enter Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-2xl border-2 border-charcoal/10 bg-white font-montserrat text-charcoal focus:outline-none focus:ring-2 focus:ring-babyPinkDeep mb-4"
              required
            />
            {error && (
              <p className="text-red-500 font-montserrat text-sm mb-4 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-babyPinkDeep to-babyBlueDeep text-white font-montserrat tracking-widest uppercase font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Loading..." : "View Results"}
            </button>
          </motion.form>
        )}

        {/* Results */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Total badge */}
            <div className="text-center">
              <span className="inline-block bg-white/70 border border-white/80 rounded-full px-6 py-2 font-montserrat text-sm text-charcoal shadow-sm">
                🗳️ <strong>{total}</strong> total {total === 1 ? "guess" : "guesses"}
              </span>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Girl */}
              <div className={`rounded-3xl p-6 border-2 shadow-lg transition-all ${reveal === "girl" ? "border-babyPinkDeep bg-babyPink/60 ring-4 ring-babyPinkDeep/30" : "border-babyPinkDeep/30 bg-babyPink/30"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎀</span>
                  <div>
                    <div className="font-satisfy text-2xl text-[#7a2e44]">Team Girl</div>
                    <div className="font-montserrat text-xs text-[#7a2e44]/70">{data.girl.length} {data.girl.length === 1 ? "guess" : "guesses"}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {data.girl.length === 0 && (
                    <li className="font-playfair italic text-charcoal/40 text-sm">No votes yet</li>
                  )}
                  {data.girl.map((name, i) => (
                    <li key={i} className="flex items-center gap-2 font-montserrat text-sm text-[#7a2e44]">
                      <span className="w-5 h-5 rounded-full bg-babyPinkDeep/20 flex items-center justify-center text-xs font-bold text-[#7a2e44]">{i + 1}</span>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Boy */}
              <div className={`rounded-3xl p-6 border-2 shadow-lg transition-all ${reveal === "boy" ? "border-babyBlueDeep bg-babyBlue/60 ring-4 ring-babyBlueDeep/30" : "border-babyBlueDeep/30 bg-babyBlue/30"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">👑</span>
                  <div>
                    <div className="font-satisfy text-2xl text-[#1f4e6b]">Team Boy</div>
                    <div className="font-montserrat text-xs text-[#1f4e6b]/70">{data.boy.length} {data.boy.length === 1 ? "guess" : "guesses"}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {data.boy.length === 0 && (
                    <li className="font-playfair italic text-charcoal/40 text-sm">No votes yet</li>
                  )}
                  {data.boy.map((name, i) => (
                    <li key={i} className="flex items-center gap-2 font-montserrat text-sm text-[#1f4e6b]">
                      <span className="w-5 h-5 rounded-full bg-babyBlueDeep/20 flex items-center justify-center text-xs font-bold text-[#1f4e6b]">{i + 1}</span>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reveal section */}
            <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-xl text-center">
              <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-charcoal/50 mb-3">
                After the Reveal
              </p>
              <h2 className="font-satisfy text-3xl text-charcoal mb-6">Who was right?</h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={() => { setReveal("girl"); setWinner(null); }}
                  className={`px-8 py-3 rounded-2xl font-montserrat tracking-widest uppercase font-semibold text-sm transition shadow-md ${reveal === "girl" ? "bg-babyPinkDeep text-white ring-4 ring-babyPinkDeep/40" : "bg-babyPink/60 text-[#7a2e44] hover:bg-babyPink"}`}
                >
                  🎀 It&apos;s a Girl!
                </button>
                <button
                  onClick={() => { setReveal("boy"); setWinner(null); }}
                  className={`px-8 py-3 rounded-2xl font-montserrat tracking-widest uppercase font-semibold text-sm transition shadow-md ${reveal === "boy" ? "bg-babyBlueDeep text-white ring-4 ring-babyBlueDeep/40" : "bg-babyBlue/60 text-[#1f4e6b] hover:bg-babyBlue"}`}
                >
                  👑 It&apos;s a Boy!
                </button>
              </div>

              <AnimatePresence>
                {reveal && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <p className="font-playfair italic text-charcoal/70">
                      {correctTeam.length === 0
                        ? "No one guessed correctly!"
                        : `${correctTeam.length} ${correctTeam.length === 1 ? "person guessed" : "people guessed"} correctly 🎉`}
                    </p>

                    {correctTeam.length > 0 && (
                      <button
                        onClick={pickWinner}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-babyPinkDeep to-babyBlueDeep text-white font-montserrat tracking-widest uppercase font-semibold text-sm hover:opacity-90 transition shadow-lg"
                      >
                        🎲 Pick a Winner!
                      </button>
                    )}

                    <AnimatePresence>
                      {winner && (
                        <motion.div
                          key={winner}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-babyPink to-babyBlue border-2 border-white shadow-xl"
                        >
                          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-charcoal/60 mb-2">
                            🏆 Lucky Draw Winner
                          </p>
                          <p className="font-satisfy text-4xl md:text-5xl text-charcoal">
                            {winner}
                          </p>
                          <p className="font-playfair italic text-charcoal/60 mt-2 text-sm">
                            Congratulations! 🎉
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RSVP list */}
            <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-satisfy text-3xl text-charcoal">RSVPs 💌</h2>
                <div className="flex gap-2 font-montserrat text-xs">
                  <span className="bg-babyPink/40 text-[#7a2e44] rounded-full px-3 py-1">
                    {(data.rsvps || []).filter((r) => r.response === "Yes").length} attending
                  </span>
                  <span className="bg-babyBlue/40 text-[#1f4e6b] rounded-full px-3 py-1">
                    {(data.rsvps || []).reduce((s, r) => s + (r.response === "Yes" ? Number(r.guests) || 0 : 0), 0)} guests total
                  </span>
                </div>
              </div>

              {(!data.rsvps || data.rsvps.length === 0) ? (
                <p className="font-playfair italic text-charcoal/40 text-sm">No RSVPs yet</p>
              ) : (
                <ul className="space-y-3">
                  {data.rsvps.map((r, i) => (
                    <li key={i} className="rounded-2xl border border-charcoal/10 bg-white/60 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-montserrat font-semibold text-charcoal">{r.name}</span>
                        <span className={`font-montserrat text-xs px-2.5 py-1 rounded-full ${r.response === "Yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {r.response === "Yes" ? `Attending · ${r.guests} guest${Number(r.guests) === 1 ? "" : "s"}` : "Not attending"}
                        </span>
                      </div>
                      {r.wish && (
                        <p className="font-playfair italic text-charcoal/70 text-sm mt-2">“{r.wish}”</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

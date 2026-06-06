import { Redis } from "@upstash/redis";
import { config } from "dotenv";

config({ path: ".env.local" });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Show current voters before clearing
const raw = await redis.hgetall("votes:entries");
const entries = Object.values(raw || {}).map((v) => (typeof v === "string" ? JSON.parse(v) : v));

if (entries.length > 0) {
  console.log("\n📋 Voters before reset:");
  const girl = entries.filter((e) => e.team === "girl");
  const boy = entries.filter((e) => e.team === "boy");
  if (girl.length) console.log("  🎀 Team Girl:", girl.map((e) => e.name).join(", "));
  if (boy.length)  console.log("  👑 Team Boy: ", boy.map((e) => e.name).join(", "));
  console.log("");
} else {
  console.log("\n  (no votes to clear)\n");
}

// Show current RSVPs before clearing
const rawRsvps = await redis.lrange("rsvp:list", 0, -1);
const rsvps = (rawRsvps || []).map((v) => (typeof v === "string" ? JSON.parse(v) : v));
if (rsvps.length > 0) {
  console.log("💌 RSVPs before reset:");
  rsvps.forEach((r) =>
    console.log(`  ${r.name} — ${r.response === "Yes" ? `Attending (${r.guests})` : "Not attending"}`)
  );
  console.log("");
}

await redis.del("votes:girl", "votes:boy", "votes:entries", "rsvp:list");
console.log("✅ All vote + RSVP test data cleared.\n");

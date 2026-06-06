import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET(request) {
  const secret = new URL(request.url).searchParams.get("secret");

  if (!secret || secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured." }, { status: 503 });
  }

  try {
    const [rawVotes, rawRsvps] = await Promise.all([
      redis.hgetall("votes:entries"),
      redis.lrange("rsvp:list", 0, -1),
    ]);

    const entries = Object.values(rawVotes || {}).map((v) =>
      typeof v === "string" ? JSON.parse(v) : v
    );
    const rsvps = (rawRsvps || []).map((v) =>
      typeof v === "string" ? JSON.parse(v) : v
    );

    return NextResponse.json({
      girl: entries.filter((e) => e.team === "girl").map((e) => e.name),
      boy: entries.filter((e) => e.team === "boy").map((e) => e.name),
      rsvps,
    });
  } catch (err) {
    console.error("[admin/voters] Error:", err);
    return NextResponse.json({ error: "Failed to load data." }, { status: 500 });
  }
}

import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const RSVP_KEY = "rsvp:list";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function POST(request) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, response, numberOfGuests, wish } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (response !== "Yes" && response !== "No") {
    return NextResponse.json({ error: "Invalid response." }, { status: 400 });
  }

  const entry = {
    name: name.trim(),
    response,
    guests: response === "Yes" ? String(numberOfGuests || "1") : "-",
    wish: wish?.trim() || "",
    submittedAt: new Date().toISOString(),
  };

  await redis.rpush(RSVP_KEY, JSON.stringify(entry));
  return NextResponse.json({ success: true });
}

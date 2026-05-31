import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { voteLimiter, getIp } from "../../lib/ratelimit";

const GIRL_KEY = "votes:girl";
const BOY_KEY = "votes:boy";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ girl: 0, boy: 0 });
  }

  const [girl, boy] = await redis.mget(GIRL_KEY, BOY_KEY);
  return NextResponse.json({
    girl: Number(girl) || 0,
    boy: Number(boy) || 0,
  });
}

export async function POST(request) {
  if (voteLimiter) {
    const { success } = await voteLimiter.limit(getIp(request));
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { error: "Vote storage is not configured." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { team } = body;
  if (team !== "girl" && team !== "boy") {
    return NextResponse.json({ error: "Invalid team." }, { status: 400 });
  }

  await redis.incr(`votes:${team}`);
  const [girl, boy] = await redis.mget(GIRL_KEY, BOY_KEY);
  return NextResponse.json({
    girl: Number(girl) || 0,
    boy: Number(boy) || 0,
  });
}

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function makeRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function makeLimiter(prefix, requests, window) {
  const redis = makeRedis();
  if (!redis) return null;
  return new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(requests, window), prefix });
}

export const voteLimiter = makeLimiter("rl:vote", 3, "1 h");

export function getIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous"
  );
}

// Single source of truth for couple, date, venue and reveal-day info.
// Edit values here and the whole site updates automatically.

// Absolute moments in Tokyo time (UTC+9). The +09:00 suffix makes these
// unambiguous regardless of where the website is served from \u2014 the countdown
// timer and Add-to-Calendar links will be correct in every viewer's timezone.
const REVEAL_START = new Date("2026-06-27T18:30:00+09:00");
const REVEAL_END = new Date("2026-06-27T22:00:00+09:00");

export const eventConfig = {
  couple: {
    parent1: "Phyo",
    parent2: "Mon",
    joined: "Phyo & Mon",
  },
  reveal: {
    date: REVEAL_START,
    endDate: REVEAL_END,
    // Hardcoded display strings so they always read the same to every guest,
    // regardless of their browser locale or system timezone.
    displayDate: "Saturday, June 27, 2026",
    displayTime: "6:30 PM \u2013 10:00 PM",
  },
  venue: {
    name: "Metta Asia Restaurant",
    nameJp: "\u30e1\u30c3\u30bf\u30a2\u30b8\u30a2\u30f3\u30d5\u30fc\u30c9\u5927\u68ee\u5317\u5e97",
    city: "Omori, Tokyo",
    address:
      "\u3012143-0016 Tokyo, Ota City, Omorikita, 1 Chome\u221212\u22129 \u7b2c\uff16\u4e0b\u5ddd\u30d3\u30eb 6\u968e",
    transit: "3 min walk from Omori Station (East Exit)",
    // Direct link to the venue on Google Maps. Tapping "Get Directions" on a
    // phone opens Google Maps with this exact pin as the destination, ready to
    // navigate from the guest's current location.
    mapUrl:
      "https://www.google.com/maps/dir/?api=1&destination=35.5864598,139.729267",
  },
  dressCode: "For Ladies (Pink Or Blue) If Possible 🫶",
  quote: {
    text: "A baby fills a place in your heart that you never knew was empty.",
    author: "Unknown",
  },
};

export default eventConfig;

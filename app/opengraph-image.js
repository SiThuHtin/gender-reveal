import { ImageResponse } from "next/og";
import { eventConfig } from "./components/eventConfig";

export const runtime = "edge";
export const alt = "Phyo & Mon \u2014 Gender Reveal Invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family, text) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }
  throw new Error(`Failed to load Google font: ${family}`);
}

export default async function OpenGraphImage() {
  const couple = eventConfig.couple.joined;
  const date = eventConfig.reveal.displayDate;
  const venue = `${eventConfig.venue.name}, ${eventConfig.venue.city}`;

  // Load Quicksand (titles) and Cormorant Garamond (italic serif) limited to the text we need
  const scriptText = couple;
  const serifText = `Boy or Girl? You're Invited Gender Reveal ${date} ${venue} ${eventConfig.reveal.displayTime}`;

  const [titleFont, cormorantFont] = await Promise.all([
    loadGoogleFont("Quicksand:wght@700", scriptText).catch(() => null),
    loadGoogleFont("Cormorant+Garamond:ital,wght@1,500", serifText).catch(() => null),
  ]);

  const fonts = [];
  if (titleFont) fonts.push({ name: "Quicksand", data: titleFont, style: "normal", weight: 700 });
  if (cormorantFont) fonts.push({ name: "Cormorant", data: cormorantFont, style: "italic", weight: 500 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "linear-gradient(135deg, #f7c8d3 0%, #fdf6f0 50%, #bcdcef 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(232, 158, 177, 0.55)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(127, 182, 216, 0.55)",
            filter: "blur(60px)",
          }}
        />

        {/* Floating dots */}
        {[
          { left: 120, top: 120, size: 18, color: "#e89eb1" },
          { left: 1050, top: 90, size: 22, color: "#7fb6d8" },
          { left: 90, top: 500, size: 14, color: "#7fb6d8" },
          { left: 1080, top: 520, size: 20, color: "#e89eb1" },
          { left: 600, top: 70, size: 12, color: "#7fb6d8" },
          { left: 580, top: 580, size: 14, color: "#e89eb1" },
        ].map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: d.color,
              opacity: 0.8,
            }}
          />
        ))}

        {/* Content card */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "70px 100px",
            borderRadius: 48,
            background: "rgba(255,255,255,0.65)",
            border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
            maxWidth: 1000,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "rgba(45, 52, 54, 0.7)",
              marginBottom: 18,
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            You&apos;re Invited &middot; Gender Reveal
          </div>

          {/* Couple names */}
          <div
            style={{
              fontFamily: titleFont ? "Quicksand" : "sans-serif",
              fontSize: 120,
              fontWeight: 700,
              lineHeight: 1,
              color: "#2d3436",
              marginBottom: 12,
              display: "flex",
            }}
          >
            {couple}
          </div>

          {/* The big question */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 64,
              fontFamily: cormorantFont ? "Cormorant" : "serif",
              fontStyle: "italic",
              marginTop: 4,
              marginBottom: 30,
            }}
          >
            <span style={{ color: "#e89eb1", display: "flex" }}>Boy</span>
            <span style={{ color: "rgba(45, 52, 54, 0.5)", display: "flex", margin: "0 22px" }}>
              or
            </span>
            <span style={{ color: "#7fb6d8", display: "flex" }}>Girl?</span>
          </div>

          {/* Date pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 28px",
              borderRadius: 999,
              border: "1.5px solid rgba(45,52,54,0.25)",
              background: "rgba(255,255,255,0.5)",
              fontFamily: cormorantFont ? "Cormorant" : "serif",
              fontStyle: "italic",
              fontSize: 32,
              color: "#2d3436",
            }}
          >
            {date} &middot; {eventConfig.reveal.displayTime}
          </div>

          {/* Venue */}
          <div
            style={{
              marginTop: 18,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(45, 52, 54, 0.65)",
              fontFamily: "sans-serif",
              fontWeight: 500,
              display: "flex",
            }}
          >
            {venue}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}

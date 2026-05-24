import { Quicksand, Cormorant_Garamond, Poppins } from "next/font/google";

import "./globals.css";

// Soft rounded sans — used for big display headings (couple names, section titles)
const quicksand = Quicksand({
  variable: "--font-satisfy",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Soft elegant serif \u2014 used for italic quotes and numbers
const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Friendly modern sans \u2014 used for body text, buttons, eyebrow labels
const poppins = Poppins({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const title = "Phyo & Mon \u2014 Gender Reveal";
const description =
  "You're invited! Join Phyo & Mon to discover whether their newest little love is a boy or a girl.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${quicksand.variable} ${cormorant.variable} ${poppins.variable} antialiased mesh-bg smooth-scroll`}
      >
        {children}
      </body>
    </html>
  );
}

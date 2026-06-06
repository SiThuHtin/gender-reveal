"use client";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import MusicPlayer from "./components/MusicPlayer";

export default function Providers({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <LanguageProvider>
      {isHome && <LanguageToggle />}
      {isHome && <MusicPlayer />}
      {children}
    </LanguageProvider>
  );
}

"use client";
import FormSection from "./components/formsection";
import GallerySection from "./components/gallery";
import Weddinginfo from "./components/weddinginfo";
import Weddingevents from "./components/weddingevents";
import HeroSection from "./components/hero";
import VoteSection from "./components/vote";
import { useState } from "react";

export default function Home() {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (data) => {
    setSending(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send.");
      }
    } catch (error) {
      console.error("Error sending RSVP:", error);
      throw error;
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="bg-white">
      <HeroSection />
      <GallerySection />
      <Weddinginfo />
      <Weddingevents />
      <VoteSection />
      <FormSection onSubmit={handleSubmit} sending={sending} />
    </main>
  );
}

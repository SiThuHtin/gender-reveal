"use client";
import FormSection from "./components/formsection";
import WeddingSection from "./components/letter";
import GallerySection from "./components/gallery";
import Weddinginfo from "./components/weddinginfo";
import Weddingevents from "./components/weddingevents";
import HeroSection from "./components/hero";
import emailjs from "emailjs-com";
import { useRef, useState } from "react";

export default function Home() {
  const [rsvpData, setRsvpData] = useState(null);
  const weddingSectionRef = useRef(null); // Ref to scroll to the WeddingSection

  // Handle RSVP form submission
  const handleRSVPSubmit = (data) => {
    setRsvpData(data); // Store RSVP data

    // Scroll to the WeddingSection
    if (weddingSectionRef.current) {
      weddingSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle WeddingSection form submission
  const handleWeddingWishSubmit = (wish) => {
    // Combine RSVP data and wedding wish
    const combinedData = { ...rsvpData, wish };

    // Send the combined data via EmailJS
    sendEmail(combinedData);
    console.log(combinedData);
  };

  // Send email using EmailJS
  const sendEmail = async (data) => {
    const templateParams = {
      ...data,
    };

    try {
      const result = await emailjs.send(
        "service_hsk7dbl", // Replace with your service ID from EmailJS
        "template_c8xjf0k", // Replace with your template ID from EmailJS
        templateParams,
        "Yr5LLxycrBU7nirw6" // Replace with your public key from EmailJS
      );

      alert("Email sent successfully!");
      setRsvpData(null); // Clear the RSVP data
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send the email. Please try again.");
    }
  };
  return (
    <main className="bg-white">
      <HeroSection />
      <GallerySection />
      <Weddinginfo />
      <Weddingevents />
      <FormSection onRSVPSubmit={handleRSVPSubmit} />
      <div ref={weddingSectionRef}>
        <WeddingSection onSubmit={handleWeddingWishSubmit} />
      </div>
    </main>
  );
}

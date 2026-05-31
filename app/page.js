import FormSection from "./components/formsection";
import GallerySection from "./components/gallery";
import Weddinginfo from "./components/weddinginfo";
import Weddingevents from "./components/weddingevents";
import HeroSection from "./components/hero";
import VoteSection from "./components/vote";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <GallerySection />
      <Weddinginfo />
      <Weddingevents />
      <VoteSection />
      <FormSection />
    </main>
  );
}

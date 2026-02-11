import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Headline from "@/components/Headline";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import VideoSection from "@/components/VideoSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Navigation />
      <Hero />
      <Headline />
      <Marquee />
      <Services />
      <Portfolio />
      <VideoSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

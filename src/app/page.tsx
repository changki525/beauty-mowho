import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import EyebrowCategories from "@/components/EyebrowCategories";
import About from "@/components/About";

import Journal from "@/components/Journal";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <EyebrowCategories />

      <Journal />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Products } from "@/components/Products";
import { SocialProof } from "@/components/SocialProof";
import { CTA } from "@/components/CTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Products />
        <SocialProof />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

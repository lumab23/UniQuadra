import CardSection from "../components/sections/CardSection";
import Navbar from "../components/layout/Navbar"; 
import HeroSection from "../components/sections/HeroSection";
import Modalidades from "../components/sections/Modalidades";
import Features from "../components/sections/Features";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />
      <HeroSection />
      <Features />
      <Modalidades />
      <CardSection />
      <Footer />
    </div>
  );
}
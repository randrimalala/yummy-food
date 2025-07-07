import React from "react";
import Navbar from "./accueil_client/Navbar";
import HeroSection from "./accueil_client/HeroSection";
import ClientCategorySection from "./accueil_client/ClientCategorySection";
import BestSellers from "./accueil_client/BestSellers";
import Footer from "./accueil_client/Footer";
import ProductRecommendations from "../components/client/ProductRecommendations";
import BurgerPromo from './accueil_client/BurgerPromo';
import OurChefsSection from './accueil_client/OurChefsSection';
import FeatureRow from './accueil_client/FeatureRow';
import AboutSection from './accueil_client/AboutSection';
import CustomerReviews from "./accueil_client/CustomerReviews";
import BlogPreviewSection from "./accueil_client/BlogPreviewSection";
import Stat from "./accueil_client/Stat";
import Chatbot from "../components/client/Chatbot";


const HomeClient = () => {
  return (
    <div className="min-h-screen text-white flex flex-col">
    <div className="relative h-screen overflow-hidden">
  {/* Image de fond inversée */}
  <div className="absolute inset-0 bg-[url('/main3.jpg')] bg-cover bg-center transform scale-x-[-1] brightness-[0.4] z-0" />

  {/* Overlay dégradé par-dessus l’image */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#120a04] to-transparent z-10" />

  {/* Contenu (Navbar + Hero) au-dessus du dégradé */}
  <div className="relative z-20">
    <Navbar />
    <HeroSection />
  </div>
</div>




      {/* Section blanche après la vague */}
      <div className="bg-white text-black">
        <FeatureRow />
        <AboutSection />
        <ClientCategorySection />
        <BurgerPromo />
        <BestSellers />
        <Stat />
        <OurChefsSection />
        <CustomerReviews />
        <BlogPreviewSection />
        <Chatbot />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeClient;
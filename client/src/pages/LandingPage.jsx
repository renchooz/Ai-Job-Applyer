import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import DashboardPreviewSection from "../components/landing/DashboardPreviewSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import FAQSection from "../components/landing/FAQSection";
import FinalCTASection from "../components/landing/FinalCTASection";
import Footer from "../components/landing/Footer";
import StatsSection from "../components/landing/StatsSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <LandingNavbar />
      <HeroSection />
      <StatsSection/>
      <FeaturesSection />
       <HowItWorksSection />
      <DashboardPreviewSection />
       <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
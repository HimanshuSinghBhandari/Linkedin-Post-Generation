// import Sidebar from "@/components/(dashboard)/sidebar";
// import LinkedPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-text";
// import BlogUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-through-blog";
// import YoutubeUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-youtubeUrl";
// import PDFPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-PDF";
import HeroSection from "@/components/(landing)/hero-section";
import LogoSlider from "@/components/(landing)/image-slider";
import TrustBadge from "@/components/(landing)/trust-badge";
import DashboardImage from "@/components/(landing)/dashboard-image";
import Cursorhover from "@/components/(landing)/cursor-hover";
import LinkPostFeatures from "@/components/(landing)/link-post-feature";
import GridLayout from "@/components/(landing)/grid-layout";
import Linkeddiv from "@/components/(landing)/div-linkedin";
import FeatureShowcase from "@/components/(landing)/feature";

export default function Home() {
  return (
     <div className="bg-black">
      <HeroSection/>
      <TrustBadge />
      <LogoSlider/>
      <DashboardImage/>
      <LinkPostFeatures/>
      <Cursorhover/>
      <GridLayout/>
      <Linkeddiv/>
      <FeatureShowcase/>
      {/* <BlogUrlPostGenerator/> */}
      {/* <LinkedPostGenerator/> */}
       {/* <Sidebar /> */}

     </div>
  );
}

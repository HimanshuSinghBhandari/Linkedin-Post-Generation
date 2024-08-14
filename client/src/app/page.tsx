// import Sidebar from "@/components/(dashboard)/sidebar";
// import LinkedPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-text";
// import BlogUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-through-blog";
// import YoutubeUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-youtubeUrl";
// import PDFPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-PDF";
import HeroSection from "@/components/(landing)/hero-section";
import LogoSlider from "@/components/(landing)/image-slider";

export default function Home() {
  return (
     <div className="bg-black">
      <HeroSection/>
      <LogoSlider/>
      {/* <BlogUrlPostGenerator/> */}
      {/* <LinkedPostGenerator/> */}
       {/* <Sidebar /> */}

     </div>
  );
}

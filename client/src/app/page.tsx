// import Sidebar from "@/components/(dashboard)/sidebar";
// import LinkedPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-text";
// import BlogUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-through-blog";
// import YoutubeUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-youtubeUrl";
import PDFPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-PDF";

export default function Home() {
  return (
     <div>
      <PDFPostGenerator/>
      {/* <BlogUrlPostGenerator/> */}
      {/* <LinkedPostGenerator/> */}
       {/* <Sidebar /> */}

     </div>
  );
}

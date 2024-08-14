// import Sidebar from "@/components/(dashboard)/sidebar";
// import LinkedPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-text";
// import BlogUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-through-blog";
import YoutubeUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-youtubeUrl";

export default function Home() {
  return (
     <div>
      <YoutubeUrlPostGenerator/>
      {/* <BlogUrlPostGenerator/> */}
      {/* <LinkedPostGenerator/> */}
       {/* <Sidebar /> */}

     </div>
  );
}

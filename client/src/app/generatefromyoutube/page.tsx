import Sidebar from "@/components/(dashboard)/sidebar";
import YoutubeUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-youtubeUrl";

const YoutubeGeneratePost = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-[120px]">
        <YoutubeUrlPostGenerator />
      </div>
    </div>
  );
};

export default YoutubeGeneratePost;
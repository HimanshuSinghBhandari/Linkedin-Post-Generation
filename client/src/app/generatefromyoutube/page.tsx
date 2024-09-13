import Sidebar from "@/components/(dashboard)/sidebar";
import YoutubeUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-youtubeUrl";

const YoutubeGeneratePost = () => {
  return (
    <div className="flex h-screen bg-teal-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen p-8 ml-[250px]">
          <div className="max-w-[calc(100vw-290px)] mx-auto">
            <YoutubeUrlPostGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeGeneratePost;
import Sidebar from "@/components/(dashboard)/sidebar";
import LinkedPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-text";

const GeneratePost = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-[120px]">
        <LinkedPostGenerator />
      </div>
    </div>
  );
};

export default GeneratePost;
import Sidebar from "@/components/(dashboard)/sidebar";
import BlogUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-through-blog";

const BlogGeneratePost = () => {
  return (
    <div className="flex h-screen bg-teal-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
      <div className="min-h-screen p-4 md:p-8 mt-4 md:mt-0 md:ml-[250px]">
      <div className="max-w-full md:max-w-[calc(100vw-290px)] w-full mx-auto">
            <BlogUrlPostGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGeneratePost;
import Sidebar from "@/components/(dashboard)/sidebar";
import BlogUrlPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-through-blog";

const BlogGeneratePost = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-[120px]">
        <BlogUrlPostGenerator />
      </div>
    </div>
  );
};

export default BlogGeneratePost;
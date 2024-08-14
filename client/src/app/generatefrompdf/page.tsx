import Sidebar from "@/components/(dashboard)/sidebar";
import PDFPostGenerator from "@/components/(dashboard)/(postGeneration)/linkedin-post-PDF";

const PdfGeneratePost = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-[120px]">
        <PDFPostGenerator />
      </div>
    </div>
  );
};

export default PdfGeneratePost;
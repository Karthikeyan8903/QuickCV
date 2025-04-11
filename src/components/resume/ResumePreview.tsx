
import { useResume } from "@/contexts/ResumeContext";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

const ResumePreview = () => {
  const { resumeData, resumeSettings } = useResume();
  
  const renderTemplate = () => {
    switch (resumeSettings.template) {
      case "modern":
        return <ModernTemplate />;
      case "classic":
        return <ClassicTemplate />;
      case "creative":
        return <CreativeTemplate />;
      default:
        return <ModernTemplate />;
    }
  };
  
  return (
    <div className="w-full overflow-auto bg-gray-100 dark:bg-gray-900 p-3 md:p-6 flex justify-center">
      <div className="resume-container print-exact shadow-lg max-w-full">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;

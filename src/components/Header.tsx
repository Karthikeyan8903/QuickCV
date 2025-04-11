
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useResume } from "@/contexts/ResumeContext";

const Header = () => {
  const { saveResume } = useResume();

  return (
    <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-20">
      <div className="container flex items-center justify-between py-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-primary">QuickCV</h1>
          <p className="text-sm text-muted-foreground">Not just a resume. An instant upgrade.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline"
            size="sm"
            onClick={saveResume}
            className="flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

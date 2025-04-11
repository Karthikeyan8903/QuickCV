import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  RefreshCcw, 
  Download, 
  FileText,
  LayoutTemplate
} from "lucide-react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useToast } from "@/hooks/use-toast";

const ResumeSettings = () => {
  const { resumeData, resumeSettings, updateSettings, resetResume } = useResume();
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  
  const handleExportPDF = () => {
    if (!previewContainerRef.current) {
      const previewContainer = document.querySelector('.resume-container');
      
      if (!previewContainer) {
        toast({
          title: "Error",
          description: "Could not find resume preview element",
          variant: "destructive"
        });
        return;
      }
      
      const opt = {
        margin: 0,
        filename: `${resumeData.personal.name || 'resume'}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      toast({
        title: "Generating PDF",
        description: "Please wait while your resume is being generated..."
      });
      
      html2pdf().set(opt).from(previewContainer).save().then(() => {
        toast({
          title: "PDF generated",
          description: "Your resume PDF has been downloaded successfully!"
        });
      }).catch((error) => {
        console.error('PDF generation error:', error);
        toast({
          title: "Error",
          description: "There was an error generating your PDF. Please try again.",
          variant: "destructive"
        });
      });
    }
  };
  
  return (
    <Card className="border border-muted">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
            <Settings className="h-5 w-5" /> Resume Settings
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetResume}
              className="flex items-center"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
        
        {/* Template Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <LayoutTemplate className="h-4 w-4" /> Template Style
          </h3>
          <RadioGroup
            value={resumeSettings.template}
            onValueChange={(value) => updateSettings({ template: value as any })}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="modern" id="modern" className="sr-only" />
              <Label
                htmlFor="modern"
                className={`p-2 border rounded-md flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  resumeSettings.template === "modern"
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="w-full h-20 bg-gray-100 dark:bg-gray-800 rounded flex flex-col p-1">
                  <div className="h-4 w-1/2 bg-primary mb-1 rounded-sm"></div>
                  <div className="flex gap-1">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
                  </div>
                </div>
                <span>Modern</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="classic" id="classic" className="sr-only" />
              <Label
                htmlFor="classic"
                className={`p-2 border rounded-md flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  resumeSettings.template === "classic"
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="w-full h-20 bg-gray-100 dark:bg-gray-800 rounded flex flex-col items-center p-1">
                  <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 mb-1 rounded-sm text-center"></div>
                  <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-600 mb-1 rounded-sm"></div>
                  <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
                </div>
                <span>Classic</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="creative" id="creative" className="sr-only" />
              <Label
                htmlFor="creative"
                className={`p-2 border rounded-md flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  resumeSettings.template === "creative"
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="w-full h-20 bg-gray-100 dark:bg-gray-800 rounded flex p-1">
                  <div className="w-1/3 h-full bg-primary rounded-l-sm"></div>
                  <div className="w-2/3 p-1">
                    <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-600 mb-1 rounded-sm"></div>
                    <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
                  </div>
                </div>
                <span>Creative</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Display Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-contact-icons" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Show contact icons
            </Label>
            <Switch
              id="show-contact-icons"
              checked={resumeSettings.showContactIcons}
              onCheckedChange={(checked) => updateSettings({ showContactIcons: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-section-icons" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Show section icons
            </Label>
            <Switch
              id="show-section-icons"
              checked={resumeSettings.showSectionIcons}
              onCheckedChange={(checked) => updateSettings({ showSectionIcons: checked })}
            />
          </div>
          
          {/* Font Size */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Font Size
            </Label>
            <RadioGroup
              value={resumeSettings.fontSize}
              onValueChange={(value) => updateSettings({ fontSize: value as any })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeSettings;

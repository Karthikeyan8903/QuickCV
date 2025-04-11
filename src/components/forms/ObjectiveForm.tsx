
import { useResume } from "@/contexts/ResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

const ObjectiveForm = () => {
  const { resumeData, updateObjective } = useResume();
  
  return (
    <Card className="border border-muted">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
          <Target className="h-5 w-5" /> Career Objective
        </h2>
        
        <div className="form-group">
          <Label htmlFor="objective">Write a professional summary or career objective</Label>
          <Textarea
            id="objective"
            value={resumeData.objective}
            onChange={(e) => updateObjective(e.target.value)}
            placeholder="A motivated software engineer with 3+ years of experience in web development, seeking to leverage my technical skills and passion for creating elegant solutions in a challenging role..."
            className="min-h-[120px] resize-y"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ObjectiveForm;

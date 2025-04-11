
import { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  PlusCircle, 
  Trash2, 
  X, 
  Calendar, 
  Plus,
  Building,
  GraduationCap 
} from "lucide-react";

const ExperienceForm = () => {
  const { resumeData, addExperience, removeExperience } = useResume();
  const { experience } = resumeData;
  
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    achievements: [] as string[],
    isInternship: false
  });
  
  const [newAchievement, setNewAchievement] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience({
        ...newExperience,
        achievements: [...newExperience.achievements, newAchievement.trim()]
      });
      setNewAchievement("");
    }
  };
  
  const handleRemoveAchievement = (index: number) => {
    setNewExperience({
      ...newExperience,
      achievements: newExperience.achievements.filter((_, i) => i !== index)
    });
  };
  
  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      addExperience({
        title: newExperience.title,
        company: newExperience.company,
        location: newExperience.location,
        startDate: newExperience.startDate,
        endDate: newExperience.endDate,
        description: newExperience.description,
        achievements: newExperience.achievements,
        isInternship: newExperience.isInternship
      });
      
      setNewExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        achievements: [],
        isInternship: false
      });
      setIsAdding(false);
    }
  };
  
  return (
    <Card className="border border-muted">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
            <Briefcase className="h-5 w-5" /> Experience & Internships
          </h2>
          
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          )}
        </div>
        
        {isAdding && (
          <div className="border rounded-md p-4 mb-4 bg-muted/40">
            <h3 className="font-medium mb-3">New Experience</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="experience-title">Job Title</Label>
                  <Input
                    id="experience-title"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                    placeholder="E.g., Software Engineer"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor="experience-type">Type</Label>
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="is-internship"
                        checked={newExperience.isInternship}
                        onChange={(e) => setNewExperience({...newExperience, isInternship: e.target.checked})}
                        className="mr-2"
                      />
                      <Label htmlFor="is-internship" className="cursor-pointer flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        Mark as Internship
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="experience-company">Company</Label>
                <Input
                  id="experience-company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                  placeholder="E.g., Acme Corporation"
                />
              </div>
              
              <div>
                <Label htmlFor="experience-location">Location</Label>
                <Input
                  id="experience-location"
                  value={newExperience.location}
                  onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                  placeholder="E.g., New York, NY or Remote"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="experience-start-date">Start Date</Label>
                  <Input
                    id="experience-start-date"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                    placeholder="E.g., Jun 2023"
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience-end-date">End Date</Label>
                  <Input
                    id="experience-end-date"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                    placeholder="E.g., Present or Sep 2023"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="experience-description">Description</Label>
                <Textarea
                  id="experience-description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  placeholder="Describe your role, responsibilities, and contribution"
                  className="h-24"
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Key Achievements (Optional)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newExperience.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 group">
                      {achievement}
                      <button
                        onClick={() => handleRemoveAchievement(index)}
                        className="hover:text-red-500 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddAchievement();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddAchievement}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAddExperience}
                  disabled={!newExperience.title || !newExperience.company}
                >
                  Save Experience
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* List of experiences */}
        {experience.length > 0 ? (
          <div className="space-y-3">
            {experience.map((exp) => (
              <div 
                key={exp.id} 
                className="border rounded-md p-4 hover:bg-muted/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {exp.title}
                      </h3>
                      {exp.isInternship && (
                        <Badge variant="outline" className="text-xs">
                          Internship
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">{exp.company}, {exp.location}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3.5 w-3.5" /> 
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Experience</span>
                  </Button>
                </div>
                
                {exp.description && (
                  <p className="text-sm mt-2 line-clamp-2">
                    {exp.description}
                  </p>
                )}
                
                {exp.achievements.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Key Achievements:</p>
                    <ul className="text-xs list-disc list-inside space-y-0.5 pl-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
            <Briefcase className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">
              No experience added yet. Add your work experience or internships to showcase your professional journey.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;

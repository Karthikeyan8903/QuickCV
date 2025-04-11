
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2, GraduationCap, Calendar, MapPin, School } from "lucide-react";
import { Education } from "@/types/resume";
import { useState } from "react";

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
  });
  
  const resetNewEducation = () => {
    setNewEducation({
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
    });
  };
  
  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      addEducation(newEducation);
      resetNewEducation();
      setIsAdding(false);
    }
  };
  
  return (
    <Card className="border border-muted">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
          <GraduationCap className="h-5 w-5" /> Education
        </h2>
        
        {/* Education List */}
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{edu.degree}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <School className="h-3.5 w-3.5" />
                <span>{edu.institution}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{edu.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="form-group">
                <Label htmlFor={`degree-${edu.id}`}>Degree/Certificate</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => updateEducation({ ...edu, degree: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-group">
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation({ ...edu, institution: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor={`location-${edu.id}`}>Location</Label>
                  <Input
                    id={`location-${edu.id}`}
                    value={edu.location}
                    onChange={(e) => updateEducation({ ...edu, location: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="form-group">
                  <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${edu.id}`}
                    value={edu.startDate}
                    onChange={(e) => updateEducation({ ...edu, startDate: e.target.value })}
                    placeholder="MM/YYYY"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${edu.id}`}
                    value={edu.endDate}
                    onChange={(e) => updateEducation({ ...edu, endDate: e.target.value })}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor={`grade-${edu.id}`}>Grade/CGPA</Label>
                  <Input
                    id={`grade-${edu.id}`}
                    value={edu.grade}
                    onChange={(e) => updateEducation({ ...edu, grade: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                <Textarea
                  id={`description-${edu.id}`}
                  value={edu.description || ""}
                  onChange={(e) => updateEducation({ ...edu, description: e.target.value })}
                  placeholder="Additional details about your education"
                  className="resize-y"
                />
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Education Form */}
        {isAdding ? (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
            <h3 className="font-medium mb-3">Add New Education</h3>
            
            <div className="space-y-3">
              <div className="form-group">
                <Label htmlFor="new-degree">Degree/Certificate</Label>
                <Input
                  id="new-degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-group">
                  <Label htmlFor="new-institution">Institution</Label>
                  <Input
                    id="new-institution"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    placeholder="University Name"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="new-location">Location</Label>
                  <Input
                    id="new-location"
                    value={newEducation.location}
                    onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="form-group">
                  <Label htmlFor="new-startDate">Start Date</Label>
                  <Input
                    id="new-startDate"
                    value={newEducation.startDate}
                    onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                    placeholder="MM/YYYY"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="new-endDate">End Date</Label>
                  <Input
                    id="new-endDate"
                    value={newEducation.endDate}
                    onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="new-grade">Grade/CGPA</Label>
                  <Input
                    id="new-grade"
                    value={newEducation.grade}
                    onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="new-description">Description (Optional)</Label>
                <Textarea
                  id="new-description"
                  value={newEducation.description || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                  placeholder="Additional details about your education"
                  className="resize-y"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEducation}>
                  Add Education
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsAdding(true)}
            className="w-full mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationForm;

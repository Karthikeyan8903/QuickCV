
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
  Link as LinkIcon, 
  Plus 
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;
  
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    startDate: "",
    endDate: "",
    link: "",
  });
  
  const [newTech, setNewTech] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddTech = () => {
    if (newTech.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTech.trim()]
      });
      setNewTech("");
    }
  };
  
  const handleRemoveTech = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index)
    });
  };
  
  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      addProject({
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        link: newProject.link,
      });
      
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        startDate: "",
        endDate: "",
        link: "",
      });
      setIsAdding(false);
    }
  };
  
  return (
    <Card className="border border-muted">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
            <Briefcase className="h-5 w-5" /> Projects
          </h2>
          
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          )}
        </div>
        
        {isAdding && (
          <div className="border rounded-md p-4 mb-4 bg-muted/40">
            <h3 className="font-medium mb-3">New Project</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="E.g., E-commerce Web Application"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="project-start-date">Start Date</Label>
                  <Input
                    id="project-start-date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    placeholder="E.g., Jun 2023"
                  />
                </div>
                
                <div>
                  <Label htmlFor="project-end-date">End Date</Label>
                  <Input
                    id="project-end-date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    placeholder="E.g., Present or Sep 2023"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="project-link">Project Link (Optional)</Label>
                <Input
                  id="project-link"
                  value={newProject.link}
                  onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                  placeholder="E.g., https://github.com/yourusername/project"
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Technologies Used</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 group">
                      {tech}
                      <button
                        onClick={() => handleRemoveTech(index)}
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
                    placeholder="Add a technology"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddTech}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Describe your project, responsibilities, and achievements"
                  className="h-24"
                />
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
                  onClick={handleAddProject}
                  disabled={!newProject.title || !newProject.description}
                >
                  Save Project
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* List of projects */}
        {projects.length > 0 ? (
          <div className="space-y-3">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="border rounded-md p-4 hover:bg-muted/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {project.title}
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <LinkIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> 
                      {project.startDate} - {project.endDate}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                    onClick={() => removeProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Project</span>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
            <Briefcase className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">
              No projects added yet. Add your first project to showcase your work.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsForm;

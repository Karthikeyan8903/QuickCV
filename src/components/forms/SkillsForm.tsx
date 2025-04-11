
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X, Code, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const SkillsForm = () => {
  const { resumeData, updateSkills, addSkillCategory, removeSkillCategory } = useResume();
  const { skills } = resumeData;
  
  const [newSkill, setNewSkill] = useState<{ [key: number]: string }>({});
  const [newCategory, setNewCategory] = useState("");
  
  const handleAddSkill = (categoryIndex: number) => {
    if (newSkill[categoryIndex]?.trim()) {
      const updatedSkills = [...skills[categoryIndex].skills, newSkill[categoryIndex].trim()];
      updateSkills(categoryIndex, updatedSkills);
      setNewSkill({ ...newSkill, [categoryIndex]: "" });
    }
  };
  
  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedSkills = skills[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    updateSkills(categoryIndex, updatedSkills);
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addSkillCategory(newCategory.trim());
      setNewCategory("");
    }
  };
  
  return (
    <Card className="border border-muted">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
          <Code className="h-5 w-5" /> Skills
        </h2>
        
        {skills.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{category.category}</h3>
              {categoryIndex >= 5 && ( // Only allow removing custom categories
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkillCategory(categoryIndex)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Category</span>
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {category.skills.map((skill, skillIndex) => (
                <Badge
                  key={skillIndex}
                  variant="secondary"
                  className="gap-1 group"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(categoryIndex, skillIndex)}
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
                placeholder={`Add ${category.category} skill`}
                value={newSkill[categoryIndex] || ""}
                onChange={(e) => setNewSkill({ ...newSkill, [categoryIndex]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill(categoryIndex);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleAddSkill(categoryIndex)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add</span>
              </Button>
            </div>
          </div>
        ))}
        
        {/* Add new category */}
        <div className="mt-4">
          <Label htmlFor="new-category" className="mb-2 block">
            Add New Skill Category
          </Label>
          <div className="flex gap-2">
            <Input
              id="new-category"
              placeholder="e.g., Cloud Platforms, Languages"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCategory();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddCategory}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;

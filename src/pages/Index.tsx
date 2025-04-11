
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import Header from "@/components/Header";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import ObjectiveForm from "@/components/forms/ObjectiveForm";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import CertificationsForm from "@/components/forms/CertificationsForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import ResumeSettings from "@/components/forms/ResumeSettings";
import ResumePreview from "@/components/resume/ResumePreview";

import { 
  ChevronLeft, 
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Settings
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [showPreview, setShowPreview] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="h-16"></div> {/* Spacer to prevent content from being hidden under the header */}
      
      <main className="flex-1 flex flex-col mt-2">
        {/* Form Section */}
        <div className="w-full">
          <div className="p-4 md:p-8">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-7 mb-8">
                <TabsTrigger value="personal" className="flex items-center gap-1">
                  <User className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <Code className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="certifications" className="flex items-center gap-1">
                  <Award className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Certs</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="space-y-6">
                <TabsContent value="personal" className="mt-0">
                  <ScrollArea className="h-[calc(70vh-6rem)] md:h-[calc(65vh-6rem)]">
                    <div className="pr-4 pb-4">
                      <PersonalInfoForm />
                      <ObjectiveForm />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="education" className="mt-0">
                  <ScrollArea className="h-[calc(70vh-6rem)] md:h-[calc(65vh-6rem)]">
                    <div className="pr-4 pb-4">
                      <EducationForm />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="experience" className="mt-0">
                  <ScrollArea className="h-[calc(70vh-6rem)] md:h-[calc(65vh-6rem)]">
                    <div className="pr-4 pb-4">
                      <ExperienceForm />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="skills" className="mt-0">
                  <ScrollArea className="h-[calc(70vh-6rem)] md:h-[calc(65vh-6rem)]">
                    <div className="pr-4 pb-4">
                      <SkillsForm />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="projects" className="mt-0">
                  <ScrollArea className="h-[calc(70vh-6rem)] md:h-[calc(65vh-6rem)]">
                    <div className="pr-4 pb-4">
                      <ProjectsForm />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="certifications" className="mt-0">
                  <ScrollArea className="h-[calc(70vh-6rem)] md:h-[calc(65vh-6rem)]">
                    <div className="pr-4 pb-4">
                      <CertificationsForm />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <ScrollArea className="h-[calc(70vh-6rem)] md:h-[calc(65vh-6rem)]">
                    <div className="pr-4 pb-4">
                      <ResumeSettings />
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="w-full border-t border-gray-200 dark:border-gray-800 mt-4 pt-6">
          <h2 className="text-2xl font-bold text-center mb-6">Resume Preview</h2>
          <div className="max-w-4xl mx-auto">
            <ResumePreview />
          </div>
        </div>
        
        {/* Mobile Toggle Button */}
        {isMobile && (
          <div className="fixed bottom-4 right-4 z-10">
            <Button 
              onClick={() => setShowPreview(!showPreview)} 
              size="icon" 
              variant="default"
              className="rounded-full h-12 w-12 shadow-lg"
            >
              {showPreview ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

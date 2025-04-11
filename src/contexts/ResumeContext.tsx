import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ResumeData, ResumeSettings, ResumeTemplate, Education, Experience, Project, Certification, Achievement } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";

const initialResumeData: ResumeData = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
  },
  objective: "",
  education: [],
  skills: [
    {
      category: "Programming Languages",
      skills: [],
    },
    {
      category: "Web Technologies",
      skills: [],
    },
    {
      category: "Databases",
      skills: [],
    },
    {
      category: "Tools",
      skills: [],
    },
    {
      category: "Soft Skills",
      skills: [],
    },
  ],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
};

const initialSettings: ResumeSettings = {
  template: "modern",
  primaryColor: "#3b82f6", // blue-500
  showContactIcons: true,
  showSectionIcons: true,
  fontSize: "medium",
};

type ResumeContextType = {
  resumeData: ResumeData;
  resumeSettings: ResumeSettings;
  updatePersonal: (personal: Partial<ResumeData["personal"]>) => void;
  updateObjective: (objective: string) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (education: Education) => void;
  removeEducation: (id: string) => void;
  updateSkills: (categoryIndex: number, skills: string[]) => void;
  addSkillCategory: (category: string) => void;
  removeSkillCategory: (index: number) => void;
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (experience: Experience) => void;
  removeExperience: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (project: Project) => void;
  removeProject: (id: string) => void;
  addCertification: (certification: Omit<Certification, "id">) => void;
  updateCertification: (certification: Certification) => void;
  removeCertification: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, "id">) => void;
  updateAchievement: (achievement: Achievement) => void;
  removeAchievement: (id: string) => void;
  updateSettings: (settings: Partial<ResumeSettings>) => void;
  resetResume: () => void;
  saveResume: () => void;
  loadResume: () => void;
};

const ResumeContext = createContext<ResumeContextType | null>(null);

type ResumeProviderProps = {
  children: ReactNode;
};

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [resumeSettings, setResumeSettings] = useState<ResumeSettings>(initialSettings);
  const { theme } = useTheme();

  useEffect(() => {
    loadResume();
  }, []);

  const updatePersonal = (personal: Partial<ResumeData["personal"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...personal,
      },
    }));
  };

  const updateObjective = (objective: string) => {
    setResumeData((prev) => ({
      ...prev,
      objective,
    }));
  };

  const addEducation = (education: Omit<Education, "id">) => {
    const newEducation: Education = {
      ...education,
      id: uuidv4(),
    };
    
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (education: Education) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === education.id ? education : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const updateSkills = (categoryIndex: number, skills: string[]) => {
    setResumeData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[categoryIndex] = {
        ...newSkills[categoryIndex],
        skills,
      };
      return {
        ...prev,
        skills: newSkills,
      };
    });
  };

  const addSkillCategory = (category: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { category, skills: [] }],
    }));
  };

  const removeSkillCategory = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience: Experience = {
      ...experience,
      id: uuidv4(),
    };
    
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const updateExperience = (experience: Experience) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === experience.id ? experience : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: uuidv4(),
    };
    
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (project: Project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === project.id ? project : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addCertification = (certification: Omit<Certification, "id">) => {
    const newCertification: Certification = {
      ...certification,
      id: uuidv4(),
    };
    
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }));
  };

  const updateCertification = (certification: Certification) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === certification.id ? certification : cert
      ),
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  const addAchievement = (achievement: Omit<Achievement, "id">) => {
    const newAchievement: Achievement = {
      ...achievement,
      id: uuidv4(),
    };
    
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }));
  };

  const updateAchievement = (achievement: Achievement) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((achiev) =>
        achiev.id === achievement.id ? achievement : achiev
      ),
    }));
  };

  const removeAchievement = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((achiev) => achiev.id !== id),
    }));
  };

  const updateSettings = (settings: Partial<ResumeSettings>) => {
    setResumeSettings((prev) => ({
      ...prev,
      ...settings,
    }));
  };

  const resetResume = () => {
    setResumeData(initialResumeData);
    setResumeSettings(initialSettings);
    localStorage.removeItem("resumeData");
    localStorage.removeItem("resumeSettings");
    toast({
      title: "Resume reset",
      description: "All resume data has been cleared.",
    });
  };

  const saveResume = () => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    localStorage.setItem("resumeSettings", JSON.stringify(resumeSettings));
    toast({
      title: "Resume saved",
      description: "Your resume data has been saved to your browser.",
    });
  };

  const loadResume = () => {
    try {
      const savedResumeData = localStorage.getItem("resumeData");
      const savedResumeSettings = localStorage.getItem("resumeSettings");
      
      if (savedResumeData) {
        setResumeData(JSON.parse(savedResumeData));
      }
      
      if (savedResumeSettings) {
        setResumeSettings(JSON.parse(savedResumeSettings));
      }
    } catch (error) {
      console.error("Error loading resume data:", error);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        resumeSettings,
        updatePersonal,
        updateObjective,
        addEducation,
        updateEducation,
        removeEducation,
        updateSkills,
        addSkillCategory,
        removeSkillCategory,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        addAchievement,
        updateAchievement,
        removeAchievement,
        updateSettings,
        resetResume,
        saveResume,
        loadResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

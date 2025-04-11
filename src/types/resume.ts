
export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  description?: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  isInternship?: boolean;
};

export type Project = {
  id: string;
  title: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  description: string;
  link?: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
};

export type Achievement = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type ResumeData = {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    github?: string;
    linkedin?: string;
  };
  objective: string;
  education: Education[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
};

export type ResumeTemplate = "modern" | "classic" | "creative";

export type ResumeSettings = {
  template: ResumeTemplate;
  primaryColor: string;
  showContactIcons: boolean;
  showSectionIcons: boolean;
  fontSize: "small" | "medium" | "large";
};

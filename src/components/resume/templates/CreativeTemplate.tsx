
import { useResume } from "@/contexts/ResumeContext";
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";

const CreativeTemplate = () => {
  const { resumeData } = useResume();
  const { personal, objective, education, skills, experience, projects, certifications, achievements } = resumeData;

  return (
    <div className="w-full h-full flex bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/3 bg-resume-primary text-white p-6 flex flex-col">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold">
              {personal.name ? personal.name.charAt(0) : "?"}
            </span>
          </div>
          <h1 className="text-xl font-bold">{personal.name || "Your Name"}</h1>
        </div>
        
        <div className="space-y-6 flex-grow">
          {/* Contact Info */}
          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">Contact</h2>
            <div className="space-y-2 text-sm">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a href={personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Website
                  </a>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub
                  </a>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </section>
          
          {/* Skills */}
          {skills.some(category => category.skills.length > 0) && (
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">Skills</h2>
              <div className="space-y-3">
                {skills.filter(category => category.skills.length > 0).map((category, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-sm">{category.category}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {category.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-white/10 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <p className="font-medium">{edu.degree}</p>
                    <p>{edu.institution}</p>
                    <p className="text-xs opacity-80">{edu.startDate} - {edu.endDate}</p>
                    {edu.grade && <p className="text-xs mt-1">Grade: {edu.grade}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">Certifications</h2>
              <div className="space-y-2 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium">{cert.title}</p>
                    <p className="text-xs">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-6 flex flex-col">
        {/* Objective */}
        {objective && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-resume-primary mb-2">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300">{objective}</p>
          </section>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-resume-primary mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-resume-primary pb-4">
                  <div className="absolute w-3 h-3 bg-resume-primary rounded-full -left-[7px] top-1"></div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{exp.title}</h3>
                    {exp.isInternship && (
                      <span className="text-xs py-0.5 px-1.5 rounded-full bg-resume-primary/20 text-resume-primary">
                        Internship
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{exp.company} • {exp.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-resume-primary mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="relative pl-6 border-l-2 border-resume-primary pb-4">
                  <div className="absolute w-3 h-3 bg-resume-primary rounded-full -left-[7px] top-1"></div>
                  <h3 className="font-bold">
                    {project.title}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-resume-primary hover:underline">
                        (View Project)
                      </a>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{project.startDate} - {project.endDate}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Achievements */}
        {achievements.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-resume-primary mb-3">Achievements</h2>
            <div className="space-y-2">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{achievement.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;

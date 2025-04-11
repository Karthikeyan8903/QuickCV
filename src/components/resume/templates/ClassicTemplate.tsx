
import { useResume } from "@/contexts/ResumeContext";

const ClassicTemplate = () => {
  const { resumeData } = useResume();
  const { personal, objective, education, skills, experience, projects, certifications, achievements } = resumeData;

  return (
    <div className="p-8 w-full h-full flex flex-col bg-white dark:bg-resume-dark">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-300 dark:border-gray-600">
        <h1 className="text-3xl font-bold mb-1">{personal.name || "Your Name"}</h1>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-700 dark:text-gray-300 text-sm">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-700 dark:text-gray-300 text-sm">
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {personal.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          
          {personal.github && (
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
          )}
          
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
        </div>
      </div>
      
      {/* Objective */}
      {objective && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Professional Summary</h2>
          <p className="text-gray-700 dark:text-gray-300">{objective}</p>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <span className="text-gray-600 dark:text-gray-400">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p>{edu.institution}, {edu.location}</p>
                {edu.grade && <p>Grade: {edu.grade}</p>}
                {edu.description && <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">
                    {exp.title}
                    {exp.isInternship && (
                      <span className="ml-2 text-sm font-normal italic">(Internship)</span>
                    )}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="italic">{exp.company}, {exp.location}</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-1 space-y-1 pl-4">
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
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">
                    {project.title}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 dark:text-blue-400 text-sm hover:underline">
                        (View)
                      </a>
                    )}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-400">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <p className="italic">Technologies: {project.technologies.join(", ")}</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.some(category => category.skills.length > 0) && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Skills</h2>
          <div className="space-y-2">
            {skills.filter(category => category.skills.length > 0).map((category, index) => (
              <div key={index}>
                <h3 className="font-bold">{category.category}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {category.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{cert.title}</span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 dark:text-blue-400 text-sm hover:underline">
                      (Verify)
                    </a>
                  )}
                  <span className="ml-2">- {cert.issuer}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Achievements</h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{achievement.title}</span>
                  <p className="text-gray-700 dark:text-gray-300">{achievement.description}</p>
                </div>
                <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">{achievement.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;

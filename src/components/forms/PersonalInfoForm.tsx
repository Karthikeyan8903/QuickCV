
import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";

const PersonalInfoForm = () => {
  const { resumeData, updatePersonal } = useResume();
  const { personal } = resumeData;

  return (
    <Card className="border border-muted">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">Personal Information</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Full Name
              </Label>
              <Input
                id="name"
                value={personal.name}
                onChange={(e) => updatePersonal({ name: e.target.value })}
                placeholder="Jane Doe"
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={personal.email}
                onChange={(e) => updatePersonal({ email: e.target.value })}
                placeholder="jane.doe@example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={personal.phone}
                onChange={(e) => updatePersonal({ phone: e.target.value })}
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </Label>
              <Input
                id="location"
                value={personal.location}
                onChange={(e) => updatePersonal({ location: e.target.value })}
                placeholder="City, State, Country"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Website
              </Label>
              <Input
                id="website"
                value={personal.website || ""}
                onChange={(e) => updatePersonal({ website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Label>
              <Input
                id="github"
                value={personal.github || ""}
                onChange={(e) => updatePersonal({ github: e.target.value })}
                placeholder="github.com/username"
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={personal.linkedin || ""}
                onChange={(e) => updatePersonal({ linkedin: e.target.value })}
                placeholder="linkedin.com/in/username"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;

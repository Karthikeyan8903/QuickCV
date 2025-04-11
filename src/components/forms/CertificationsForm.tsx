
import { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  PlusCircle, 
  Trash2, 
  Calendar, 
  ExternalLink 
} from "lucide-react";

const CertificationsForm = () => {
  const { resumeData, addCertification, removeCertification } = useResume();
  const { certifications } = resumeData;
  
  const [newCert, setNewCert] = useState({
    title: "",
    issuer: "",
    date: "",
    link: "",
  });
  
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddCertification = () => {
    if (newCert.title && newCert.issuer) {
      addCertification({
        title: newCert.title,
        issuer: newCert.issuer,
        date: newCert.date,
        link: newCert.link,
      });
      
      setNewCert({
        title: "",
        issuer: "",
        date: "",
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
            <Award className="h-5 w-5" /> Certifications
          </h2>
          
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          )}
        </div>
        
        {isAdding && (
          <div className="border rounded-md p-4 mb-4 bg-muted/40">
            <h3 className="font-medium mb-3">New Certification</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="cert-title">Certification Title</Label>
                <Input
                  id="cert-title"
                  value={newCert.title}
                  onChange={(e) => setNewCert({...newCert, title: e.target.value})}
                  placeholder="E.g., AWS Certified Solutions Architect"
                />
              </div>
              
              <div>
                <Label htmlFor="cert-issuer">Issuer</Label>
                <Input
                  id="cert-issuer"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
                  placeholder="E.g., Amazon Web Services"
                />
              </div>
              
              <div>
                <Label htmlFor="cert-date">Date</Label>
                <Input
                  id="cert-date"
                  value={newCert.date}
                  onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                  placeholder="E.g., May 2023"
                />
              </div>
              
              <div>
                <Label htmlFor="cert-link">Certification Link (Optional)</Label>
                <Input
                  id="cert-link"
                  value={newCert.link}
                  onChange={(e) => setNewCert({...newCert, link: e.target.value})}
                  placeholder="E.g., https://www.credly.com/badges/your-certification"
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
                  onClick={handleAddCertification}
                  disabled={!newCert.title || !newCert.issuer}
                >
                  Save Certification
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* List of certifications */}
        {certifications.length > 0 ? (
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="border rounded-md p-4 hover:bg-muted/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {cert.title}
                      {cert.link && (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" /> 
                      {cert.date}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                    onClick={() => removeCertification(cert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Certification</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
            <Award className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">
              No certifications added yet. Add your certifications to showcase your qualifications.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationsForm;

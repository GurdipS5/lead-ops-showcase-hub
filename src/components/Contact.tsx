
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Mail, Linkedin, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "gurdip.sira@example.com",
      href: "mailto:gurdip.sira@example.com",
    },
    {
      icon: Globe,
      label: "Website",
      value: "gurdipsira.dev",
      href: "https://gurdipsira.dev",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/gurdipsira",
      href: "https://linkedin.com/in/gurdipsira",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/gurdipsira",
      href: "https://github.com/gurdipsira",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container">
        <h2 className="section-heading">Get In Touch</h2>
        
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can I help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-devops-accent hover:bg-devops-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-devops-accent/50 transition-colors"
                  >
                    <div className="bg-devops-accent/10 p-2 rounded-full">
                      <info.icon className="h-5 w-5 text-devops-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-devops-medium">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Let's Collaborate</h3>
                <p className="mb-4">
                  I'm always open to discussing new projects, opportunities for collaboration, or ways to help your organization with DevOps implementation and strategy.
                </p>
                <p>
                  Whether you need consultation on cloud architecture, help with implementing CI/CD pipelines, or guidance on your DevOps transformation journey, I'd love to hear from you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

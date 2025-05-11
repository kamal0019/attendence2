import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
  FileText,
  BarChart,
  ArrowRight,
} from "lucide-react";

export function LandingPage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Student Management",
      description: "Efficiently manage student records, attendance, and academic progress.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Faculty Portal",
      description: "Streamlined interface for faculty to manage courses and student interactions.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Course Scheduling",
      description: "Intelligent course scheduling and timetable management system.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Academic Resources",
      description: "Access to digital library, study materials, and academic resources.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Management",
      description: "Secure storage and management of academic documents and records.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting for academic performance.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              College ERP System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your academic institution with our comprehensive Enterprise Resource Planning system.
            </p>
            <div className="flex justify-center gap-4">
              {isAuthenticated ? (
                <Button asChild size="lg">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" variant="default">
                    <Link to="/login">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/login">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Comprehensive Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your academic institution efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the digital transformation of education management with our comprehensive ERP solution.
            </p>
            <Button asChild size="lg">
              <Link to="/login">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 College ERP System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 
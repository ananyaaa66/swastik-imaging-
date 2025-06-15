import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestTube, Microscope, XRay, Activity, Settings } from "lucide-react";

export default function Services() {
  const serviceCategories = [
    {
      icon: TestTube,
      title: "Blood Tests",
      description: "Comprehensive blood analysis and screening tests",
    },
    {
      icon: Microscope,
      title: "Urine Tests",
      description: "Complete urinalysis and microscopic examination",
    },
    {
      icon: XRay,
      title: "Imaging",
      description: "Digital radiography and diagnostic imaging",
    },
    {
      icon: Activity,
      title: "Cardiac Tests",
      description: "ECG and heart health monitoring services",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-medical-light via-white to-medical-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-medical-accent text-medical-primary border-medical-secondary mb-4">
              Our Services
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Diagnostic Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art diagnostic testing with accurate results and
              expert medical supervision.
            </p>
          </div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-medical-light rounded-full mb-4">
              <Settings className="w-8 h-8 text-medical-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Services Page Under Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're creating a detailed services page with comprehensive test
              listings, descriptions, and pricing information.
            </p>
          </div>

          {/* Service Categories Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:border-medical-primary hover:shadow-lg transition-all duration-200 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-medical-light rounded-full flex items-center justify-center group-hover:bg-medical-primary transition-colors duration-200">
                    <category.icon className="w-8 h-8 text-medical-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              For detailed test information and current pricing, please contact
              us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+91-7303034849"
                className="inline-flex items-center justify-center px-6 py-3 bg-medical-primary text-white rounded-lg hover:bg-medical-secondary transition-colors duration-200"
              >
                Call +91-7303034849
              </a>
              <a
                href="mailto:swastikimaginganddiagnostics@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-medical-primary text-medical-primary rounded-lg hover:bg-medical-primary hover:text-white transition-colors duration-200"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

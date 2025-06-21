import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TestTube,
  Microscope,
  Radiation,
  Activity,
  Heart,
  Stethoscope,
  Eye,
  Brain,
  Shield,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Services() {
  const serviceCategories = [
    {
      title: "Ultrasound & Imaging",
      icon: Eye,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      services: [
        "Ultrasound",
        "Color Doppler",
        "Level II Scans",
        "3D/4D Ultrasound",
        "TVS and TRUS",
        "USG Guided FNAC and BIOPSY",
      ],
    },
    {
      title: "Advanced Radiology",
      icon: Radiation,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      services: ["CT Scan", "MRI Scan", "X-Ray", "Interventional Radiology"],
    },
    {
      title: "Cardiac Diagnostics",
      icon: Heart,
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
      services: ["ECG", "2D ECHO", "Stress ECHO"],
    },
    {
      title: "Laboratory Tests",
      icon: TestTube,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      services: [
        "All Blood Tests",
        "Complete Blood Count (CBC)",
        "Lipid Profile",
        "Liver Function Tests",
        "Kidney Function Tests",
        "Thyroid Function Tests",
        "Diabetes Panel",
        "Tumor Markers",
      ],
    },
    {
      title: "Health Packages",
      icon: Shield,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      services: [
        "Health Check Up",
        "Executive Health Package",
        "Diabetes Screening",
        "Cardiac Health Package",
        "Women's Health Package",
        "Senior Citizen Package",
      ],
    },
    {
      title: "Consultation",
      icon: Stethoscope,
      color: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-600",
      services: [
        "Consultation",
        "Report Analysis",
        "Second Opinion",
        "Health Counseling",
      ],
    },
  ];

  const highlights = [
    "State-of-the-art equipment",
    "Same day results for most tests",
    "Expert radiologist supervision",
    "Affordable pricing",
    "Digital reports",
    "Online report access",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-medical-light via-white to-medical-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-medical-accent text-medical-primary border-medical-secondary mb-4">
              Our Comprehensive Services
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete Diagnostic Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From routine blood tests to advanced imaging, we offer a
              comprehensive range of diagnostic services with cutting-edge
              technology and expert medical supervision.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-2 bg-white rounded-lg p-3 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4 text-medical-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <Card
                key={index}
                className={`${category.color} hover:shadow-lg transition-all duration-200 group`}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <category.icon
                        className={`w-8 h-8 ${category.iconColor}`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <li
                        key={serviceIndex}
                        className="flex items-center space-x-2 text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-medical-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Serve You
            </h2>
            <p className="text-xl text-gray-600">
              Simple, efficient process for all your diagnostic needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Book Appointment",
                description: "Call or visit to schedule your test",
              },
              {
                step: "02",
                title: "Sample Collection",
                description: "Quick and comfortable sample collection",
              },
              {
                step: "03",
                title: "Analysis",
                description: "Advanced equipment and expert analysis",
              },
              {
                step: "04",
                title: "Report Delivery",
                description: "Digital reports delivered on time",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-medical-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-medical-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Need a Diagnostic Test?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today or call us for more information about
            our services and pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book-appointment">
              <Button
                size="lg"
                className="bg-white text-medical-primary hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-lg shadow-lg"
              >
                Book Appointment Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="tel:+91-7303034849">
              <Button
                size="lg"
                className="bg-medical-secondary text-white hover:bg-medical-primary border-2 border-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call +91-7303034849
              </Button>
            </a>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm mb-2">Visit Us At:</p>
            <p className="text-white font-medium">
              26/3, Ground Floor, Old Rajinder Nagar, New Delhi-110060
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

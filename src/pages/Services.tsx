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

      {/* FAQs Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our diagnostic services
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-medical-primary transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How long does it take to get test results?
              </h3>
              <p className="text-gray-600">
                Most blood tests and basic diagnostic tests provide same-day
                results. Advanced imaging like CT/MRI scans typically take 24-48
                hours. We'll inform you of the exact timeline when you book your
                appointment.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-medical-primary transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do I need to fast before blood tests?
              </h3>
              <p className="text-gray-600">
                Fasting requirements depend on the specific tests ordered.
                Common tests like lipid profile, glucose, and liver function
                tests require 8-12 hours of fasting. We'll provide specific
                instructions when you book your appointment.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-medical-primary transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I book multiple tests in one appointment?
              </h3>
              <p className="text-gray-600">
                Yes, you can book multiple tests during a single visit. This is
                often more convenient and cost-effective. Our staff will
                coordinate the timing and preparation requirements for all your
                tests.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-medical-primary transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What should I bring for my appointment?
              </h3>
              <p className="text-gray-600">
                Please bring a valid photo ID (Aadhar card, driving license,
                etc.), any previous medical reports or prescriptions, and your
                insurance card if applicable. Wear comfortable, loose-fitting
                clothing for certain tests.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-medical-primary transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Are your diagnostic equipment and lab NABL certified?
              </h3>
              <p className="text-gray-600">
                Yes, we are ISO certified and follow international quality
                standards. Our laboratory equipment is regularly calibrated and
                maintained to ensure accurate and reliable results.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-medical-primary transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you provide home sample collection?
              </h3>
              <p className="text-gray-600">
                Yes, we offer home sample collection services for blood tests
                and other basic samples. Additional charges may apply. Please
                call us at +91-7303034849 to schedule home collection.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-medical-primary transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I get a digital copy of my reports?
              </h3>
              <p className="text-gray-600">
                Yes, all reports are available in digital format. You can
                collect physical copies from our center or request digital
                copies to be sent via email or WhatsApp for your convenience.
              </p>
            </div>
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
                className="bg-white text-medical-primary hover:bg-gray-50 border-2 border-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg"
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

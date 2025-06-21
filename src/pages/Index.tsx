import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Heart,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Microscope,
  Stethoscope,
  Radiation,
  TestTube,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const services = [
    {
      icon: TestTube,
      title: "Blood Tests",
      description: "Comprehensive blood analysis and screening",
    },
    {
      icon: Microscope,
      title: "Urine Tests",
      description: "Complete urinalysis and microscopic examination",
    },
    {
      icon: Radiation,
      title: "X-Ray",
      description: "Digital radiography for accurate diagnosis",
    },
    {
      icon: Activity,
      title: "ECG",
      description: "Electrocardiogram for heart health monitoring",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Accurate Results",
      description: "State-of-the-art equipment ensures precise diagnostics",
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Fast processing with same-day results for most tests",
    },
    {
      icon: Heart,
      title: "Expert Care",
      description: "Led by experienced medical professionals",
    },
    {
      icon: CheckCircle,
      title: "Affordable Pricing",
      description: "Quality healthcare at competitive prices",
    },
  ];

  const testimonials = [
    {
      name: "Raj Kumar",
      location: "New Delhi",
      rating: 5,
      comment:
        "Excellent service and very accurate results. Dr. Shweta Singh is very professional and caring.",
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment:
        "Quick and efficient service. The staff is friendly and the facility is very clean.",
    },
    {
      name: "Amit Singh",
      location: "New Delhi",
      rating: 5,
      comment:
        "Affordable prices without compromising on quality. Highly recommended for all diagnostic needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-light via-white to-medical-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-medical-accent text-medical-primary border-medical-secondary mb-4">
                  Led by Dr. Shweta Singh - Gold Medalist
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Accurate. Affordable.{" "}
                  <span className="text-medical-primary">Reliable</span>{" "}
                  Diagnostics.
                </h1>
                <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                  Your trusted partner in healthcare diagnostics. We provide
                  comprehensive testing services with state-of-the-art equipment
                  and expert medical supervision.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-appointment">
                  <Button
                    size="lg"
                    className="bg-medical-primary hover:bg-medical-secondary text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Book Your Appointment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="tel:+91-7303034849">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-200"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Call Now
                  </Button>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-medical-primary" />
                  <span className="text-gray-600">ISO Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-medical-primary" />
                  <span className="text-gray-600">Same Day Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-medical-primary" />
                  <span className="text-gray-600">Expert Supervision</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-medical-light rounded-full flex items-center justify-center">
                      <Stethoscope className="w-12 h-12 text-medical-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Professional Care
                    </h3>
                    <p className="text-gray-600">
                      Expert medical team dedicated to your health
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-medical-light rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-medical-primary">
                        500+
                      </div>
                      <div className="text-sm text-gray-600">
                        Happy Patients
                      </div>
                    </div>
                    <div className="bg-medical-light rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-medical-primary">
                        15+
                      </div>
                      <div className="text-sm text-gray-600">
                        Test Categories
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              About Swastik Imaging & Diagnostics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing accurate, affordable, and reliable
              diagnostic services to the community, led by experienced medical
              professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Your Health, Our Priority
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At Swastik Imaging & Diagnostics, we understand that accurate
                diagnosis is the foundation of effective treatment. Our
                state-of-the-art facility in New Delhi is equipped with the
                latest diagnostic equipment and staffed by experienced medical
                professionals.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Led by Dr. Shweta Singh, a gold medalist in Radiology, our team
                is dedicated to providing you with precise results and
                compassionate care. We believe quality healthcare should be
                accessible to everyone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Diagnostic Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of diagnostic tests and imaging services to
              meet all your healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:border-medical-primary hover:shadow-lg transition-all duration-200 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-medical-light rounded-full flex items-center justify-center group-hover:bg-medical-primary transition-colors duration-200">
                    <service.icon className="w-8 h-8 text-medical-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button className="bg-medical-primary hover:bg-medical-secondary text-white px-8 py-3 rounded-lg font-medium">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by hundreds of patients for accurate and reliable
              diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-medical-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Book Your Diagnostic Test?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards better health. Book your appointment
            today and experience our professional, caring service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-appointment">
              <Button
                size="lg"
                className="bg-white text-medical-primary hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-lg shadow-lg"
              >
                Book Appointment Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
        </div>
      </section>
    </div>
  );
}

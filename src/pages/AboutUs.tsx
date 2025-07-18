import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  Clock,
  Shield,
  Heart,
  Target,
  CheckCircle,
  Stethoscope,
  Brain,
  Eye,
  Phone,
  ArrowRight,
  Star,
  Microscope,
  Building2,
} from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: Shield,
      title: "Accuracy & Precision",
      description:
        "We ensure precise and reliable diagnostic results using state-of-the-art equipment and expert analysis.",
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "Every patient receives personalized attention and care in a comfortable, supportive environment.",
    },
    {
      icon: Clock,
      title: "Timely Service",
      description:
        "We understand the importance of quick results and provide same-day reports for most tests.",
    },
    {
      icon: Target,
      title: "Affordable Healthcare",
      description:
        "Quality diagnostic services at competitive prices, making healthcare accessible to everyone.",
    },
  ];

  const achievements = [
    {
      icon: Users,
      number: "1000+",
      title: "Happy Patients",
      description: "Satisfied patients who trust us with their health",
    },
    {
      icon: Award,
      number: "10+",
      title: "Years Experience",
      description: "Combined experience in diagnostic healthcare",
    },
    {
      icon: Microscope,
      number: "20+",
      title: "Test Categories",
      description: "Comprehensive range of diagnostic services",
    },
    {
      icon: CheckCircle,
      number: "99.8%",
      title: "Accuracy Rate",
      description: "Precise results with advanced technology",
    },
  ];

  const team = [
    {
      name: "Dr. Shweta Singh",
      qualification: "M.B.B.S MD RADIOLOGY (GOLD MEDALIST)",
      specialization: "Chief Radiologist & Medical Director",
      experience: "10+ years",
      description:
        "Gold medalist in Radiology with extensive experience in diagnostic imaging and interventional radiology.",
    },
    {
      name: "Laboratory Team",
      qualification: "Certified Lab Technicians",
      specialization: "Blood & Urine Analysis",
      experience: "10+ years",
      description:
        "Experienced team of certified laboratory technicians ensuring accurate test results.",
    },
    {
      name: "Imaging Specialists",
      qualification: "Certified Radiologic Technologists",
      specialization: "CT, MRI & Ultrasound",
      experience: "8+ years",
      description:
        "Skilled imaging specialists trained in advanced diagnostic equipment operation.",
    },
  ];

  const facilities = [
    {
      icon: Brain,
      title: "Advanced Imaging",
      description: "CT Scan, MRI, Digital X-Ray, and Ultrasound facilities",
    },
    {
      icon: Microscope,
      title: "Modern Laboratory",
      description: "Fully automated laboratory with latest analyzers",
    },
    {
      icon: Heart,
      title: "Cardiac Center",
      description: "ECG, 2D Echo, and Stress Echo capabilities",
    },
    {
      icon: Building2,
      title: "Comfortable Environment",
      description: "Patient-friendly facility with modern amenities",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-medical-light via-white to-medical-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-medical-accent text-medical-primary border-medical-secondary mb-4">
              About Our Center
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Committed to Excellence in Diagnostic Healthcare
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              At Swastik Imaging & Diagnostics, we combine cutting-edge
              technology with compassionate care to provide accurate,
              affordable, and reliable diagnostic services to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-medical-accent bg-medical-light">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-medical-primary mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To provide world-class diagnostic services that enable early
                  detection, accurate diagnosis, and effective treatment
                  planning while ensuring accessibility and affordability for
                  all members of our community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-medical-accent bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-medical-primary mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To be the leading diagnostic center in Delhi, recognized for
                  our commitment to excellence, innovation in healthcare
                  technology, and unwavering dedication to patient care and
                  satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Dr. Shweta Singh */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Medical Director
            </h2>
            <p className="text-xl text-gray-600">
              Leading with expertise and compassion
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-medical-primary shadow-lg">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Ffb56e24d07534bf98f10782753fb5534%2Feb2102651bdc422e98e458bf6c03430b?format=webp&width=800"
                      alt="Dr. Shweta Singh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      <Star className="w-3 h-3 mr-1" />
                      Gold Medalist
                    </Badge>
                    <Badge className="bg-medical-accent text-medical-primary border-medical-secondary ml-2">
                      ISO Certified
                    </Badge>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      Dr. Shweta Singh
                    </h3>
                    <p className="text-lg text-medical-primary font-semibold mb-1">
                      M.B.B.S MD RADIOLOGY (GOLD MEDALIST)
                    </p>
                    <p className="text-gray-600">
                      Chief Radiologist & Medical Director
                    </p>
                    <p className="text-gray-600">Reg No DMC 95495</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Dr. Shweta Singh is a highly accomplished radiologist with
                      over 10 years of experience in diagnostic imaging and
                      interventional radiology. As a gold medalist in her MD
                      Radiology, she brings exceptional expertise and precision
                      to every diagnosis.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Her commitment to staying updated with the latest
                      advancements in medical imaging technology ensures that
                      patients receive the most accurate and comprehensive
                      diagnostic services available.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-medical-primary">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">
                        10+ Years Experience
                      </span>
                    </div>
                    <div className="flex items-center text-medical-primary">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">
                        Gold Medalist MD
                      </span>
                    </div>
                    <div className="flex items-center text-medical-primary">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">
                        DMC Registered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:border-medical-primary hover:shadow-lg transition-all duration-200 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-medical-light rounded-full flex items-center justify-center group-hover:bg-medical-primary transition-colors duration-200">
                    <value.icon className="w-8 h-8 text-medical-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-gray-200 bg-white">
                <CardContent className="p-6 text-center">
                  <achievement.icon className="w-12 h-12 text-medical-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-medical-primary mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600">
              State-of-the-art equipment and comfortable environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <facility.icon className="w-6 h-6 text-medical-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {facility.title}
                      </h3>
                      <p className="text-gray-600">{facility.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-medical-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose Swastik Imaging & Diagnostics?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Experience the difference of personalized healthcare with
              cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "Gold Medalist Radiologist",
              "10+ Years of Experience",
              "State-of-the-art Equipment",
              "Same Day Results",
              "Affordable Pricing",
              "ISO Certified Center",
              "Comprehensive Services",
              "Convenient Location",
              "Expert Medical Team",
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/book-appointment">
                <Button
                  size="lg"
                  className="bg-white text-medical-primary hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-lg shadow-lg"
                >
                  Book Your Appointment
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
          </div>
        </div>
      </section>
    </div>
  );
}

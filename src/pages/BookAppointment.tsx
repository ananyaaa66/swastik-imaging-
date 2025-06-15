import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, Mail } from "lucide-react";

export default function BookAppointment() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-medical-light via-white to-medical-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-medical-accent text-medical-primary border-medical-secondary mb-4">
              Book Appointment
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Schedule Your Diagnostic Test
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Easy appointment booking for all your diagnostic needs. No login
              required.
            </p>
          </div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-medical-light rounded-full mb-4">
              <Calendar className="w-8 h-8 text-medical-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Appointment Booking System Under Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're creating a simple, user-friendly appointment booking form.
              In the meantime, please contact us directly to schedule your
              appointment.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-gray-200 hover:border-medical-primary hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Call to Book
                </h3>
                <p className="text-gray-600 mb-4">
                  Speak directly with our staff to schedule your appointment
                </p>
                <a
                  href="tel:+91-7303034849"
                  className="inline-flex items-center justify-center px-6 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-secondary transition-colors duration-200"
                >
                  +91-7303034849
                </a>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:border-medical-primary hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 mb-4">
                  Send us your appointment request via email
                </p>
                <a
                  href="mailto:swastikimaginganddiagnostics@gmail.com"
                  className="inline-flex items-center justify-center px-6 py-2 border border-medical-primary text-medical-primary rounded-lg hover:bg-medical-primary hover:text-white transition-colors duration-200"
                >
                  Email Now
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Operating Hours */}
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="p-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Operating Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      Monday - Saturday
                    </p>
                    <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Sunday</p>
                    <p className="text-gray-600">9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Form Preview */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Coming Soon: Online Booking Form
            </h3>
            <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
              <p className="text-gray-600 mb-4">
                The appointment booking form will include:
              </p>
              <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
                <li>• Name and Contact Information</li>
                <li>• Preferred Date and Time</li>
                <li>• Test Selection (dropdown/multi-select)</li>
                <li>• Additional Information (optional)</li>
                <li>• Instant Confirmation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

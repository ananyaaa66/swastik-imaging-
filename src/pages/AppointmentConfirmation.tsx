import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  FileText,
  ArrowRight,
  Download,
  Home,
} from "lucide-react";

export default function AppointmentConfirmation() {
  const [searchParams] = useSearchParams();
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);

  useEffect(() => {
    // Get appointment details from URL parameters
    const name = searchParams.get("name");
    const phone = searchParams.get("phone");
    const email = searchParams.get("email");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const tests = searchParams.get("tests");

    if (name && phone && date && time) {
      setAppointmentDetails({
        name,
        phone,
        email,
        date,
        time,
        tests: tests ? tests.split(",") : [],
      });
    }
  }, [searchParams]);

  if (!appointmentDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Appointment Details Found
          </h1>
          <Link to="/book-appointment">
            <Button className="bg-medical-primary hover:bg-medical-secondary text-white">
              Book New Appointment
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <section className="bg-gradient-to-br from-medical-light via-white to-medical-light py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Appointment Successfully Booked!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for choosing Swastik Imaging & Diagnostics. Your
            appointment has been confirmed and we will contact you shortly.
          </p>
        </div>
      </section>

      {/* Appointment Details */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Appointment Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Appointment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-medical-primary" />
                    <span>Appointment Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Patient Name
                      </Label>
                      <p className="text-lg font-semibold text-gray-900">
                        {appointmentDetails.name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Contact Number
                      </Label>
                      <p className="text-lg font-semibold text-gray-900">
                        {appointmentDetails.phone}
                      </p>
                    </div>
                    {appointmentDetails.email && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Email Address
                        </Label>
                        <p className="text-lg font-semibold text-gray-900">
                          {appointmentDetails.email}
                        </p>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Appointment Reference
                      </Label>
                      <p className="text-lg font-semibold text-medical-primary">
                        #SID{Date.now().toString().slice(-6)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-medical-primary" />
                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Date
                          </Label>
                          <p className="font-semibold text-gray-900">
                            {formatDate(appointmentDetails.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-medical-primary" />
                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Time
                          </Label>
                          <p className="font-semibold text-gray-900">
                            {appointmentDetails.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Tests */}
              {appointmentDetails.tests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-medical-primary" />
                      <span>
                        Selected Tests ({appointmentDetails.tests.length})
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {appointmentDetails.tests.map(
                        (test: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-medical-light rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-medical-primary flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {test}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Next Steps */}
              <Card className="bg-medical-light border-medical-accent">
                <CardHeader>
                  <CardTitle className="text-medical-primary">
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Confirmation Call
                        </h4>
                        <p className="text-sm text-gray-600">
                          Our team will call you within 2 hours to confirm your
                          appointment details.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Arrive 15 Minutes Early
                        </h4>
                        <p className="text-sm text-gray-600">
                          Please arrive 15 minutes before your scheduled time
                          with a valid ID proof.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Get Your Results
                        </h4>
                        <p className="text-sm text-gray-600">
                          Most test results are available the same day. We'll
                          inform you when they're ready.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-medical-primary" />
                    <div>
                      <p className="font-medium text-gray-900">Call Us</p>
                      <a
                        href="tel:+91-7303034849"
                        className="text-medical-primary hover:underline"
                      >
                        +91-7303034849
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-medical-primary" />
                    <div>
                      <p className="font-medium text-gray-900">Email Us</p>
                      <a
                        href="mailto:swastikimaginganddiagnostics@gmail.com"
                        className="text-medical-primary hover:underline text-sm"
                      >
                        swastikimaginganddiagnostics@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-medical-primary mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Visit Us</p>
                      <p className="text-sm text-gray-600">
                        26/3, Ground Floor
                        <br />
                        Old Rajinder Nagar
                        <br />
                        New Delhi - 110060
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    Important Reminders:
                  </h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Bring a valid photo ID</li>
                    <li>• Fast 8-12 hours for blood tests (if required)</li>
                    <li>• Wear comfortable, loose clothing</li>
                    <li>• Call us if you need to reschedule</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link to="/" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                  >
                    <Home className="mr-2 w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/book-appointment" className="block">
                  <Button className="w-full bg-medical-primary hover:bg-medical-secondary text-white">
                    <Calendar className="mr-2 w-4 h-4" />
                    Book Another Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple Label component if not available
const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

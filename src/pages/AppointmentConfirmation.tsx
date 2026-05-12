import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Home, Phone } from "lucide-react";

interface AppointmentData {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  age: number;
  appointmentDate: string;
  appointmentTime: string;
  testSelection: string;
  additionalNotes?: string;
}

export default function AppointmentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentData = location.state?.appointmentData as AppointmentData;

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify
-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Appointment Data</h1>
          <Button onClick={() => navigate("/")} className="bg-medical-primary">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your appointment has been successfully booked. We've sent you a WhatsApp confirmation.
          </p>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-medical-light border-b">
            <CardTitle className="text-medical-primary">Appointment Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Patient Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointmentData.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                  <p className="text-lg font-semibold text-gray-900">
                    +91 {appointmentData.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointmentData.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Age</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointmentData.age} years
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Gender</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointmentData.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Test Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointmentData.testSelection}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Appointment Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(appointmentData.appointmentDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Appointment Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {appointmentData.appointmentTime}
                  </p>
                </div>
              </div>

              {appointmentData.additionalNotes && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-gray-500 mb-2">Additional Notes</p>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {appointmentData.additionalNotes}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">📋 What's Next?</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>✓ We've sent you a WhatsApp message with your appointment details</li>
            <li>✓ Please arrive 10 minutes early to complete any formalities</li>
            <li>✓ Bring your ID and insurance card (if applicable)</li>
            <li>✓ Contact us if you need to reschedule or cancel</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-medical-primary text-medical-primary hover:bg-medical-light"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
          <a href="tel:+917303034849">
            <Button className="w-full bg-medical-primary hover:bg-medical-secondary text-white">
              <Phone className="mr-2 h-5 w-5" />
              Call Clinic
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  User,
  FileText,
} from "lucide-react";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    additionalInfo: "",
  });

  const testCategories = [
    {
      category: "Ultrasound & Imaging",
      tests: [
        "Ultrasound",
        "Color Doppler",
        "Level II Scans",
        "3D/4D Ultrasound",
        "TVS and TRUS",
        "USG Guided FNAC and BIOPSY",
      ],
    },
    {
      category: "Advanced Radiology",
      tests: ["CT Scan", "MRI Scan", "X-Ray", "Interventional Radiology"],
    },
    {
      category: "Cardiac Diagnostics",
      tests: ["ECG", "2D ECHO", "Stress ECHO"],
    },
    {
      category: "Laboratory Tests",
      tests: [
        "Complete Blood Count (CBC)",
        "Lipid Profile",
        "Liver Function Tests",
        "Kidney Function Tests",
        "Thyroid Function Tests",
        "Diabetes Panel",
        "Tumor Markers",
        "Urine Analysis",
        "Blood Sugar",
        "HbA1c",
        "ESR",
        "CRP",
      ],
    },
    {
      category: "Health Packages",
      tests: [
        "Basic Health Check Up",
        "Executive Health Package",
        "Diabetes Screening",
        "Cardiac Health Package",
        "Women's Health Package",
        "Senior Citizen Package",
      ],
    },
    {
      category: "Consultation",
      tests: [
        "General Consultation",
        "Report Analysis",
        "Second Opinion",
        "Health Counseling",
      ],
    },
  ];

  const API_BASE = import.meta.env.VITE_API_BASE || "";

  const timeSlots = [
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
  ];

  const handleTestSelection = (test: string) => {
    setSelectedTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test],
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || "",
      date: formData.date,
      time: formData.time,
      tests: selectedTests,
      additionalInfo: formData.additionalInfo || "",
    };

    try {
      const response = await fetch(`${API_BASE}/api/send-whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send WhatsApp notification.");
      }

      const params = new URLSearchParams({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        date: payload.date,
        time: payload.time,
        tests: payload.tests.join(","),
      });

      navigate(`/appointment-confirmation?${params.toString()}`);
    } catch (error: any) {
      console.error("Send WhatsApp error", error);
      alert(
        error?.message ||
          "Could not send appointment notification. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-medical-light via-white to-medical-light py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-medical-accent text-medical-primary border-medical-secondary mb-4">
              Book Your Appointment
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Diagnostic Test
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to book your appointment. No login
              required. We'll contact you to confirm your booking details.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-medical-primary" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Contact Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91-XXXXXXXXXX"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Address (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your.email@example.com"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-medical-primary" />
                      <span>Appointment Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label
                        htmlFor="date"
                        className="text-sm font-medium text-gray-700"
                      >
                        Preferred Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="time"
                        className="text-sm font-medium text-gray-700"
                      >
                        Preferred Time *
                      </Label>
                      <select
                        id="time"
                        required
                        value={formData.time}
                        onChange={(e) =>
                          handleInputChange("time", e.target.value)
                        }
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary focus:border-transparent"
                      >
                        <option value="">Select a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Test Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-medical-primary" />
                      <span>Select Tests</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Choose the diagnostic tests you need. You can select
                      multiple tests.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-96 overflow-y-auto space-y-6 pr-2">
                      {testCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                          <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                            {category.category}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {category.tests.map((test, testIndex) => (
                              <div
                                key={testIndex}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`test-${categoryIndex}-${testIndex}`}
                                  checked={selectedTests.includes(test)}
                                  onCheckedChange={() =>
                                    handleTestSelection(test)
                                  }
                                />
                                <Label
                                  htmlFor={`test-${categoryIndex}-${testIndex}`}
                                  className="text-sm text-gray-700 cursor-pointer flex-1"
                                >
                                  {test}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedTests.length > 0 && (
                      <div className="mt-4 p-3 bg-medical-light rounded-lg">
                        <p className="text-sm font-medium text-medical-primary mb-2">
                          Selected Tests ({selectedTests.length}):
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedTests.map((test, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-medical-accent text-medical-primary"
                            >
                              {test}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-medical-primary" />
                      <span>Additional Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label
                        htmlFor="additionalInfo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Any additional information or special requirements
                        (Optional)
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) =>
                          handleInputChange("additionalInfo", e.target.value)
                        }
                        placeholder="Please mention any specific requirements, medical conditions, or questions..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-medical-primary hover:bg-medical-secondary text-white py-3 text-lg font-medium"
                  disabled={
                    !formData.name ||
                    !formData.phone ||
                    !formData.date ||
                    !formData.time ||
                    selectedTests.length === 0
                  }
                >
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Confirm Appointment
                </Button>
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
                  </CardContent>
                </Card>

                {/* Operating Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-medical-primary" />
                      <span>Operating Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">
                          Monday - Saturday
                        </span>
                      </div>
                      <div className="text-medical-primary font-medium">
                        8:30 AM - 8:30 PM
                      </div>

                      <div className="flex justify-between mt-3">
                        <span className="font-medium text-gray-900">
                          Sunday
                        </span>
                      </div>
                      <div className="text-medical-primary font-medium">
                        8:30 AM - 5:00 PM
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Notes */}
                <Card className="bg-medical-light border-medical-accent">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-medical-primary mb-2">
                      Important Notes:
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • Please arrive 15 minutes before your appointment
                      </li>
                      <li>• Bring a valid ID proof</li>
                      <li>
                        • Fast for 8-12 hours for blood tests (if required)
                      </li>
                      <li>• We'll confirm your appointment via phone</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

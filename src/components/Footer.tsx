import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-medical-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">+91-7303034849</p>
                  <p className="text-sm text-gray-600">Call for appointments</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-medical-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    swastikimaginganddiagnostics@gmail.com
                  </p>
                  <p className="text-sm text-gray-600">
                    Email us for inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-medical-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    26/3, Ground Floor
                  </p>
                  <p className="text-gray-700">Old Rajinder Nagar</p>
                  <p className="text-gray-700">New Delhi - 110060</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Operating Hours
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-medical-primary" />
                <span className="text-sm text-gray-600">Monday - Saturday</span>
              </div>
              <p className="text-gray-900 font-medium">8:30 AM - 8:30 PM</p>
              <div className="mt-3">
                <p className="text-sm text-gray-600">Sunday</p>
                <p className="text-gray-900 font-medium">8:30 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-600 hover:text-medical-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-600 hover:text-medical-primary transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="/services"
                className="block text-gray-600 hover:text-medical-primary transition-colors duration-200"
              >
                Services
              </Link>
              <Link
                to="/book-appointment"
                className="block text-gray-600 hover:text-medical-primary transition-colors duration-200"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © 2024 Swastik Imaging & Diagnostics. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Led by Dr. Shweta Singh - M.B.B.S MD RADIOLOGY (GOLD MEDALIST)
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-medical-primary font-medium text-sm">
                Accurate. Affordable. Reliable Diagnostics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

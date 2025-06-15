import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin } from "lucide-react";

const MedicalCrossLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative w-12 h-12">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="medicalLogoGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00704A" />
            <stop offset="50%" stopColor="#4F9A68" />
            <stop offset="100%" stopColor="#86C49B" />
          </linearGradient>
        </defs>

        {/* Outer cross framework with rounded corners */}
        <path
          d="M10 10 Q10 5 15 5 L35 5 L35 35 L65 35 L65 5 L85 5 Q90 5 90 10 L90 35 Q90 40 85 40 L65 40 L65 60 L85 60 Q90 60 90 65 L90 85 Q90 90 85 90 L65 90 L65 65 L35 65 L35 90 L15 90 Q10 90 10 85 L10 65 Q10 60 15 60 L35 60 L35 40 L15 40 Q10 40 10 35 L10 10 Z"
          fill="url(#medicalLogoGradient)"
        />

        {/* Inner interlocking curves - Top Left */}
        <path
          d="M35 35 L35 20 Q35 15 30 15 L20 15 Q15 15 15 20 L15 30 Q15 35 20 35 L35 35 Z"
          fill="white"
        />

        {/* Inner interlocking curves - Top Right */}
        <path
          d="M65 35 L80 35 Q85 35 85 30 L85 20 Q85 15 80 15 L70 15 Q65 15 65 20 L65 35 Z"
          fill="white"
        />

        {/* Inner interlocking curves - Bottom Left */}
        <path
          d="M35 65 L20 65 Q15 65 15 70 L15 80 Q15 85 20 85 L30 85 Q35 85 35 80 L35 65 Z"
          fill="white"
        />

        {/* Inner interlocking curves - Bottom Right */}
        <path
          d="M65 65 L65 80 Q65 85 70 85 L80 85 Q85 85 85 80 L85 70 Q85 65 80 65 L65 65 Z"
          fill="white"
        />

        {/* Central cross area with white background */}
        <rect x="35" y="35" width="30" height="30" fill="white" />

        {/* Inner cross connecting elements */}
        <rect
          x="40"
          y="35"
          width="20"
          height="10"
          fill="url(#medicalLogoGradient)"
          rx="5"
        />
        <rect
          x="40"
          y="55"
          width="20"
          height="10"
          fill="url(#medicalLogoGradient)"
          rx="5"
        />
        <rect
          x="35"
          y="40"
          width="10"
          height="20"
          fill="url(#medicalLogoGradient)"
          rx="5"
        />
        <rect
          x="55"
          y="40"
          width="10"
          height="20"
          fill="url(#medicalLogoGradient)"
          rx="5"
        />

        {/* Central white square */}
        <rect x="45" y="45" width="10" height="10" fill="white" rx="2" />
      </svg>
    </div>
    <div className="flex flex-col">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
        SWASTIK
      </h1>
      <p className="text-sm lg:text-base text-medical-primary font-medium leading-tight">
        IMAGING & DIAGNOSTICS
      </p>
    </div>
  </div>
);
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Book Appointment", path: "/book-appointment" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-medical-light border-b border-medical-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-medical-primary">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+91-7303034849</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-medical-primary">
                <MapPin className="w-4 h-4" />
                <span>
                  26/3, Ground Floor, Old Rajinder Nagar, New Delhi-110060
                </span>
              </div>
            </div>
            <div className="text-medical-primary font-medium">
              Dr. Shweta Singh - M.B.B.S MD RADIOLOGY
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex-shrink-0">
            <MedicalCrossLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                  isActivePath(item.path)
                    ? "text-medical-primary bg-medical-light"
                    : "text-gray-700 hover:text-medical-primary hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link to="/book-appointment">
              <Button className="bg-medical-primary hover:bg-medical-secondary text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-medical-primary hover:bg-gray-50 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? "text-medical-primary bg-medical-light"
                    : "text-gray-700 hover:text-medical-primary hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/book-appointment" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-medical-primary hover:bg-medical-secondary text-white py-2 rounded-lg font-medium">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

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
            id="medicalGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#4F9A68", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#00704A", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M20 35 L35 35 L35 20 Q35 15 40 15 L60 15 Q65 15 65 20 L65 35 L80 35 Q85 35 85 40 L85 60 Q85 65 80 65 L65 65 L65 80 Q65 85 60 85 L40 85 Q35 85 35 80 L35 65 L20 65 Q15 65 15 60 L15 40 Q15 35 20 35 Z"
          fill="url(#medicalGradient)"
        />
        <path
          d="M25 40 L40 40 L40 25 Q40 22 42.5 22 L57.5 22 Q60 22 60 25 L60 40 L75 40 Q78 40 78 42.5 L78 57.5 Q78 60 75 60 L60 60 L60 75 Q60 78 57.5 78 L42.5 78 Q40 78 40 75 L40 60 L25 60 Q22 60 22 57.5 L22 42.5 Q22 40 25 40 Z"
          fill="#86C49B"
        />
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

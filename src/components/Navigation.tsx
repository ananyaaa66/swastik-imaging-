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
            id="swastikGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#00704A", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#4F9A68", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#86C49B", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Main interlocking cross design */}
        <path
          d="M8 35 L35 35 L35 8 Q35 5 38 5 L62 5 Q65 5 65 8 L65 35 L92 35 Q95 35 95 38 L95 62 Q95 65 92 65 L65 65 L65 92 Q65 95 62 95 L38 95 Q35 95 35 92 L35 65 L8 65 Q5 65 5 62 L5 38 Q5 35 8 35 Z"
          fill="url(#swastikGradient)"
        />

        {/* Inner cross cutouts creating the interlocking effect */}
        <path
          d="M20 25 L25 25 L25 20 Q25 18 27 18 L40 18 L40 32 L27 32 Q25 32 25 30 L25 25 L20 25 Q18 25 18 23 L18 20 Q18 18 20 18 L20 25 Z"
          fill="white"
        />

        <path
          d="M75 25 L80 25 Q82 25 82 23 L82 20 Q82 18 80 18 L75 18 L75 20 Q75 18 73 18 L60 18 L60 32 L73 32 Q75 32 75 30 L75 25 Z"
          fill="white"
        />

        <path
          d="M20 75 L25 75 L25 80 Q25 82 27 82 L40 82 L40 68 L27 68 Q25 68 25 70 L25 75 L20 75 Q18 75 18 77 L18 80 Q18 82 20 82 L20 75 Z"
          fill="white"
        />

        <path
          d="M75 75 L80 75 Q82 75 82 77 L82 80 Q82 82 80 82 L75 82 L75 80 Q75 82 73 82 L60 82 L60 68 L73 68 Q75 68 75 70 L75 75 Z"
          fill="white"
        />

        {/* Central cross intersection */}
        <rect x="40" y="40" width="20" height="20" fill="white" rx="2" />

        {/* Connecting elements */}
        <rect
          x="32"
          y="45"
          width="16"
          height="10"
          fill="url(#swastikGradient)"
          rx="2"
        />
        <rect
          x="52"
          y="45"
          width="16"
          height="10"
          fill="url(#swastikGradient)"
          rx="2"
        />
        <rect
          x="45"
          y="32"
          width="10"
          height="16"
          fill="url(#swastikGradient)"
          rx="2"
        />
        <rect
          x="45"
          y="52"
          width="10"
          height="16"
          fill="url(#swastikGradient)"
          rx="2"
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

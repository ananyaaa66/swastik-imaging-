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

        {/* Top-left interlocking element */}
        <path
          d="M5 15 Q5 8 12 8 L25 8 L25 21 Q25 28 18 28 L12 28 Q5 28 5 21 L5 15 Z"
          fill="url(#swastikGradient)"
        />
        <path
          d="M25 8 L38 8 Q45 8 45 15 L45 25 L32 25 Q25 25 25 18 L25 8 Z"
          fill="url(#swastikGradient)"
        />

        {/* Top-right interlocking element */}
        <path
          d="M55 8 L68 8 Q75 8 75 15 L75 25 L62 25 Q55 25 55 18 L55 8 Z"
          fill="url(#swastikGradient)"
        />
        <path
          d="M75 8 L88 8 Q95 8 95 15 L95 21 Q95 28 88 28 L82 28 Q75 28 75 21 L75 8 Z"
          fill="url(#swastikGradient)"
        />

        {/* Middle horizontal bar */}
        <path
          d="M8 32 L92 32 Q95 32 95 35 L95 45 L75 45 L75 55 L95 55 L95 65 Q95 68 92 68 L8 68 Q5 68 5 65 L5 55 L25 55 L25 45 L5 45 L5 35 Q5 32 8 32 Z"
          fill="url(#swastikGradient)"
        />

        {/* Bottom-left interlocking element */}
        <path
          d="M5 79 Q5 72 12 72 L18 72 Q25 72 25 79 L25 92 L12 92 Q5 92 5 85 L5 79 Z"
          fill="url(#swastikGradient)"
        />
        <path
          d="M25 75 Q25 68 32 68 L45 68 L45 82 Q45 89 38 89 L32 89 Q25 89 25 82 L25 75 Z"
          fill="url(#swastikGradient)"
        />

        {/* Bottom-right interlocking element */}
        <path
          d="M55 75 Q55 68 62 68 L75 68 L75 82 Q75 89 68 89 L62 89 Q55 89 55 82 L55 75 Z"
          fill="url(#swastikGradient)"
        />
        <path
          d="M75 79 Q75 72 82 72 L88 72 Q95 72 95 79 L95 85 Q95 92 88 92 L75 92 L75 79 Z"
          fill="url(#swastikGradient)"
        />

        {/* Central connecting elements */}
        <rect
          x="32"
          y="25"
          width="13"
          height="43"
          fill="url(#swastikGradient)"
          rx="6"
        />
        <rect
          x="55"
          y="25"
          width="13"
          height="43"
          fill="url(#swastikGradient)"
          rx="6"
        />

        {/* White cutout areas for the interlocking effect */}
        <rect x="25" y="32" width="20" height="13" fill="white" rx="3" />
        <rect x="55" y="32" width="20" height="13" fill="white" rx="3" />
        <rect x="25" y="55" width="20" height="13" fill="white" rx="3" />
        <rect x="55" y="55" width="20" height="13" fill="white" rx="3" />
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

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

        {/* Main interlocking cross shape */}
        <path
          d="M8 8 Q8 5 11 5 L31 5 L31 31 L69 31 L69 5 L89 5 Q92 5 92 8 L92 31 Q92 34 89 34 L69 34 L69 66 L89 66 Q92 66 92 69 L92 89 Q92 92 89 92 L69 92 L69 69 L31 69 L31 92 L11 92 Q8 92 8 89 L8 69 Q8 66 11 66 L31 66 L31 34 L11 34 Q8 34 8 31 L8 8 Z"
          fill="url(#swastikGradient)"
        />

        {/* Top left inner curve */}
        <path
          d="M31 31 L31 16 Q31 11 26 11 L16 11 Q11 11 11 16 L11 26 Q11 31 16 31 L31 31 Z"
          fill="white"
        />

        {/* Top right inner curve */}
        <path
          d="M69 31 L84 31 Q89 31 89 26 L89 16 Q89 11 84 11 L74 11 Q69 11 69 16 L69 31 Z"
          fill="white"
        />

        {/* Bottom left inner curve */}
        <path
          d="M31 69 L16 69 Q11 69 11 74 L11 84 Q11 89 16 89 L26 89 Q31 89 31 84 L31 69 Z"
          fill="white"
        />

        {/* Bottom right inner curve */}
        <path
          d="M69 69 L69 84 Q69 89 74 89 L84 89 Q89 89 89 84 L89 74 Q89 69 84 69 L69 69 Z"
          fill="white"
        />

        {/* Central cross cutout */}
        <rect x="31" y="31" width="38" height="38" fill="white" />

        {/* Inner connecting elements with gradient */}
        <rect
          x="37"
          y="31"
          width="26"
          height="12"
          fill="url(#swastikGradient)"
          rx="6"
        />
        <rect
          x="37"
          y="57"
          width="26"
          height="12"
          fill="url(#swastikGradient)"
          rx="6"
        />
        <rect
          x="31"
          y="37"
          width="12"
          height="26"
          fill="url(#swastikGradient)"
          rx="6"
        />
        <rect
          x="57"
          y="37"
          width="12"
          height="26"
          fill="url(#swastikGradient)"
          rx="6"
        />

        {/* Central square */}
        <rect x="43" y="43" width="14" height="14" fill="white" rx="2" />
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

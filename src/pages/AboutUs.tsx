import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, Shield } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-medical-light via-white to-medical-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-medical-accent text-medical-primary border-medical-secondary mb-4">
              About Our Center
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Swastik Imaging & Diagnostics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Committed to providing accurate, affordable, and reliable
              diagnostic services with state-of-the-art equipment and expert
              medical supervision.
            </p>
          </div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-medical-light rounded-full mb-4">
              <Users className="w-8 h-8 text-medical-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Page Under Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're working on creating a comprehensive About Us page that will
              showcase our values, team, facilities, and commitment to
              healthcare excellence.
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-gray-200 text-center">
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Expert Leadership
                </h3>
                <p className="text-sm text-gray-600">
                  Led by Dr. Shweta Singh, Gold Medalist
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Years of Experience
                </h3>
                <p className="text-sm text-gray-600">
                  Serving the community with dedication
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 text-center">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quality Assurance
                </h3>
                <p className="text-sm text-gray-600">
                  ISO certified diagnostic center
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-medical-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Patient Care
                </h3>
                <p className="text-sm text-gray-600">
                  500+ satisfied patients and counting
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, TrendingUp, FileText, Shield, Briefcase, Calculator, Globe } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Services() {
  const [, setLocation] = useLocation();
  const services = [
    {
      icon: Calculator,
      title: "Business Valuation",
      description: "Professional business valuation services to determine the fair market value of your business.",
      features: ["Financial analysis", "Market comparison", "Asset evaluation", "Future projections"],
      price: "Starting at $500"
    },
    {
      icon: Briefcase,
      title: "Franchise Consulting",
      description: "Expert guidance on franchise opportunities, due diligence, and franchise development.",
      features: ["Franchise selection", "Due diligence", "Legal compliance", "Training support"],
      price: "Starting at $1,500"
    },
    {
      icon: FileText,
      title: "Legal Services",
      description: "Comprehensive legal support for business transactions, contracts, and compliance.",
      features: ["Contract review", "Transaction support", "Compliance guidance", "Documentation"],
      price: "Starting at $300/hour"
    },
    {
      icon: TrendingUp,
      title: "Marketing Support",
      description: "Strategic marketing services to promote your business listing and increase visibility.",
      features: ["Marketing strategy", "Digital promotion", "Social media", "Lead generation"],
      price: "Starting at $800/month"
    },
    {
      icon: Users,
      title: "Buyer Matching",
      description: "Connect with qualified buyers through our extensive network and screening process.",
      features: ["Buyer screening", "Confidential matching", "Negotiation support", "Deal facilitation"],
      price: "3% of transaction value"
    },
    {
      icon: Shield,
      title: "Transaction Security",
      description: "Secure transaction management with escrow services and legal protection.",
      features: ["Escrow management", "Document security", "Payment protection", "Legal oversight"],
      price: "1% of transaction value"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support services to help you buy, sell, or franchise your business successfully
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-[hsl(var(--b2b-blue))] rounded-full p-3 mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">What's Included:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-[hsl(var(--b2b-blue))] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-lg font-bold text-[hsl(var(--b2b-blue))] mb-3">{service.price}</p>
                    <Button 
                      className="w-full b2b-button-primary"
                      onClick={() => setLocation('/contact')}
                    >
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Our Services */}
        <div className="bg-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Choose Our Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[hsl(var(--b2b-orange))] rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Global Network</h3>
              <p className="text-sm text-gray-600">Access to international buyers and sellers</p>
            </div>
            <div className="text-center">
              <div className="bg-[hsl(var(--b2b-orange))] rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600">Experienced professionals in business transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-[hsl(var(--b2b-orange))] rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure Process</h3>
              <p className="text-sm text-gray-600">Protected transactions with legal oversight</p>
            </div>
            <div className="text-center">
              <div className="bg-[hsl(var(--b2b-orange))] rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">Track record of successful business sales</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-[hsl(var(--b2b-blue))] to-[hsl(var(--b2b-blue-dark))] rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">Contact our team to discuss your specific needs and get a customized service package.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center">
              <span>btwobmarket@gmail.com</span>
            </div>
          </div>
          <Button className="mt-6 bg-[hsl(var(--b2b-orange))] hover:bg-[hsl(var(--b2b-orange-dark))] text-white px-8 py-3">
            Contact Us Today
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
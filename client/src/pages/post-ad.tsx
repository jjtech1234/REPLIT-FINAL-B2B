import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PostAd() {
  const { toast } = useToast();
  
  const [adForm, setAdForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    targetUrl: "",
    contactEmail: "",
    contactPhone: "",
    company: "",
    budget: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/advertisements", data);
    },
    onSuccess: () => {
      toast({
        title: "Advertisement Submitted Successfully",
        description: "Your ad has been submitted for review and will be published within 24 hours.",
      });
      setAdForm({
        title: "",
        description: "",
        imageUrl: "",
        targetUrl: "",
        contactEmail: "",
        contactPhone: "",
        company: "",
        budget: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit advertisement. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adForm.title || !adForm.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const formData = {
      title: adForm.title,
      imageUrl: adForm.imageUrl || "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      targetUrl: adForm.targetUrl || "#",
      isActive: true,
    };
    
    submitMutation.mutate(formData);
  };

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

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Your Advertisement</h1>
            <p className="text-gray-600">Promote your business to our global audience of entrepreneurs and business buyers</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-[hsl(var(--b2b-blue))]" />
                Advertisement Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Advertisement Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    value={adForm.title}
                    onChange={(e) => setAdForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter compelling advertisement title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={adForm.description}
                    onChange={(e) => setAdForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your product, service, or business opportunity..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="imageUrl">Advertisement Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={adForm.imageUrl}
                    onChange={(e) => setAdForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/ad-image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended size: 400x250 pixels</p>
                </div>

                <div>
                  <Label htmlFor="targetUrl">Target URL</Label>
                  <Input
                    id="targetUrl"
                    type="url"
                    value={adForm.targetUrl}
                    onChange={(e) => setAdForm(prev => ({ ...prev, targetUrl: e.target.value }))}
                    placeholder="https://your-website.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Where users will be directed when they click your ad</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        type="text"
                        value={adForm.company}
                        onChange={(e) => setAdForm(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={adForm.contactEmail}
                        onChange={(e) => setAdForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="contact@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={adForm.contactPhone}
                        onChange={(e) => setAdForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="budget">Monthly Budget ($)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={adForm.budget}
                        onChange={(e) => setAdForm(prev => ({ ...prev, budget: e.target.value }))}
                        placeholder="500"
                        min="100"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Advertisement Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Basic</h4>
                      <p className="text-2xl font-bold text-[hsl(var(--b2b-blue))] mb-2">$100/month</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Homepage display</li>
                        <li>• 1,000 impressions</li>
                        <li>• Basic analytics</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded border border-[hsl(var(--b2b-blue))]">
                      <h4 className="font-semibold text-gray-800">Premium</h4>
                      <p className="text-2xl font-bold text-[hsl(var(--b2b-blue))] mb-2">$250/month</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Featured placement</li>
                        <li>• 5,000 impressions</li>
                        <li>• Advanced analytics</li>
                        <li>• Email support</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800">Enterprise</h4>
                      <p className="text-2xl font-bold text-[hsl(var(--b2b-blue))] mb-2">$500/month</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Premium placement</li>
                        <li>• 15,000 impressions</li>
                        <li>• Full analytics suite</li>
                        <li>• Priority support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    className="b2b-button-primary px-12 py-3 text-lg"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Advertisement"}
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>By submitting this form, you agree to our advertising terms and conditions.</p>
                  <p>Your advertisement will be reviewed and published within 24 hours.</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
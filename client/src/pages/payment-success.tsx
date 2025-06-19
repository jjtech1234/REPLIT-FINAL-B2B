import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Receipt } from "lucide-react";
import { Link } from "wouter";

export default function PaymentSuccess() {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    description: '',
    paymentId: ''
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntent = urlParams.get('payment_intent');
    const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');
    
    // Extract payment details from URL or localStorage
    const amount = localStorage.getItem('payment_amount') || 'N/A';
    const description = localStorage.getItem('payment_description') || 'Service Payment';
    
    setPaymentDetails({
      amount,
      description,
      paymentId: paymentIntent || 'N/A'
    });

    // Clear stored payment details
    localStorage.removeItem('payment_amount');
    localStorage.removeItem('payment_description');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Service</span>
              <span className="font-medium">{paymentDetails.description}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-lg">${paymentDetails.amount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-mono text-sm text-gray-500">
                {paymentDetails.paymentId.substring(0, 20)}...
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>What's next?</strong> You will receive a confirmation email shortly. 
              Our team will contact you within 24 hours to discuss your service details.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button className="w-full" size="lg">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </Link>
            <Button variant="outline" className="w-full" size="lg">
              <Receipt className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
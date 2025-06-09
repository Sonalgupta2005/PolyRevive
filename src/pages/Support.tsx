
import React from 'react';
import AppNavbar from '@/components/AppNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MessageSquare, HelpCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Support = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check authentication status
  const isLoggedIn = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Handle message sending for logged in users
    console.log('Sending message...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <AppNavbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How Can We Help You?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get support for your recycling journey. We're here to help you make a positive impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-green-600" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSendMessage}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your question or concern..."
                    className="min-h-32"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isLoggedIn ? 'Send Message' : 'Sign In to Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Support</h4>
                    <p className="text-gray-600">support@polyrevive.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone Support</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-green-600" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">How do I schedule a pickup?</h4>
                  <p className="text-gray-600 text-sm">
                    Once you have at least 5kg of plastic waste, click the "Book Pickup" button and select your preferred time slot.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">How are rewards calculated?</h4>
                  <p className="text-gray-600 text-sm">
                    Rewards are based on the weight of plastic recycled and referrals. You can track your progress in the dashboard.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">What types of plastic do you accept?</h4>
                  <p className="text-gray-600 text-sm">
                    We accept most plastic types. Our AI sorting system will help categorize your waste during pickup.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recycle, MapPin, Award, Users, Smartphone, Calendar, TrendingUp, CheckCircle, ArrowRight, Star, Leaf, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppNavbar from '@/components/AppNavbar';

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Slot Booking',
      description: 'Schedule waste pickups when you reach 5kg+ of plastic waste'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track nearby partners and collection status with interactive maps'
    },
    {
      icon: Award,
      title: 'Reward System',
      description: 'Earn points and rewards based on recycling weight and referrals'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Connect with eco-warriors and compete on sustainability leaderboards'
    },
    {
      icon: Smartphone,
      title: 'AI-Powered Sorting',
      description: 'Image recognition technology for automatic plastic categorization'
    },
    {
      icon: TrendingUp,
      title: 'Impact Analytics',
      description: 'Track your environmental impact with detailed recycling reports'
    }
  ];

  const benefits = [
    { icon: Leaf, text: 'Reduce plastic waste in landfills' },
    { icon: Globe, text: 'Contribute to a cleaner planet' },
    { icon: Heart, text: 'Build sustainable communities' },
    { icon: Award, text: 'Earn rewards for good deeds' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Environmental Enthusiast',
      content: 'PolyRevive made recycling so rewarding! I\'ve helped recycle 45kg of plastic and made a real difference.',
      rating: 5,
      avatar: '/placeholder.svg'
    },
    {
      name: 'Mike Johnson',
      role: 'Sustainability Advocate',
      content: 'The community features keep me motivated. Great to see my impact alongside other eco-warriors!',
      rating: 5,
      avatar: '/placeholder.svg'
    },
    {
      name: 'Emma Davis',
      role: 'Green Living Expert',
      content: 'AI sorting is incredible! It correctly identified all my plastic types and maximized my impact.',
      rating: 5,
      avatar: '/placeholder.svg'
    }
  ];

  const handleLearnMore = () => {
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <AppNavbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2">
                  🌱 Circular Economy Platform
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transform 
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Plastic Waste </span>
                  Into a Better Future
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join the recycling revolution with PolyRevive. Connect with collectors, 
                  make an impact, and create a sustainable future through our AI-powered platform.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-green-700">
                    <benefit.icon className="h-5 w-5" />
                    <span className="font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="flex-1">
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 font-semibold">
                    Start Recycling Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="h-14 text-lg border-gray-300 hover:bg-gray-50 px-8 font-semibold"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20"></div>
                <div className="relative z-10 text-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Recycle className="h-20 w-20 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">2,847+ Members</h3>
                  <p className="text-gray-600 text-lg">Already making an impact</p>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-8 right-8 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <span className="font-semibold">+50 Points</span>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-green-500" />
                    <span className="font-semibold">Partner Near</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need for 
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Sustainable Living</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform makes recycling rewarding, convenient, and impactful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How PolyRevive Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your recycling journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Sign Up', description: 'Create your account with email, phone, or social login', icon: Users },
              { step: '2', title: 'Collect Plastic', description: 'Gather at least 5kg of plastic waste using our AI sorting guide', icon: Recycle },
              { step: '3', title: 'Book Pickup', description: 'Schedule collection through our partner network', icon: Calendar },
              { step: '4', title: 'Make Impact', description: 'Track your environmental contribution and earn recognition', icon: Award }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-green-600 font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied eco-warriors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make a Difference? 🌍
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Join PolyRevive today and transform your plastic waste into meaningful environmental impact 
              while creating a sustainable future for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="h-14 px-8 text-lg bg-white text-green-600 hover:bg-gray-100 font-semibold">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="h-14 px-8 text-lg border-white text-white hover:bg-white/10 font-semibold"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Recycle className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">PolyRevive</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming plastic waste into a sustainable future through innovative recycling solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PolyRevive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

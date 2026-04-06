import { Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  Shield, 
  Brain, 
  Calendar, 
  BarChart3, 
  Heart, 
  Lock, 
  Zap,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Hospital,
  MapPin,
  Star,
  CheckCircle2,
  Search,
  Building2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export default function LandingPage() {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-[#1E90FF]" />,
      title: "AI Health Monitoring",
      description: "Advanced AI algorithms continuously monitor your health metrics and provide personalized insights."
    },
    {
      icon: <Shield className="w-12 h-12 text-[#00C851]" />,
      title: "Secure Health Records",
      description: "Military-grade encryption ensures your medical records are safe, private, and accessible only to you."
    },
    {
      icon: <Hospital className="w-12 h-12 text-[#FF6B6B]" />,
      title: "Multi-Hospital Access",
      description: "Connect with multiple hospitals across India. One passport for all your healthcare needs."
    },
    {
      icon: <Calendar className="w-12 h-12 text-[#1E90FF]" />,
      title: "Smart Appointment Booking",
      description: "Never miss an appointment with smart reminders and easy scheduling with top healthcare professionals."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Ramesh Sharma",
      role: "Cardiologist, Mumbai",
      content: "Med Locker has transformed how I manage patient records. The AI insights are incredibly accurate!",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
    },
    {
      name: "Priya Gupta",
      role: "Patient, Delhi",
      content: "I love how easy it is to track my health metrics and appointments. The medicine reminders are a lifesaver!",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"
    },
    {
      name: "Dr. Ankit Verma",
      role: "General Physician, Bangalore",
      content: "The platform's security and ease of use make it perfect for modern healthcare. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Heart className="w-8 h-8 text-[#1E90FF] fill-[#1E90FF]" />
              <span className="text-2xl font-bold text-gray-900">Med Locker</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/auth">
                <Button className="bg-[#1E90FF] hover:bg-[#1873CC] text-white">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Health, <br />
                <span className="text-[#1E90FF]">Secured & Smart</span>
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                One Digital Health Passport. Connected Hospitals. Intelligent Care.
              </p>
              <p className="text-lg text-gray-500 mb-8">
                Access your health records across multiple hospitals. Book appointments with top doctors. Get AI-powered health insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-[#1E90FF] hover:bg-[#1873CC] text-white w-full sm:w-auto">
                    Get Started
                    <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF]/10 w-full sm:w-auto">
                  <Hospital className="mr-2 w-5 h-5" />
                  Explore Hospitals
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#1E90FF]/20 to-[#00C851]/20 rounded-3xl p-8 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop" 
                  alt="Digital Health Dashboard"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-[#00C851]" />
                  <span className="font-semibold">Fully Secure</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your health in one place
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F5F5F5]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1E90FF] to-[#00C851]">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who trust Med Locker for their health management
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-white text-[#1E90FF] hover:bg-gray-100">
                Get Started Today
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-[#1E90FF] fill-[#1E90FF]" />
                <span className="text-xl font-bold">Med Locker</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in digital health management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#1E90FF] transition-colors">HIPAA</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2026 Med Locker. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Shield, 
  Smartphone, 
  Trophy,
  MessageCircle,
  BarChart3,
  PiggyBank,
  Star
} from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized financial advice from your AI buddy Finn',
      color: 'from-purple-400 to-pink-400',
    },
    {
      icon: TrendingUp,
      title: 'Smart Tracking',
      description: 'Automatically categorize expenses and track your spending patterns',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Target,
      title: 'Goal Achievement',
      description: 'Set and achieve savings goals with visual progress tracking',
      color: 'from-green-400 to-emerald-400',
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn badges and compete in challenges while learning about money',
      color: 'from-yellow-400 to-orange-400',
    },
  ];

  const testimonials = [
    {
      name: 'Alex, 16',
      text: "FinTeen helped me save $500 for my first car! The AI chatbot is like having a financial advisor in my pocket.",
      rating: 5,
    },
    {
      name: 'Maya, 17',
      text: "I love the challenges and badges. Learning about money has never been this fun and engaging!",
      rating: 5,
    },
    {
      name: 'Jordan, 15',
      text: "The expense tracking is so easy. I finally understand where my allowance goes every month.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">FT</span>
                </div>
                <div>
                  <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">
                    Fin<span className="text-primary-500">Teen</span>
                  </h1>
                  <p className="text-lg text-gray-600">AI-Powered Finance Manager</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Master Your Money with AI-Powered Guidance
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join thousands of teens learning smart money management through conversational AI, 
                gamified challenges, and personalized insights. Build financial confidence that lasts a lifetime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Button onClick={onGetStarted} size="lg" className="px-8">
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <MessageCircle size={20} className="mr-2" />
                Chat with Demo AI
              </Button>
            </motion.div>

            {/* Demo Screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-1 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-4 rounded-lg">
                        <BarChart3 size={24} className="mb-2" />
                        <p className="font-semibold">Total Balance</p>
                        <p className="text-2xl font-bold">$1,247.50</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-4 rounded-lg">
                        <TrendingUp size={24} className="mb-2" />
                        <p className="font-semibold">This Month</p>
                        <p className="text-2xl font-bold">+$150.00</p>
                      </div>
                    </div>
                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Brain className="text-primary-500 mr-2" size={20} />
                        <span className="font-medium text-gray-700">AI Finance Buddy</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-primary-500 text-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">Great job staying under budget this month! 🎉</p>
                        </div>
                        <div className="bg-white border p-3 rounded-lg max-w-xs ml-auto">
                          <p className="text-sm">How can I save more for my car fund?</p>
                        </div>
                        <div className="bg-primary-500 text-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">I have 3 personalized tips for you! Want to hear them? 💡</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Master Money Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for teens, making financial education 
              engaging, interactive, and incredibly effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-6 h-full text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Active Teen Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-lg opacity-90">Money Tracked</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Goals Achieved</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">User Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Teens Are Saying</h2>
            <p className="text-xl text-gray-600">Real stories from real users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <PiggyBank className="mx-auto mb-6" size={64} />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join FinTeen today and start building the money management skills 
              that will serve you for life. Your future self will thank you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                variant="secondary" 
                className="bg-white text-primary-600 hover:bg-gray-100 px-8"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary-600 px-8"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
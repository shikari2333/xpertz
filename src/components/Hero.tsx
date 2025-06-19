import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const floatingAnimation = {
    y: [-20, 20, -20],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:bg-cyan-500/20 rounded-full text-cyan-700 dark:text-cyan-400 text-sm font-medium border border-cyan-300 dark:border-cyan-500/30 shadow-lg">
                🚀 Your Business Success Partner
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empowering Your{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-500 dark:to-blue-600"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Business
              </motion.span>
              <br />
              Step by Step
            </motion.h1>

            <motion.p
              className="text-xl text-slate-700 dark:text-gray-300 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Professional PAN Card, GST Registration, and Accounting services in Kattappana. 
              Fast, reliable, and tailored for your business needs.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Today
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2" size={20} />
                </motion.div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-600 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-white/80 dark:bg-transparent shadow-lg hover:shadow-xl"
              >
                View Services
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center bg-white/70 dark:bg-slate-800/50 p-4 rounded-xl shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <motion.div
                  className="flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="text-yellow-500 mr-1" size={20} />
                  <span className="text-slate-900 dark:text-white font-bold">4.8</span>
                </motion.div>
                <p className="text-slate-700 dark:text-gray-400 text-sm">Client Rating</p>
              </div>
              <div className="text-center bg-white/70 dark:bg-slate-800/50 p-4 rounded-xl shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <motion.div
                  className="flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Shield className="text-green-500 mr-1" size={20} />
                  <span className="text-slate-900 dark:text-white font-bold">100%</span>
                </motion.div>
                <p className="text-slate-700 dark:text-gray-400 text-sm">Secure</p>
              </div>
              <div className="text-center bg-white/70 dark:bg-slate-800/50 p-4 rounded-xl shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <motion.div
                  className="flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Clock className="text-blue-500 mr-1" size={20} />
                  <span className="text-slate-900 dark:text-white font-bold">24h</span>
                </motion.div>
                <p className="text-slate-700 dark:text-gray-400 text-sm">Fast Service</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Illustration with Image */}
          <div className="relative">
            <motion.div
              className="relative z-10"
              animate={floatingAnimation}
            >
              <div className="bg-white/90 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                {/* Professional Business Consultation Image */}
                <div className="mb-6 relative overflow-hidden rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a7?w=500&h=300&fit=crop&crop=center" 
                    alt="Professional Business Consultation" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">Professional Service</h3>
                    <p className="text-sm opacity-90">Expert Business Solutions</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-500/20 dark:to-blue-500/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-500/30 shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)" }}
                  >
                    <h3 className="text-cyan-700 dark:text-cyan-400 font-semibold mb-2">PAN Card</h3>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">Quick & Easy Registration</p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/20 dark:to-emerald-500/20 p-4 rounded-xl border border-green-200 dark:border-green-500/30 shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}
                  >
                    <h3 className="text-green-700 dark:text-green-400 font-semibold mb-2">GST</h3>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">Complete Registration</p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20 p-4 rounded-xl border border-purple-200 dark:border-purple-500/30 shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)" }}
                  >
                    <h3 className="text-purple-700 dark:text-purple-400 font-semibold mb-2">Accounting</h3>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">Professional Services</p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-500/20 dark:to-red-500/20 p-4 rounded-xl border border-orange-200 dark:border-orange-500/30 shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)" }}
                  >
                    <h3 className="text-orange-700 dark:text-orange-400 font-semibold mb-2">Reports</h3>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">Bank Loan Projects</p>
                  </motion.div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold shadow-lg"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(6, 182, 212, 0.3)',
                        '0 0 40px rgba(6, 182, 212, 0.6)',
                        '0 0 20px rgba(6, 182, 212, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Your Success Partner
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-full shadow-lg"
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full shadow-lg"
              animate={{
                y: [10, -10, 10],
                x: [5, -5, 5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

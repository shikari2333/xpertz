
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
      ease: "easeInOut"
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full text-cyan-400 text-sm font-medium border border-cyan-500/30">
                🚀 Your Business Success Partner
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empowering Your{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
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
              className="text-xl text-gray-300 mb-8 max-w-2xl"
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
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
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
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="text-yellow-400 mr-1" size={20} />
                  <span className="text-white font-bold">4.8</span>
                </motion.div>
                <p className="text-gray-400 text-sm">Client Rating</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Shield className="text-green-400 mr-1" size={20} />
                  <span className="text-white font-bold">100%</span>
                </motion.div>
                <p className="text-gray-400 text-sm">Secure</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Clock className="text-blue-400 mr-1" size={20} />
                  <span className="text-white font-bold">24h</span>
                </motion.div>
                <p className="text-gray-400 text-sm">Fast Service</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Illustration */}
          <div className="relative">
            <motion.div
              className="relative z-10"
              animate={floatingAnimation}
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-700">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-xl border border-cyan-500/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-cyan-400 font-semibold mb-2">PAN Card</h3>
                    <p className="text-gray-300 text-sm">Quick & Easy Registration</p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-green-400 font-semibold mb-2">GST</h3>
                    <p className="text-gray-300 text-sm">Complete Registration</p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-500/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-purple-400 font-semibold mb-2">Accounting</h3>
                    <p className="text-gray-300 text-sm">Professional Services</p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-orange-500/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-orange-400 font-semibold mb-2">Reports</h3>
                    <p className="text-gray-300 text-sm">Bank Loan Projects</p>
                  </motion.div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold"
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
              className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-full"
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
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full"
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

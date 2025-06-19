
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Users, Award, Clock, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast Service',
      description: 'Quick turnaround times without compromising quality',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: '100% Secure & Confidential',
      description: 'Your data and documents are completely secure with us',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced professionals with deep domain knowledge',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: '500+ satisfied clients and growing every day',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance whenever you need us',
      color: 'from-red-400 to-orange-500',
    },
    {
      icon: CheckCircle,
      title: 'Guaranteed Results',
      description: 'We ensure successful completion of all services',
      color: 'from-teal-400 to-blue-500',
    },
  ];

  return (
    <section id="why-choose" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Xpertz?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover what makes us the preferred choice for businesses in Kattappana and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-slate-700 group-hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm">
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  <benefit.icon className="text-white" size={32} />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {benefit.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-500/20"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-8 rounded-3xl border border-slate-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-gray-300 mb-6">
              Join hundreds of satisfied clients who trust Xpertz for their business needs
            </p>
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

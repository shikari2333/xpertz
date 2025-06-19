
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { FileText, Calculator, CreditCard, TrendingUp } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const services = [
    {
      icon: CreditCard,
      title: 'PAN Card Services',
      description: 'Fast and hassle-free PAN card registration and corrections',
      features: ['New PAN Application', 'PAN Corrections', 'Duplicate PAN', 'PAN Status Check'],
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
      darkBgColor: 'from-cyan-500/10 to-blue-500/10',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop&crop=center',
      delay: 0.1
    },
    {
      icon: Calculator,
      title: 'GST Registration',
      description: 'Complete GST registration and compliance services',
      features: ['GST Registration', 'GST Filing', 'GST Returns', 'Compliance Support'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      darkBgColor: 'from-green-500/10 to-emerald-500/10',
      image: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=200&fit=crop&crop=center',
      delay: 0.2
    },
    {
      icon: FileText,
      title: 'Accounting Services',
      description: 'Professional accounting and tax filing services',
      features: ['Income Tax Filing', 'TDS Returns', 'Book Keeping', 'Financial Planning'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      darkBgColor: 'from-purple-500/10 to-pink-500/10',
      image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=200&fit=crop&crop=center',
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: 'Project Reports',
      description: 'Detailed project reports for bank loan applications',
      features: ['Business Plans', 'Financial Projections', 'Loan Documentation', 'Bank Liaison'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      darkBgColor: 'from-orange-500/10 to-red-500/10',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&crop=center',
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:bg-transparent">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">
              Services
            </span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive business solutions tailored for your success in Kattappana and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: service.delay }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Card className="h-full bg-white/90 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-2xl overflow-hidden">
                {/* Service Image */}
                <div className="relative overflow-hidden h-40">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.darkBgColor} dark:${service.darkBgColor} group-hover:opacity-80 transition-opacity duration-300`}></div>
                  <motion.div
                    className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}
                    whileHover={{
                      boxShadow: `0 0 30px rgba(6, 182, 212, 0.4)`,
                      scale: 1.1
                    }}
                  >
                    <service.icon className="text-white" size={24} />
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-slate-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="text-sm text-slate-600 dark:text-gray-400 flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: service.delay + (featureIndex * 0.1) }}
                      >
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <button className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-800 hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-500/20 dark:hover:to-blue-500/20 text-slate-800 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 py-3 rounded-lg font-semibold transition-all duration-300 border border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500/50 shadow-md hover:shadow-lg">
                      Learn More
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

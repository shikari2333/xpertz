
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients', color: 'text-cyan-400' },
    { icon: Award, number: '5+', label: 'Years Experience', color: 'text-green-400' },
    { icon: Clock, number: '24/7', label: 'Support', color: 'text-purple-400' },
    { icon: MapPin, number: '1', label: 'Location', color: 'text-orange-400' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Xpertz
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Located in the heart of Kattappana, Xpertz Business Solutions has been empowering 
              local businesses and individuals with professional financial and regulatory services 
              since our establishment.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our team of experienced professionals specializes in PAN card services, GST registration, 
              comprehensive accounting solutions, and detailed project reports for bank loans. We pride 
              ourselves on delivering fast, reliable, and personalized services that help our clients 
              achieve their business goals.
            </p>

            <motion.div
              className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-slate-700 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Our Location</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    1st Floor, Mattappallil Building<br />
                    New Bus Stand, Kattappana<br />
                    Idukki - 685508, Kerala, India
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-slate-700 text-center group hover:border-cyan-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300`}
                  whileHover={{
                    boxShadow: `0 0 20px rgba(6, 182, 212, 0.3)`,
                  }}
                >
                  <stat.icon className={`${stat.color} group-hover:text-cyan-400 transition-colors duration-300`} size={28} />
                </motion.div>
                <motion.div
                  className={`text-3xl font-bold ${stat.color} mb-2`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-8 rounded-3xl border border-slate-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              To simplify business compliance and financial management for entrepreneurs and 
              established businesses in Kattappana and surrounding areas, providing expert 
              guidance and efficient solutions that drive growth and success.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients', color: 'text-cyan-600 dark:text-cyan-400' },
    { icon: Award, number: '5+', label: 'Years Experience', color: 'text-green-600 dark:text-green-400' },
    { icon: Clock, number: '24/7', label: 'Support', color: 'text-purple-600 dark:text-purple-400' },
    { icon: MapPin, number: '1', label: 'Location', color: 'text-orange-600 dark:text-orange-400' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:bg-transparent">
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">
                Xpertz
              </span>
            </h2>
            <p className="text-xl text-slate-700 dark:text-gray-300 mb-8 leading-relaxed">
              Located in the heart of Kattappana, Xpertz Business Solutions has been empowering 
              local businesses and individuals with professional financial and regulatory services 
              since our establishment.
            </p>
            <p className="text-slate-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our team of experienced professionals specializes in PAN card services, GST registration, 
              comprehensive accounting solutions, and detailed project reports for bank loans. We pride 
              ourselves on delivering fast, reliable, and personalized services that help our clients 
              achieve their business goals.
            </p>

            {/* Professional Office Environment Image */}
            <motion.div
              className="mb-8 relative overflow-hidden rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a7?w=600&h=300&fit=crop&crop=center" 
                alt="Professional Office Environment" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Modern Workspace</h3>
                <p className="text-sm opacity-90">Where Innovation Meets Expertise</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gradient-to-r dark:from-slate-800/50 dark:to-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8 shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Our Location</h3>
                  <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed">
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
                className="bg-white/90 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center group hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + (index * 0.1) }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center group-hover:from-cyan-100 group-hover:to-blue-100 dark:group-hover:from-cyan-500/20 dark:group-hover:to-blue-500/20 transition-all duration-300 shadow-md`}
                  whileHover={{
                    boxShadow: `0 0 20px rgba(6, 182, 212, 0.3)`,
                  }}
                >
                  <stat.icon className={`${stat.color} group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300`} size={28} />
                </motion.div>
                <motion.div
                  className={`text-3xl font-bold ${stat.color} mb-2`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-slate-700 dark:text-gray-300 font-medium">{stat.label}</p>
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
          <div className="bg-white/90 dark:bg-gradient-to-r dark:from-slate-800/50 dark:to-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto shadow-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed">
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

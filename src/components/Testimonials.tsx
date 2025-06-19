
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Local Restaurant Owner',
      content: 'Xpertz made GST registration so simple for my restaurant. Their team guided me through every step, and I got my registration within 3 days!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    },
    {
      name: 'Priya Menon',
      business: 'Textile Shop Owner',
      content: 'Excellent service for PAN card processing. Very professional team and quick turnaround. Highly recommend for anyone in Kattappana.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=80&h=80&fit=crop&crop=face',
    },
    {
      name: 'Arun Nair',
      business: 'IT Consultant',
      content: 'Their accounting services are top-notch. They handle all my tax filings and keep me updated on compliance requirements. Great value for money!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    },
    {
      name: 'Sunitha Devi',
      business: 'Grocery Store',
      content: 'I needed a project report for my business loan. Xpertz delivered a comprehensive report that helped me secure the loan successfully.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    },
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-transparent">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
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
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients across Kattappana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-full bg-white/90 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 group-hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <Quote className="text-cyan-500 dark:text-cyan-400 opacity-50" size={40} />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.2) + (i * 0.1) }}
                      >
                        <Star className="text-yellow-500 fill-current" size={20} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.p
                  className="text-slate-700 dark:text-gray-300 leading-relaxed mb-6 text-lg"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + (index * 0.2) }}
                >
                  "{testimonial.content}"
                </motion.p>

                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-cyan-600 dark:text-cyan-400 text-sm">{testimonial.business}</p>
                  </div>
                </div>

                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center space-x-6 bg-white/90 dark:bg-gradient-to-r dark:from-slate-800/50 dark:to-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm">
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                4.8/5
              </motion.div>
              <p className="text-slate-600 dark:text-gray-300 text-sm">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                500+
              </motion.div>
              <p className="text-slate-600 dark:text-gray-300 text-sm">Happy Clients</p>
            </div>
            <div className="w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                100%
              </motion.div>
              <p className="text-slate-600 dark:text-gray-300 text-sm">Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

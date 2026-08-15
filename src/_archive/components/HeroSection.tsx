import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-12 py-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center lg:text-left"
      >
        <motion.h1
          className="font-body text-4xl md:text-5xl lg:text-6xl font-bold text-[#343030] dark:text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Crafting Digital{' '}
          <span className="bg-gradient-to-r from-[#7d5fff] to-[#cc336f] bg-clip-text text-transparent">
            Experiences
          </span>
        </motion.h1>
        
        <motion.p
          className="font-['Satoshi'] text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          I'm a UX/UI designer passionate about creating intuitive, accessible, and beautiful 
          digital products that solve real problems and delight users. With 5+ years of experience 
          in user research, interface design, and design systems.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            className="font-['Satoshi'] bg-gradient-to-r from-[#7d5fff] to-[#cc336f] hover:from-[#6b47ff] hover:to-[#b8295f] text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[44px] min-w-[44px]"
            aria-label="View my portfolio work"
          >
            View My Work
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            className="font-['Satoshi'] border-2 border-[#7d5fff] text-[#7d5fff] hover:bg-[#7d5fff] hover:text-white px-8 py-3 rounded-xl transition-all duration-300 group backdrop-blur-sm min-h-[44px] min-w-[44px]"
            aria-label="Download my resume"
          >
            <Download className="mr-2 w-4 h-4 group-hover:bounce" />
            Download CV
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 max-w-md"
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-[#7d5fff]/20 to-[#cc336f]/20 rounded-3xl blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              alt="UX/UI Designer - Professional headshot"
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
            
            <div className="text-center">
              <h3 className="font-['Poppins'] text-xl font-semibold text-[#343030] dark:text-white mb-2">
                Alex Johnson
              </h3>
              <p className="font-['Satoshi'] text-gray-600 dark:text-gray-300 mb-4">
                Senior UX/UI Designer
              </p>
              
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="font-['Poppins'] text-2xl font-bold text-[#7d5fff]">50+</div>
                  <div className="font-['Satoshi'] text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="font-['Poppins'] text-2xl font-bold text-[#3dd66d]">5+</div>
                  <div className="font-['Satoshi'] text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="font-['Poppins'] text-2xl font-bold text-[#cc336f]">20+</div>
                  <div className="font-['Satoshi'] text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
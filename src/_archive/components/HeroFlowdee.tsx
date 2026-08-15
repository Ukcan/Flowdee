import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

interface HeroFlowdeeProps {
  imageUrl?: string;
}

export function HeroFlowdee({ 
  imageUrl
}: HeroFlowdeeProps = {}) {
  const { t } = useTranslation();
  
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[100vh] flex items-center py-16 md:py-24 overflow-hidden" aria-label="Hero section">
      
      {/* Background Image/Video Layer */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Always visible */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={imageUrl || heroBackgroundImage}
            alt="Modern workspace setup"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Video Container - Optional overlay if video is added later */}
        {imageUrl && imageUrl.endsWith('.mp4') && (
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster=""
            >
              <source src={imageUrl} type="video/mp4" />
            </video>
          </div>
        )}
        
        {/* Multi-layer Overlay - Ensures optimal text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/90" />
        
        {/* Subtle vignette effect for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 w-full">
        <div className="max-w-[800px]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-[#007a8f]">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[2rem] md:text-[3rem] leading-[1.2] font-bold text-foreground"
            >
              {t.hero.title}
            </motion.h1>

            {/* Body Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg leading-[1.6] text-muted-foreground max-w-[560px]"
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="group relative overflow-hidden min-h-[48px] px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-[1.05] active:scale-[0.98] focus:ring-2 focus:ring-primary before:absolute before:inset-0 before:-z-10 before:bg-primary/20 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300 before:ease-out after:absolute after:top-[-50%] after:left-[-50%] after:w-[200%] after:h-[200%] after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-30% after:to-[rgba(0,255,255,0.3)] after:rotate-[-45deg] after:opacity-0 hover:after:opacity-100 hover:after:translate-y-[100%] after:transition-all after:duration-500 after:ease-out hover:shadow-[0_0_30px_rgba(0,159,183,0.6)]"
              >
                {t.hero.ctaPrimary}
              </Button>
              <Button
                onClick={() => scrollToSection('case-studies')}
                variant="ghost"
                size="lg"
                className="min-h-[48px] px-6 text-secondary hover:text-secondary/80 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
              >
                {t.hero.ctaSecondary}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
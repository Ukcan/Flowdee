import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Zap, Target } from 'lucide-react';

const highlights = [
  {
    icon: Award,
    title: 'Expertise UX/UI',
    description: 'Plus de 10 ans d\'expérience dans la conception d\'interfaces centrées utilisateur'
  },
  {
    icon: Zap,
    title: 'IA & Automation',
    description: 'Spécialiste des workflows augmentés par l\'intelligence artificielle'
  },
  {
    icon: Users,
    title: 'Approche collaborative',
    description: 'Design Partner pour startups et scale-ups ambitieuses'
  },
  {
    icon: Target,
    title: 'Résultats mesurables',
    description: 'Focus sur l\'impact business et la valeur utilisateur'
  }
];

export function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-background"
      aria-label="About Flowdee"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 hover-underline inline-block">
            Une approche design,<br />une vision stratégique
          </h2>
          <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
            J'aide les fondateurs de startups et product managers à concevoir des expériences 
            utilisateur exceptionnelles, en intégrant l'intelligence artificielle pour créer 
            des workflows plus efficaces et intuitifs.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            opacity: { duration: 0.5 },
            y: { 
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
          animate={{ y: [-10, 10, -10] }}
          style={{ willChange: "transform" }}
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                className="liquid-glass-card p-8"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="min-w-[48px] min-h-[48px] rounded-xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--color-icon-primary-aaa)' }} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent-primary/5 p-8 md:p-12 rounded-2xl border border-border"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
            Ma mission
          </h3>
          <p className="text-lg text-muted-foreground text-center max-w-[700px] mx-auto">
            Transformer vos idées en produits digitaux performants, en combinant excellence 
            en design, expertise technique et compréhension approfondie des besoins utilisateurs. 
            Mon objectif : accélérer votre time-to-market tout en garantissant une expérience 
            utilisateur exceptionnelle.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
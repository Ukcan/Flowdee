import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Zap, Target } from 'lucide-react';

/**
 * Section/About Component
 * Nomenclature Figma: Section/About (or Section/Approach)
 */

const highlights = [
  {
    icon: Award,
    title: 'Conversion & activation',
    description: 'Des parcours optimisés qui transforment visiteurs en clients actifs'
  },
  {
    icon: Zap,
    title: 'Accélération IA (sans compromis UX)',
    description: 'L\'IA accélère l\'exécution, mais le jugement UX décide'
  },
  {
    icon: Users,
    title: 'Co-construction avec ton équipe',
    description: 'Design Partner intégré : itérations rapides avec tes Product/Tech'
  },
  {
    icon: Target,
    title: 'Impact business mesurable',
    description: 'KPIs clairs dès l\'audit : conversion, activation, rétention'
  }
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-background"
      aria-label="About Flowdee"
      data-component="section-about"
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
                    className="min-w-[48px] min-h-[48px] rounded-3xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--color-icon-primary-aaa)' }} />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
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
          className="mt-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent-primary/5 p-8 md:p-12 rounded-3xl border border-border"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
            Ce que vous obtenez
          </h3>
          <p className="text-lg text-muted-foreground text-center max-w-[700px] mx-auto">
            Un diagnostic UX clair, des hypothèses priorisées impact/effort, des prototypes testés en conditions réelles. Pas de fluff, pas de slide-ware : du design opérationnel qui accélère ton product-market fit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Alias for backwards compatibility
export { AboutSection as About };
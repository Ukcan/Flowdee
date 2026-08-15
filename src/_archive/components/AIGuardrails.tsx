import React from 'react';
import { motion } from 'motion/react';
import { Check, Shield, X } from 'lucide-react';

// I02: Rephrased use cases with output format
const aiUseCases = [
  'Synthèse de 30+ interviews → fichier JSON structuré (validation manuelle)',
  '20 variantes de microcopy → scoring via heuristiques UX',
  'Génération des états empty/error/loading → fichiers Figma annotés',
  'Draft de specs structurées → doc Notion prêt pour revue'
];

const guardrails = [
  'Prompts structurés + contraintes JSON',
  'Validation systématique vs heuristiques UX',
  'Aucune donnée client exposée (confidentialité)',
  'Accessibilité vérifiée manuellement'
];

export function AIGuardrails() {
  return (
    <section
      id="ai-guardrails"
      className="py-24 md:py-32"
      aria-label="How I use AI"
    >
      <div className="max-w-[1000px] mx-auto px-8 md:px-16">
        {/* Titre principal avec mot mis en avant */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-foreground mb-6 text-center"
        >
          Une <span className="text-primary">approche</span> simple,{' '}
          rapide et pensée pour vous
        </motion.h2>
        
        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-foreground/80 leading-relaxed text-center mb-16 max-w-[800px] mx-auto"
        >
          Ma méthode repose sur une collaboration fluide, des révisions illimitées et une satisfaction garantie.
        </motion.p>

        {/* Tableau comparatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-2xl p-8 md:p-10 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-white/8 dark:via-white/3 dark:to-white/8 border border-white/20 dark:border-white/15 liquid-metal-border"
          style={{
            boxShadow: '0 12px 40px -8px rgba(0, 159, 183, 0.20), 0 8px 24px -6px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* En-têtes avec background gradient */}
          <div className="grid grid-cols-2 gap-6 md:gap-10 mb-8 pb-6 border-b border-white/15 dark:border-white/10">
            <div className="flex items-center justify-center">
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold text-primary relative z-10">
                  Flowdee
                </h3>
                <div 
                  className="absolute -inset-x-4 -inset-y-2 bg-primary/10 dark:bg-primary/15 rounded-lg blur-xl opacity-60"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-foreground/60">
                Autres designers
              </h3>
            </div>
          </div>

          {/* Lignes de comparaison */}
          <div className="space-y-5">
            {/* Ligne 1 */}
            <div className="grid grid-cols-2 gap-6 md:gap-10 py-5 border-b border-white/8 dark:border-white/5 hover:bg-white/5 dark:hover:bg-white/3 rounded-lg transition-all duration-300 px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-success/15 dark:bg-success/20 flex items-center justify-center flex-shrink-0 border border-success/30 dark:border-success/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(61, 214, 109, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.20)',
                  }}
                >
                  <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  Audit UX data-driven
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-destructive/15 dark:bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30 dark:border-destructive/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(204, 51, 111, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <X className="w-4 h-4 text-destructive" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground/65">
                  Avis subjectifs et ressentis
                </span>
              </div>
            </div>

            {/* Ligne 2 */}
            <div className="grid grid-cols-2 gap-6 md:gap-10 py-5 border-b border-white/8 dark:border-white/5 hover:bg-white/5 dark:hover:bg-white/3 rounded-lg transition-all duration-300 px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-success/15 dark:bg-success/20 flex items-center justify-center flex-shrink-0 border border-success/30 dark:border-success/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(61, 214, 109, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.20)',
                  }}
                >
                  <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  Révisions illimitées
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-destructive/15 dark:bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30 dark:border-destructive/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(204, 51, 111, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <X className="w-4 h-4 text-destructive" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground/65">
                  Révisions limitées ou facturées
                </span>
              </div>
            </div>

            {/* Ligne 3 */}
            <div className="grid grid-cols-2 gap-6 md:gap-10 py-5 border-b border-white/8 dark:border-white/5 hover:bg-white/5 dark:hover:bg-white/3 rounded-lg transition-all duration-300 px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-success/15 dark:bg-success/20 flex items-center justify-center flex-shrink-0 border border-success/30 dark:border-success/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(61, 214, 109, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.20)',
                  }}
                >
                  <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  Livrables dev-ready
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-destructive/15 dark:bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30 dark:border-destructive/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(204, 51, 111, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <X className="w-4 h-4 text-destructive" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground/65">
                  Maquettes floues à interpréter
                </span>
              </div>
            </div>

            {/* Ligne 4 */}
            <div className="grid grid-cols-2 gap-6 md:gap-10 py-5 border-b border-white/8 dark:border-white/5 hover:bg-white/5 dark:hover:bg-white/3 rounded-lg transition-all duration-300 px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-success/15 dark:bg-success/20 flex items-center justify-center flex-shrink-0 border border-success/30 dark:border-success/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(61, 214, 109, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.20)',
                  }}
                >
                  <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  Méthodologie structurée
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-destructive/15 dark:bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30 dark:border-destructive/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(204, 51, 111, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <X className="w-4 h-4 text-destructive" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground/65">
                  Process interne opaque
                </span>
              </div>
            </div>

            {/* Ligne 5 */}
            <div className="grid grid-cols-2 gap-6 md:gap-10 py-5 border-b border-white/8 dark:border-white/5 hover:bg-white/5 dark:hover:bg-white/3 rounded-lg transition-all duration-300 px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-success/15 dark:bg-success/20 flex items-center justify-center flex-shrink-0 border border-success/30 dark:border-success/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(61, 214, 109, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.20)',
                  }}
                >
                  <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  Communication asynchrone fluide
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-destructive/15 dark:bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30 dark:border-destructive/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(204, 51, 111, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <X className="w-4 h-4 text-destructive" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground/65">
                  Réunions à rallonge
                </span>
              </div>
            </div>

            {/* Ligne 6 */}
            <div className="grid grid-cols-2 gap-6 md:gap-10 py-5 hover:bg-white/5 dark:hover:bg-white/3 rounded-lg transition-all duration-300 px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-success/15 dark:bg-success/20 flex items-center justify-center flex-shrink-0 border border-success/30 dark:border-success/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(61, 214, 109, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.20)',
                  }}
                >
                  <Check className="w-4 h-4 text-success" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  Délais garantis (72h–5j)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="min-w-[24px] min-h-[24px] rounded-full backdrop-blur-sm bg-destructive/15 dark:bg-destructive/20 flex items-center justify-center flex-shrink-0 border border-destructive/30 dark:border-destructive/35"
                  style={{
                    boxShadow: '0 4px 12px -3px rgba(204, 51, 111, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <X className="w-4 h-4 text-destructive" strokeWidth={2.5} />
                </div>
                <span className="text-sm md:text-base text-foreground/65">
                  Délais souvent longs
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
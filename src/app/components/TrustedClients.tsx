import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';
import { TechnicalLabel } from './TechnicalLabel';

const clientSegments = [
  { segment: 'Practeex', detail: '' },
  { segment: 'ACES', detail: '' },
  { segment: 'Karma Com Solidarité', detail: '' },
  { segment: 'Université de Bordeaux', detail: '' },
];

export function TrustedClients() {
  const { t } = useTranslation();

  return (
    <section
      /* Rythme volontairement serré : cette section est une respiration avant
         l'étude de cas phare, pas un chapitre à part entière — surface subtile
         pour rester une pause calme entre Offres et la preuve détaillée. */
      className="py-16 md:py-20 bg-surface-0 border-t border-border-1 relative overflow-hidden"
      aria-label="Ils m’ont fait confiance"
    >
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10"
        >
          {/* <TechnicalLabel sectionId="CLIENTS_DB_01" /> */}
          {/* Titre volontairement réduit : section de validation, pas de chapitre. */}
          <h2 className="heading-3 text-text-secondary text-center font-normal">
            {t.trustedClients.title}
          </h2>
        </motion.div>

        {/* Partner marquee — infinite scroll, pauses on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="marquee-mask"
          aria-label="Partenaires et références"
        >
          <div className="marquee-track py-2">
            {[...clientSegments, ...clientSegments].map((client, index) => (
              <div
                key={index}
                aria-hidden={index >= clientSegments.length ? 'true' : undefined}
                className="card-surface h-[104px] w-[220px] mx-3 shrink-0 flex items-center justify-center bg-surface-raised group"
                style={{
                  borderColor: 'var(--border-1)',
                  boxShadow: 'var(--shadow-panel), var(--inset-topline)',
                }}
              >
                <div className="font-body font-medium uppercase text-[13px] leading-tight text-text-primary tracking-[0.06em] group-hover:text-accent-primary transition-colors text-center px-6">
                  {client.segment}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* NDA Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-text-muted">
            CERTAINES RÉFÉRENCES SOUS NDA
          </p>
        </motion.div>

        {/* Short testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 max-w-[800px] mx-auto"
        >
          <div className="bg-surface-raised border border-border-0 p-10 rounded-[24px] text-center">
            <p className="font-body text-[18px] md:text-[22px] text-accent-primary mb-4 leading-snug tracking-wide" style={{ fontWeight: 300 }}>
              "Résultats visibles dès la 2e itération : moins de friction, plus d'activation."
            </p>
            <p className="font-body text-[12px] uppercase tracking-[0.2em] text-text-primary font-medium">
              CEO, Hub LMS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
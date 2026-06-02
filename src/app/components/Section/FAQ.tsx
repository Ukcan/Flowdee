import React from 'react';
import { motion } from 'motion/react';
import { ParallaxHeading } from '../Decor/ParallaxHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useTranslation } from '../../contexts/LanguageContext';
import { TechnicalLabel } from '../TechnicalLabel';

export function FAQSection() {
  const { t } = useTranslation();
  
  const faqs = [
    {
      question: "Qu’est-ce que je reçois concrètement avec l’audit ?",
      answer: "Un livrable actionnable, pas un PDF théorique : un backlog priorisé impact/effort, 3 à 5 maquettes correctives prêtes à implémenter, et une checklist QA."
    },
    {
      question: "Et si je n’ai pas besoin d’une refonte complète ?",
      answer: "C’est tout l’intérêt : on cible les frictions qui comptent et on corrige par priorité, sans refonte inutile. Vous gardez votre existant, on optimise ce qui bloque vos conversions."
    },
    {
      question: "L’audit couvre-t-il l’UX, le SEO, l’accessibilité et la microcopy ?",
      answer: "Oui : UX — clarté, parcours, CTA, formulaires ; accessibilité ; SEO on-page ; microcopy — titres, aides, erreurs, réassurances. Les corrections sont priorisées par impact."
    },
    {
      question: "Combien de temps ça prend et combien ça coûte ?",
      answer: "Audit UX : dès 279 €, livré en 72 h à 5 jours. Sprint Design + Tests : dès 2 400 €, 1 à 2 semaines. Design Partner : sur devis, en continu. Paiement sécurisé."
    },
    {
      question: "Comment utiliser le livrable avec Figma, votre équipe dev ou Claude Code ?",
      answer: "Les maquettes sont livrées dans Figma avec des specs claires, directement exploitables par votre équipe de développement — et pensées pour être reprises facilement par un assistant comme Claude Code afin d’accélérer l’implémentation."
    },
    {
      question: "Quelle offre choisir si je ne suis pas sûr ?",
      answer: "Réservez un appel de 30 minutes : on regarde votre situation ensemble et je vous oriente vers le format le plus adapté. Sans engagement."
    },
    {
      question: "Quelle garantie de confidentialité ?",
      answer: "NDA possible sur demande, anonymisation systématique des cas clients, accès limité aux données strictement nécessaires, suppression ou restitution des fichiers en fin de mission.",
      footnote: "NDA (Non Disclosure Agreement), garantit la confidentialité des informations, données sensibles ou stratégiques, relatives à une entreprise."
    }
  ];

  return (
    <section
      id="faq"
      className="bg-bg-base py-24 md:py-32 overflow-visible relative border-t border-border-0"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-[800px] mx-auto px-8 md:px-16 relative z-10">
        <div className="flex flex-col items-center mb-16">
          {/* <TechnicalLabel sectionId="FAQ_TERMINAL_01" /> */}
          <ParallaxHeading>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="heading-1 text-center text-text-primary mt-4"
            >
              {t.faq.title}
            </motion.h2>
          </ParallaxHeading>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="multiple" className="w-full space-y-4">
            {faqs.map((faq, index) => {
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="card-surface border-border-0 bg-surface-0 transition-all duration-200 overflow-visible hover:border-border-1 rounded-[24px] px-8"
                >
                  <AccordionTrigger 
                    className="font-heading text-[15px] md:text-[17px] text-text-primary hover:no-underline py-6 text-left [&>svg]:text-accent-primary tracking-[-0.01em]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="flex items-center gap-4">
                       <span className="text-accent-primary font-body text-[12px] font-medium">{index < 9 ? `0${index + 1}` : index + 1}</span>
                       {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <div className="body text-[14px] text-text-secondary whitespace-pre-line border-t border-border-0 pt-6">
                      {faq.answer}
                      {faq.footnote && (
                        <p className="mt-4 font-body text-[11px] text-text-muted leading-[1.5] italic">
                          {faq.footnote}
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export { FAQSection as FAQ };
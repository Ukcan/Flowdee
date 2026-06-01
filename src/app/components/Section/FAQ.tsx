import React from 'react';
import { motion } from 'motion/react';
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
      question: "L'audit est gratuit ? Quel est le catch ?",
      answer: "Non, l'audit est payant (279€) parce qu'il livre des maquettes correctives prêtes à implémenter, pas juste un PDF théorique. Vous payez pour du concret : backlog priorisé + 3-5 maquettes + checklist QA.\n\nLivraison : 72h-5 jours max.",
      isHighlighted: true
    },
    {
      question: "Combien ça coûte et quels délais ?",
      answer: "• Audit UX : 279€ | Livraison 72h-5 jours\n• Sprint Design : Dès 2,400€ | Livraison 1-2 semaines\n• Partnership : Sur devis | Ongoing\n\nPaiement sécurisé. Démarrage sous 48h si dispo.",
      isHighlighted: true
    },
    {
      question: "Comment vous différenciez-vous ?",
      answer: "On ne fait pas de \"joli design\". On supprime les frictions qui coûtent tes conversions. Approche data-driven : audit heuristique + tests + metrics.\n\nIA accélère la prod (30+ interviews → JSON structuré), mais validation reste UX (heuristiques, tests users).\n\nRésultats clients 2024 : +40% activation, +32% checkout.",
      isHighlighted: true
    },
    {
      question: t.faq.questions.q3.question,
      answer: t.faq.questions.q3.answer
    },
    {
      question: t.faq.questions.q4.question,
      answer: t.faq.questions.q4.answer
    },
    {
      question: t.faq.questions.q5.question,
      answer: t.faq.questions.q5.answer
    },
    {
      question: "Comment se passe l'achat de l'audit ?",
      answer: "Vous achetez l'audit, on planifie un kickoff 20 min, puis livraison sous 72h–5j : diagnostic + priorités + maquettes correctives."
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="heading-1 text-center text-text-primary mt-4"
          >
            {t.faq.title}
          </motion.h1>
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
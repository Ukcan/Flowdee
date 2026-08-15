import React from 'react';
import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useTranslation } from '../contexts/LanguageContext';

export function FAQ() {
  const { t } = useTranslation();
  
  const faqs = [
    {
      question: t.faq.questions.q1.question,
      answer: t.faq.questions.q1.answer
    },
    {
      question: t.faq.questions.q2.question,
      answer: t.faq.questions.q2.answer
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
    // Q01: Audit purchase process
    {
      question: "Comment se passe l'achat de l'audit ?",
      answer: "Vous achetez l'audit, on planifie un kickoff 30 min, puis livraison sous 72h–5j : diagnostic + priorités + maquettes correctives."
    },
    // Q02: Confidentiality
    {
      question: "Quelle garantie de confidentialité ?",
      answer: "NDA possible sur demande, anonymisation systématique des cas clients, accès limité aux données strictement nécessaires, suppression ou restitution des fichiers en fin de mission."
    }
  ];

  return (
    <section
      id="faq"
      className="py-24 md:py-32 overflow-visible"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-[800px] mx-auto px-8 md:px-16 pb-24 md:pb-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-12"
        >
          {t.faq.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 hover:border-primary/30 transition-colors overflow-visible [&:last-child]:border-b"
              >
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
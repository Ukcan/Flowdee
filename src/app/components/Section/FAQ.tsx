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
import { FAQS } from '../../constants/faq';

export function FAQSection() {
  const { t } = useTranslation();
  const faqs = FAQS;

  return (
    <section
      id="faq"
      className="bg-bg-base py-24 md:py-32 overflow-visible relative border-t border-border-1"
      aria-label="Questions fréquentes"
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
                       <span aria-hidden="true" className="text-accent-primary font-body text-[12px] font-medium">{index < 9 ? `0${index + 1}` : index + 1}</span>
                       {faq.question}
                    </span>
                  </AccordionTrigger>
                  {/* forceMount : la réponse reste dans le DOM même repliée
                      (hauteur animée à 0 par les classes ci-dessus), pour
                      qu'elle soit lisible sans JS et par les crawlers qui
                      n'ouvrent pas l'accordéon. */}
                  <AccordionContent forceMount className="pb-8">
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
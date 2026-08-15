import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTranslation } from '../contexts/LanguageContext';

export function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const { t } = useTranslation();
  
  const services = [
    {
      timeline: t.services.timeline.audit,
      title: t.services.cardTitle.audit,
      price: t.services.price.auditFrom,
      deliverables: [
        t.services.deliverables.auditHeuristic,
        t.services.deliverables.backlogPriority,
        t.services.deliverables.correctiveMockups,
        t.services.deliverables.qaChecklist,
      ]
    },
    {
      timeline: t.services.timeline.sprint,
      title: t.services.cardTitle.sprint,
      price: t.services.price.sprintFrom,
      deliverables: [
        t.services.deliverables.discoveryLight,
        t.services.deliverables.userFlowsPrototype,
        t.services.deliverables.rapidTests,
        t.services.deliverables.uiHandoff,
      ],
      featured: true
    },
    {
      timeline: t.services.timeline.partner,
      title: t.services.cardTitle.partner,
      price: t.services.price.partnerQuote,
      deliverables: [
        t.services.deliverables.continuousIterations,
        t.services.deliverables.abTests,
        t.services.deliverables.designSystem,
        t.services.deliverables.designOps,
      ]
    }
  ];
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: 'var(--surface-1)'
      }}
      aria-label="Service packages"
    >
      {/* Liquid Accent Decorative - Top Right Corner */}
      <div className="liquid-deco top-0 right-0 translate-x-1/4 -translate-y-1/4" aria-hidden="true"></div>
      
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-16"
        >
          {t.services.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isActive = selectedService === service.title;
            const isFeatured = service.featured;
            
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedService(service.title)}
              className={`${isFeatured ? 'liquid-glass-card' : 'liquid-glass-card'} p-8 flex flex-col cursor-pointer ${
                isActive
                  ? 'ring-2 ring-accent-primary shadow-xl'
                  : ''
              }`}
            >
              {/* Timeline Badge */}
              <Badge className="self-start mb-6 text-sm px-3 py-1.5 bg-muted text-foreground border-border">
                {service.timeline}
              </Badge>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>

              {/* Price */}
              <div className="text-lg font-semibold text-foreground mb-8">
                {service.price}
              </div>

              {/* Deliverables */}
              <div className="space-y-4 mb-8 flex-grow">
                {service.deliverables.map((deliverable, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="min-w-[20px] min-h-[20px] rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4" style={{ color: 'var(--color-success-access)' }} />
                    </div>
                    <span className="text-base text-muted-foreground">
                      {deliverable}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                onClick={scrollToContact}
                variant={isActive ? 'default' : 'outline'}
                className={`group relative overflow-hidden w-full min-h-[44px] font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus-ring rounded-full ${
                  isActive
                    ? 'bg-accent-cta text-on-accent'
                    : 'bg-accent-cta text-on-accent border-accent-cta'
                }`}
              >
                {t.services.ctaQuote}
              </Button>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
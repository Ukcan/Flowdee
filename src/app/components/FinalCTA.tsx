import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { CTA_PRIMARY, CTA_SECONDARY } from '../constants/ctaCopy';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { CALENDAR_LINK, AUDIT_LINK } from '../constants/links';

export function FinalCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [choice, setChoice] = useState<'call' | 'audit'>('call');

  const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.email.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    const successMessage = choice === 'call'
      ? 'Message envoyé ! Redirection vers le calendrier...'
      : 'Redirection vers le paiement sécurisé...';

    toast.success(successMessage, {
      description: 'Merci de votre intérêt pour mes services.',
    });

    if (choice === 'call') {
      window.open(CALENDAR_LINK, '_blank', 'noopener,noreferrer');
    } else {
      window.open(AUDIT_LINK, '_blank', 'noopener,noreferrer');
    }

    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section
      id="contact"
      className="relative pt-24 md:pt-32 pb-32 bg-transparent text-text-primary overflow-hidden border-t border-border-0"
      aria-label="Contact form"
    >
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-start">
          {/* Left Column - Title & Description */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8 lg:sticky lg:top-[128.69px]"
          >
            {/* <TechnicalLabel sectionId="CONTACT_FORM_01" /> */}
            <h2 className="heading-1 text-text-primary">
              Réservez un appel (30 min) ou achetez l'audit
            </h2>
            
            <p className="body-large text-text-secondary">
              Discutons de votre projet pendant 30 minutes, sans engagement.
            </p>

            <div className="inline-block px-4 py-2 bg-accent-tint rounded-lg cursor-default select-none">
              <p className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-accent-primary">
                Réponse sous 24h
              </p>
            </div>
            
            <div className="hidden lg:block pt-8">
               <div className="flex gap-2 mb-4">
                  {Array.from({length: 8}).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 rounded-full bg-accent-primary/20" 
                    />
                  ))}
               </div>
               <span className="font-body text-[11px] text-text-muted uppercase tracking-widest block font-semibold">
                 DISPONIBILITÉS : OUVERTES POUR JANVIER/FÉVRIER
               </span>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 card-surface bg-surface-0 p-10"
            >
              {/* Choice radio buttons */}
              <div className="space-y-3">
                <label className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block">JE VEUX :</label>
                <div className="flex flex-col sm:flex-row gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-5 h-5 border border-border-1 rounded-full bg-surface-0 flex items-center justify-center transition-all group-hover:border-accent-primary">
                      <input
                        type="radio"
                        name="choice"
                        value="call"
                        checked={choice === 'call'}
                        onChange={() => setChoice('call')}
                        className="peer absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="w-2.5 h-2.5 bg-accent-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className={`font-body text-[13px] font-medium transition-colors ${choice === 'call' ? 'text-accent-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                      Réserver un appel
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-5 h-5 border border-border-1 rounded-full bg-surface-0 flex items-center justify-center transition-all group-hover:border-accent-primary">
                      <input
                        type="radio"
                        name="choice"
                        value="audit"
                        checked={choice === 'audit'}
                        onChange={() => setChoice('audit')}
                        className="peer absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="w-2.5 h-2.5 bg-accent-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className={`font-body text-[13px] font-medium transition-colors ${choice === 'audit' ? 'text-accent-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                      Acheter l'audit
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block">EMAIL PROFESSIONNEL *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 bg-bg-base border-[1.5px] border-border-1 text-text-primary px-5 font-body rounded-[8px] hover:border-border-2 focus:border-[1.5px] focus:border-accent-primary focus:ring-[4px] focus:ring-accent-bg outline-none transition-all duration-150 placeholder:text-text-muted/60 text-[15px]"
                  placeholder="jean@entreprise.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block">NOM COMPLET *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 bg-bg-base border-[1.5px] border-border-1 text-text-primary px-5 font-body rounded-[8px] hover:border-border-2 focus:border-[1.5px] focus:border-accent-primary focus:ring-[4px] focus:ring-accent-bg outline-none transition-all duration-150 placeholder:text-text-muted/60 text-[15px]"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block">ENTREPRISE</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full h-12 bg-bg-base border-[1.5px] border-border-1 text-text-primary px-5 font-body rounded-[8px] hover:border-border-2 focus:border-[1.5px] focus:border-accent-primary focus:ring-[4px] focus:ring-accent-bg outline-none transition-all duration-150 placeholder:text-text-muted/60 text-[15px]"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block">VOTRE PROJET (OPTIONNEL)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[120px] bg-bg-base border-[1.5px] border-border-1 text-text-primary p-5 font-body rounded-[12px] hover:border-border-2 focus:border-[1.5px] focus:border-accent-primary focus:ring-[4px] focus:ring-accent-bg outline-none transition-all duration-150 placeholder:text-text-muted/60 resize-none text-[15px]"
                  placeholder="Objectif, métrique principale, où ça coince..."
                />
              </div>

              <ButtonPrimary
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full h-[52px] text-[16px] mt-2"
              >
                {isSubmitting 
                  ? 'ENVOI EN COURS...' 
                  : choice === 'call' 
                    ? 'Réserver un créneau (Calendar) →' 
                    : 'Envoyer ma demande d\'audit'}
              </ButtonPrimary>
              
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted text-center mt-2">
                REMOTE OU SUR SITE • RÉPONSE SOUS 24H
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
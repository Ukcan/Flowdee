import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { CALENDAR_LINK, openAuditLink, openBlankTab } from '../constants/links';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../constants/web3forms';
import { CTA, AUDIT_SCOPE, AUDIT_DELIVERY, AUDIT_REASSURANCE } from '../constants/offer';

/**
 * Les deux intentions ne partagent que les coordonnées. Tout le reste — titre,
 * accroche, libellé du champ libre, bouton, réassurance — change avec le choix.
 *
 * Auparavant le formulaire annonçait « Discutons de votre projet pendant
 * 30 minutes » quoi qu'on ait coché, et le bouton d'achat menait à
 * « Réserver un créneau (Calendar) » : le visiteur qui venait d'indiquer
 * vouloir acheter se voyait proposer un rendez-vous.
 */
const INTENTS = {
  call: {
    radio: 'Réserver un appel de 30 min',
    title: 'Réservons 30 minutes',
    lead: 'On regarde votre situation ensemble et je vous oriente vers le format le plus adapté. Sans engagement.',
    messageLabel: 'VOTRE PROJET / BESOIN (OPTIONNEL)',
    messagePlaceholder: 'Objectif, métrique principale, où ça coince…',
    submit: 'Choisir un créneau',
    footnote: 'Sans engagement · Réponse sous 24 h',
  },
  audit: {
    radio: 'Commander l’audit',
    title: 'Commandez votre audit',
    lead: `${AUDIT_SCOPE}. ${AUDIT_DELIVERY}.`,
    messageLabel: 'PARCOURS OU PAGES À AUDITER (OPTIONNEL)',
    messagePlaceholder: 'URL du parcours, écrans concernés, objectif visé…',
    submit: CTA.audit,
    footnote: AUDIT_REASSURANCE,
  },
} as const;

export function FinalCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [choice, setChoice] = useState<'call' | 'audit'>('call');
  const intent = INTENTS[choice];
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.email.includes('@');

  // Reuses the exact validation rules already driving isFormValid above —
  // no new business rule is introduced, only a per-field breakdown for
  // accessible error messaging (required for WCAG 3.3.1 / 4.1.2 feedback).
  const nameInvalid = formData.name.trim() === '';
  const emailInvalid = formData.email.trim() === '' || !formData.email.includes('@');
  const nameErrorMessage = 'Votre nom complet est requis.';
  const emailErrorMessage = formData.email.trim() === ''
    ? 'Votre email professionnel est requis.'
    : 'Saisissez une adresse e-mail valide.';
  const showNameError = (touched.name || submitAttempted) && nameInvalid;
  const showEmailError = (touched.email || submitAttempted) && emailInvalid;

  const handleBlur = (field: 'name' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setSubmitAttempted(true);
      return;
    }

    setIsSubmitting(true);

    // Ouvre l'onglet Stripe tout de suite (geste utilisateur synchrone) — sinon
    // le navigateur bloque window.open() une fois passé l'`await fetch` ci-dessous.
    const stripeTab = choice === 'audit' ? openBlankTab() : undefined;

    // Enregistre le lead via Web3Forms (n'empêche pas la suite si échec)
    try {
      await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nouveau contact Flowdee — ${choice === 'call' ? 'Appel' : 'Audit'}`,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          choice,
        }),
      });
    } catch {
      // on continue quand même vers Calendar / paiement
    }

    const successMessage = choice === 'call'
      ? 'Demande envoyée ! Ouverture du calendrier…'
      : 'Redirection vers le paiement sécurisé...';

    toast.success(successMessage, {
      description: 'Merci de votre intérêt pour mes services.',
    });

    if (choice === 'call') {
      window.dispatchEvent(new CustomEvent('flowdee:open-calendar'));
    } else {
      openAuditLink(stripeTab);
    }

    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
    setTouched({});
    setSubmitAttempted(false);
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
      className="relative pt-24 md:pt-28 pb-24 md:pb-28 bg-transparent text-text-primary overflow-hidden border-t border-border-0"
      aria-labelledby="contact-title"
    >
      {/* Panneau de conversion — la page se referme sur un bloc contenu.
          Profondeur obtenue par l'étagement des surfaces (page → panneau →
          formulaire), pas par des ombres supplémentaires. */}
      <div className="max-w-[1184px] mx-auto px-6 sm:px-8 md:px-16 relative z-10">
        <div className="rounded-[28px] border border-border-0 bg-surface-0 p-7 sm:p-10 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[64px] items-start">
          {/* Left Column - Title & Description */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* <TechnicalLabel sectionId="CONTACT_FORM_01" /> */}
            {/* Titre et accroche suivent l'intention cochée : le visiteur doit
                voir le formulaire lui répondre, pas rester sur une promesse
                d'appel alors qu'il vient de choisir d'acheter. */}
            <h2 id="contact-title" className="heading-1 text-text-primary">
              {intent.title}
            </h2>

            <p className="body-large text-text-secondary">
              {intent.lead}
            </p>

            <div className="inline-block px-4 py-2 bg-accent-tint rounded-lg cursor-default select-none">
              <p className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-accent-primary">
                Réponse sous 24 h
              </p>
            </div>

            {/* Le bloc annonçait « Disponibilités : ouvertes pour
                janvier/février », une date figée dans le code et périmée depuis.
                Une disponibilité datée doit être tenue à jour ou ne pas être
                affichée. */}
            <div className="hidden lg:block pt-8">
               <div className="flex gap-2 mb-4" aria-hidden="true">
                  {Array.from({length: 8}).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-accent-primary/20"
                    />
                  ))}
               </div>
               <span className="font-body text-[11px] text-text-muted uppercase tracking-widest block font-semibold">
                 REMOTE OU SUR SITE · BORDEAUX ET NICE
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
              className="space-y-4 rounded-[20px] border border-border-0 bg-surface-1 p-6 sm:p-8 md:p-9"
              noValidate
            >
              {/* Le groupe était introduit par un <label> orphelin, rattaché à
                  aucun champ : un lecteur d'écran annonçait deux boutons radio
                  sans jamais dire de quel choix il s'agissait. fieldset/legend
                  est la structure prévue pour ça.
                  Zone cliquable portée à 44px de haut (Fitts, WCAG 2.5.8) :
                  le pastille de 20px était la seule cible confortable. */}
              <fieldset className="space-y-3 border-0 p-0 m-0">
                <legend className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block p-0">
                  JE VEUX :
                </legend>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                  {(['call', 'audit'] as const).map((value) => {
                    const selected = choice === value;
                    return (
                      <label
                        key={value}
                        className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1"
                      >
                        <div className={`relative w-5 h-5 shrink-0 border rounded-full bg-surface-0 flex items-center justify-center transition-all group-hover:border-accent-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface-0 ${selected ? 'border-accent-primary' : 'border-border-1'}`}>
                          <input
                            type="radio"
                            name="choice"
                            value={value}
                            checked={selected}
                            onChange={() => setChoice(value)}
                            className="peer absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="w-2.5 h-2.5 bg-accent-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className={`font-body text-[13px] font-medium transition-colors ${selected ? 'text-accent-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                          {INTENTS[value].radio}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              
              <div className="space-y-2">
                <label htmlFor="email" className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block">EMAIL PROFESSIONNEL *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={showEmailError ? 'true' : undefined}
                  aria-describedby={showEmailError ? 'email-error' : undefined}
                  className={`w-full h-12 bg-bg-base border-[1.5px] ${showEmailError ? 'border-status-danger' : 'border-border-1'} text-text-primary px-5 font-body rounded-[8px] hover:border-border-2 focus:border-[1.5px] focus:border-accent-primary focus:ring-[4px] focus:ring-accent-bg outline-none transition-all duration-150 placeholder:text-text-muted/60 text-[15px]`}
                  placeholder="jean@entreprise.com"
                />
                {showEmailError && (
                  <p id="email-error" role="alert" className="font-body text-[12px] text-status-danger">
                    {emailErrorMessage}
                  </p>
                )}
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
                  onBlur={() => handleBlur('name')}
                  aria-invalid={showNameError ? 'true' : undefined}
                  aria-describedby={showNameError ? 'name-error' : undefined}
                  className={`w-full h-12 bg-bg-base border-[1.5px] ${showNameError ? 'border-status-danger' : 'border-border-1'} text-text-primary px-5 font-body rounded-[8px] hover:border-border-2 focus:border-[1.5px] focus:border-accent-primary focus:ring-[4px] focus:ring-accent-bg outline-none transition-all duration-150 placeholder:text-text-muted/60 text-[15px]`}
                  placeholder="Jean Dupont"
                />
                {showNameError && (
                  <p id="name-error" role="alert" className="font-body text-[12px] text-status-danger">
                    {nameErrorMessage}
                  </p>
                )}
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
                {/* Le champ libre ne demande pas la même chose selon l'intention :
                    un besoin à cadrer d'un côté, un périmètre à auditer de
                    l'autre. */}
                <label htmlFor="message" className="font-body text-[11px] font-bold uppercase tracking-widest text-text-muted block">{intent.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[120px] bg-bg-base border-[1.5px] border-border-1 text-text-primary p-5 font-body rounded-[12px] hover:border-border-2 focus:border-[1.5px] focus:border-accent-primary focus:ring-[4px] focus:ring-accent-bg outline-none transition-all duration-150 placeholder:text-text-muted/60 resize-none text-[15px]"
                  placeholder={intent.messagePlaceholder}
                />
              </div>

              <ButtonPrimary
                type="submit"
                disabled={isSubmitting || !isFormValid}
                /* Le libellé le plus long ("Réserver un créneau (Calendar) →")
                   dépasse la largeur utile en mobile : on autorise le retour à
                   la ligne et une hauteur libre plutôt que de le tronquer. */
                className="w-full min-h-[52px] h-auto py-3 px-4 sm:px-7 whitespace-normal text-center text-[15px] sm:text-[16px] mt-2"
              >
                {isSubmitting ? 'Envoi en cours…' : intent.submit}
              </ButtonPrimary>

              {/* La réassurance suit elle aussi l'intention : un délai de
                  réponse pour l'appel, un délai de livraison et le paiement
                  pour l'achat. La ligne unique précédente parlait de réponse
                  sous 24 h à quelqu'un qui allait payer. */}
              <p className="font-body text-[12px] text-text-muted text-center mt-2">
                {intent.footnote}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
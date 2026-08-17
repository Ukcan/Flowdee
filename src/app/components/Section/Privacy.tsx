import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft, ShieldCheck, Eye, Lock, FileText, Target } from '@phosphor-icons/react';
import { useSeo } from '../../hooks/useSeo';

/**
 * Section/Privacy Component
 * Nomenclature Figma: Section/Privacy
 * Politique de Confidentialité
 *
 * Route à part entière (/politique-de-confidentialite) plutôt qu'un état
 * local : la page a sa propre URL, partageable, avec un vrai titre — avant,
 * rien dans la barre d'adresse ne distinguait cette page de l'accueil.
 */

interface PrivacySectionProps {
  onClose: () => void;
}

export function PrivacySection({ onClose }: PrivacySectionProps) {
  useSeo({
    title: 'Politique de confidentialité | Flowdee',
    description: 'Politique de confidentialité de Flowdee : données collectées, finalités, durées de conservation et droits RGPD.',
    canonical: 'https://flowdee.fr/politique-de-confidentialite/',
  });

  // Ce plein-écran couvre tout, y compris le header/footer persistants
  // (fixed inset-0, z-[110] plus haut ci-dessous) : verrouiller le scroll du
  // fond évite un double défilement tant que cette route est affichée.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  // Utility to render text with colored bold words
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-accent-primary font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] overflow-y-auto bg-bg-base"
    >
      {/* Background overlay for legibility */}
      <div className="fixed inset-0 bg-bg-base -z-10" />

      {/* Header with close button */}
      <div className="sticky top-0 z-20 bg-surface-0/90 backdrop-blur-md border-b border-border-0">
        <div className="max-w-[1000px] mx-auto px-8 md:px-16 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-3 font-body text-[14px] font-bold text-text-primary hover:text-accent-primary transition-all px-5 py-2.5 rounded-2xl bg-surface-1 border border-border-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-surface-1 border border-border-0 text-text-primary hover:text-accent-primary rounded-2xl transition-all flex items-center justify-center"
              aria-label="Fermer la politique de confidentialité"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-8 md:px-16 py-16 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-display text-text-primary tracking-[-0.02em] leading-[1.05]" style={{ fontWeight: 300 }}>
              Politique de <br/><span className="text-accent-primary">Confidentialité</span>
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-accent-primary" />
              <p className="font-body font-medium text-sm uppercase tracking-widest text-accent-primary">
                Dernière mise à jour : Février 2026
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-surface-0 p-10 rounded-3xl border border-border-0 shadow-panel">
            <p className="font-body text-[18px] leading-relaxed text-text-primary/90">
              {renderText("La présente Politique de Confidentialité a pour objectif d’informer les utilisateurs du site **www.flowdee.fr** (ci-après « le Site ») sur la manière dont leurs données personnelles sont collectées, utilisées et protégées conformément au **RGPD** et à la législation française en vigueur. En utilisant ce Site, vous acceptez la collecte et l’utilisation de vos données conformément à cette politique.")}
            </p>
          </div>

          {/* Articles Sequential List */}
          <div className="space-y-8">
            {/* 1. Responsable */}
            <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary shrink-0">
                <FileText size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  1. Identité du responsable du traitement
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Responsable : **Duffau Benjamin** (Flowdee). Adresse : **21 avenue du Maréchal Leclerc, 33290, Parempuyre, FRANCE**. SIRET : **89070183200010**.")}
                </p>
              </div>
            </article>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 2. Données collectées */}
              <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  2. Données collectées
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Nous collectons : **Nom, prénom**, **Adresse e-mail**, **Numéro de téléphone**, **Nom de l'entreprise**, informations de facturation et données de navigation via les **formulaires de contact**, les **prises de rendez-vous** et les **cookies Google Analytics**.")}
                </p>
              </article>

              {/* 3. Finalités */}
              <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  3. Finalités du traitement
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Les données servent à : **répondre aux devis**, **gérer la relation client**, établir les **factures**, améliorer l'**expérience utilisateur** et réaliser des **statistiques d'audience**.")}
                </p>
              </article>

              {/* 4. Base légale */}
              <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  4. Base légale
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Le traitement repose sur : votre **consentement**, l'**exécution d'un contrat** (devis/facture) et l'**intérêt légitime** (sécurité et amélioration du site).")}
                </p>
              </article>

              {/* 5. Conservation */}
              <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  5. Durée de conservation
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Les données sont archivées **3 ans** après le dernier contact. Les documents comptables sont conservés **10 ans**.")}
                </p>
              </article>
            </div>

            {/* 6. Partage */}
            <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary shrink-0">
                <Target size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  6. Partage des données
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Aucune donnée n'est vendue. Nous utilisons des sous-traitants de confiance : **Google** (Analytics, Gmail, Drive), **Notion**, **Slack** et **Vercel**. Ils respectent tous les normes du **RGPD**.")}
                </p>
              </div>
            </article>

            {/* 8. Droits */}
            <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  8. Droits des utilisateurs
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Vous disposez des droits d'**accès**, de **rectification**, d'**effacement** et d'**opposition**. Contactez-nous à **contact@flowdee.fr** pour exercer vos droits. Réponse sous **30 jours**.")}
                </p>
              </div>
            </article>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 9. Cookies */}
              <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  9. Cookies
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Nous utilisons des cookies pour réaliser des **statistiques de fréquentation**. Vous pouvez les paramétrer à tout moment via notre **bannière de cookies**.")}
                </p>
              </article>

              {/* 10. Hébergement */}
              <article className="bg-surface-0 p-8 rounded-[32px] border border-border-0 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center text-accent-primary">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                  10. Hébergement
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                  {renderText("Le site est hébergé par **Vercel Inc.** (San Francisco, USA). Les serveurs sont sécurisés et conformes aux normes européennes de protection des données.")}
                </p>
              </article>
            </div>
          </div>

          {/* Final Note */}
          <div className="text-center pt-8 border-t border-border-0">
            <p className="font-body text-[13px] text-text-muted font-semibold uppercase tracking-widest">
              Flowdee © 2026 — Duffau Benjamin — contact@flowdee.fr
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
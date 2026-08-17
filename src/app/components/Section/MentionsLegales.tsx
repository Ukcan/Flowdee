import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from '@phosphor-icons/react';
import { useSeo } from '../../hooks/useSeo';

/**
 * Section/MentionsLegales Component
 * Page à part entière (/mentions-legales) : même pattern que CGV/Privacy —
 * contenu dans le flux normal, fil d'Ariane + bouton Retour.
 */

export function MentionsLegalesSection() {
  const navigate = useNavigate();

  useSeo({
    title: 'Mentions légales | Flowdee',
    description: "Mentions légales du site flowdee.fr : éditeur, directeur de publication, hébergeur et propriété intellectuelle.",
    canonical: 'https://flowdee.fr/mentions-legales/',
  });

  return (
    <>
      {/* Fil d'Ariane */}
      <nav aria-label="Fil d’Ariane" className="max-w-[1000px] mx-auto px-8 md:px-16 pt-28 md:pt-32">
        <ol className="flex items-center gap-2 font-body text-[12px] text-text-muted">
          <li>
            <Link to="/" className="hover:text-accent-primary transition-colors underline-offset-4 hover:underline">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary" aria-current="page">Mentions légales</li>
        </ol>
      </nav>

      {/* Retour — ramène toujours à l'accueil (en haut, cf. le scroll-to-top
          global sur changement de route dans App.tsx), plutôt que la page
          précédente dans l'historique. */}
      <div className="max-w-[1000px] mx-auto px-8 md:px-16 mt-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-3 font-body text-[14px] font-bold text-text-primary hover:text-accent-primary transition-all px-5 py-2.5 rounded-2xl bg-surface-1 border border-border-0"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-8 md:px-16 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-12"
        >
          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-display text-text-primary tracking-[-0.02em] leading-[1.05]" style={{ fontWeight: 300 }}>
              Mentions <br/><span className="text-accent-primary">légales</span>
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-accent-primary" />
              <p className="font-body font-medium text-sm uppercase tracking-widest text-accent-primary">
                Dernière mise à jour : 17 août 2026
              </p>
            </div>
          </div>

          <div className="space-y-16">
            {/* 1. Éditeur */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-6">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4" style={{ fontWeight: 500 }}>
                <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm">1</span>
                Éditeur du site
              </h2>
              <div className="space-y-3 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>Le site <strong className="text-text-primary font-bold">flowdee.fr</strong> est édité par :</p>
                <p>
                  <strong className="text-text-primary font-bold">Benjamin Duffau</strong><br />
                  Entrepreneur individuel (EI)<br />
                  Nom commercial : <strong className="text-text-primary font-bold">Flowdee</strong>
                </p>
                <p>
                  Adresse : <strong className="text-text-primary font-bold">21 avenue du Maréchal Leclerc, 33290 Parempuyre, France</strong><br />
                  SIREN : <strong className="text-text-primary font-bold">890 701 832</strong><br />
                  SIRET : <strong className="text-text-primary font-bold">890 701 832 00010</strong><br />
                  E-mail : <a href="mailto:contact@flowdee.fr" className="text-accent-primary hover:underline">contact@flowdee.fr</a><br />
                  Téléphone : <strong className="text-text-primary font-bold">06 30 69 92 73</strong>
                </p>
                <p>
                  TVA : <strong className="text-text-primary font-bold">TVA non applicable, article 293 B du CGI</strong>
                </p>
              </div>
            </article>

            {/* 2. Directeur de la publication */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-6">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4" style={{ fontWeight: 500 }}>
                <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm">2</span>
                Directeur de la publication
              </h2>
              <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                Le directeur de la publication est <strong className="text-text-primary font-bold">Benjamin Duffau</strong>.
              </p>
            </article>

            {/* 3. Hébergement */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-6">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4" style={{ fontWeight: 500 }}>
                <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm">3</span>
                Hébergement
              </h2>
              <p className="font-body text-[15px] leading-relaxed text-text-primary/80">
                Le site est hébergé par :<br />
                <strong className="text-text-primary font-bold">Cloudflare, Inc.</strong><br />
                101 Townsend St, San Francisco, CA 94107, États-Unis<br />
                Site : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline">cloudflare.com</a>
              </p>
            </article>

            {/* 4. Propriété intellectuelle */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-6">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4" style={{ fontWeight: 500 }}>
                <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm">4</span>
                Propriété intellectuelle
              </h2>
              <div className="space-y-4 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>
                  Sauf mention contraire, l'ensemble des contenus présents sur le site flowdee.fr, notamment les textes, éléments graphiques, interfaces, illustrations, photographies, logos, icônes, créations, études de cas et éléments de design, sont protégés par les dispositions applicables en matière de propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, adaptation, diffusion ou exploitation, totale ou partielle, de ces contenus sans autorisation préalable écrite de Flowdee est interdite, sauf dans les cas autorisés par la loi.
                </p>
                <p>
                  Les marques, logos, illustrations ou contenus appartenant à des tiers restent la propriété de leurs titulaires respectifs.
                </p>
              </div>
            </article>

            {/* 5. Contact */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-4">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4" style={{ fontWeight: 500 }}>
                <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm">5</span>
                Contact
              </h2>
              <div className="space-y-3 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>
                  Pour toute demande concernant le site : <a href="mailto:contact@flowdee.fr" className="text-accent-primary hover:underline">contact@flowdee.fr</a>
                </p>
                <p>
                  Pour toute question relative aux données personnelles, consultez la{' '}
                  <Link to="/politique-de-confidentialite" className="text-accent-primary hover:underline">
                    Politique de confidentialité
                  </Link>.
                </p>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export { MentionsLegalesSection as MentionsLegales };

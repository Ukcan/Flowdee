import image_8d0fbd868add68a87847282f9a6dae596b7a8035 from 'figma:asset/8d0fbd868add68a87847282f9a6dae596b7a8035.jpg';
import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EditableText } from '../Editable/Text';

/**
 * Section/Approach — manifeste signé, décliné en trois principes.
 *
 * La section se lit en trois temps, dans cet ordre de poids visuel :
 *   1. la conviction (déclaration, élément dominant) ;
 *   2. la signature (portrait + identité), qui l'endosse ;
 *   3. les trois principes, sa traduction opérationnelle.
 *
 * Deux partis pris de composition :
 * - La signature est accrochée sous la déclaration, à la même marge de gauche
 *   et sur la même mesure : elle appartient au bloc plutôt que de flotter dans
 *   une colonne voisine.
 * - Les numéros portent seuls le repérage. Les icônes ont été retirées : elles
 *   doublonnaient le rôle du numéro sans rien ajouter, et diluaient le signal
 *   en le partageant entre deux marqueurs minuscules.
 */

const defaultPillars = [
  {
    key: 'conversion',
    title: 'CONVERSION & ACTIVATION',
    description: 'Décisions guidées par des KPIs mesurables. On ne lance pas sans hypothèses testables.',
  },
  {
    key: 'ia-ux',
    title: 'IA + EXPERTISE UX',
    description: 'IA accélère la prod (interviews → JSON structuré). UX décide (heuristiques, tests).',
  },
  {
    key: 'impact',
    title: 'IMPACT MESURABLE',
    description: 'Des résultats orientés conversion, mesurables et vérifiables sur vos KPIs.',
  },
];

export function ApproachSection() {
  return (
    <section
      id="approche"
      /* Ouverture de l'acte "méthode" : respiration large, et container
         resserré — un manifeste se lit sur une mesure étroite, pas sur toute
         la largeur d'une grille. */
      className="section-aurora py-28 md:py-40 relative overflow-hidden border-t border-border-0"
      aria-labelledby="approach-title"
    >
      <div className="max-w-[980px] mx-auto px-8 md:px-16 relative z-10">
        {/* ── 1. Conviction ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Le label reste le titre sémantique de la section, mais la
              déclaration ci-dessous porte tout le poids visuel. */}
          <h2 id="approach-title">
            <EditableText
              contentKey="approach.title"
              defaultValue="MON APPROCHE"
              as="span"
              className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted"
            />
          </h2>

          {/* Mesure bornée sur le texte lui-même et non sur le blockquote :
              l'unité `ch` se résout d'après la police de l'élément qui la
              porte, donc d'après le corps d'affichage et non les 16px hérités
              — sans quoi la déclaration se retrouvait comprimée sur ~275px. */}
          <blockquote className="mt-7">
            <EditableText
              contentKey="approach.quote"
              defaultValue={`"Des insights, oui. Mais surtout : des choix clairs, des parcours fluides, des résultats."`}
              as="p"
              className="font-display text-[30px] sm:text-[38px] md:text-[46px] font-light text-text-primary leading-[1.12] tracking-[-0.02em] text-balance max-w-[17ch] sm:max-w-[19ch] md:max-w-[21ch]"
              multiline
            />
          </blockquote>
        </motion.div>

        {/* ── 2. Signature ──────────────────────────────────────────────
            Accrochée sous la déclaration, même marge de gauche : le portrait
            endosse le propos au lieu de flotter à côté. */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex items-center gap-5"
        >
          <div className="w-[88px] h-[88px] shrink-0 rounded-[20px] overflow-hidden border border-border-0">
            <ImageWithFallback
              src={image_8d0fbd868add68a87847282f9a6dae596b7a8035}
              alt="Benjamin, Lead UX/UI Designer chez Flowdee"
              className="w-full h-full object-cover object-top grayscale"
            />
          </div>

          {/* Deux niveaux seulement : qui, puis sur quoi. L'empilement
              précédent fragmentait la même information sur quatre lignes
              capitales, sans hiérarchie lisible. */}
          <figcaption className="min-w-0">
            <EditableText
              contentKey="approach.author"
              defaultValue="Benjamin, Lead UX/UI Designer"
              as="p"
              className="font-heading text-[16px] md:text-[17px] font-medium text-text-primary tracking-[-0.01em]"
            />
            {/* "UX" retiré : tout le monde ne sait pas ce que c'est, alors
                que "Expert Performance" seul dit directement le bénéfice
                (revue Adel × Benji du 2026-08-18). */}
            <EditableText
              contentKey="approach.authorRole"
              defaultValue="EXPERT PERFORMANCE"
              as="p"
              className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-accent-primary mt-1.5"
            />
          </figcaption>
        </motion.figure>

        {/* ── 3. Principes ──────────────────────────────────────────────
            Le filet et la respiration marquent le passage de la conviction à
            sa traduction concrète : une rupture voulue, pas un simple écart. */}
        <div className="mt-16 md:mt-20 border-t border-border-0">
          {defaultPillars.map((pillar, index) => (
            <motion.article
              key={pillar.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="grid grid-cols-[56px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)] gap-x-5 md:gap-x-10 py-9 md:py-11 border-b border-border-0"
            >
              {/* Le numéro devient le repère de chapitre : assez grand pour
                  structurer la lecture à lui seul, mais tenu sous le corps de
                  la déclaration — c'est elle qui doit rester dominante. */}
              <span
                aria-hidden="true"
                className="font-display text-[26px] md:text-[40px] font-light leading-[0.85] tracking-[-0.02em] text-accent-primary tabular-nums"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0">
                <EditableText
                  contentKey={`approach.pillar.${pillar.key}.title`}
                  defaultValue={pillar.title}
                  as="h3"
                  className="font-heading text-[19px] md:text-[22px] font-medium text-text-primary tracking-[0.01em] leading-[1.3]"
                />
                <EditableText
                  contentKey={`approach.pillar.${pillar.key}.desc`}
                  defaultValue={pillar.description}
                  as="p"
                  className="font-body text-[15px] leading-[1.7] text-text-secondary mt-3 max-w-[54ch]"
                  multiline
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

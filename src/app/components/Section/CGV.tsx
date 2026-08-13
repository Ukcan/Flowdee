import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft } from '@phosphor-icons/react';

/**
 * Section/CGV Component
 * Nomenclature Figma: Section/CGV
 * Conditions Générales de Vente
 */

interface CGVSectionProps {
  onClose: () => void;
}

export function CGVSection({ onClose }: CGVSectionProps) {
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
              aria-label="Fermer les CGV"
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
              Conditions Générales <br/><span className="text-accent-primary">de Vente</span>
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-accent-primary" />
              <p className="font-body font-medium text-sm uppercase tracking-widest text-accent-primary">
                CCI Provence-Alpes-Côte d'Azur
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-surface-0 p-10 rounded-3xl border border-border-0 shadow-panel">
            <p className="font-body text-[16px] leading-relaxed text-text-primary/90">
              Les présentes conditions générales de vente (CGV) s'appliquent aux prestations de services fournies par la Chambre de Commerce et d'Industrie (CCI) Provence-Alpes-Côte d'Azur (incluant l'offre CCI International Provence-Alpes-Côte d'Azur) conformément à l'article 1110 alinéa 2 du Code Civil. La CCI Provence-Alpes-Côte d'Azur et les Clients sont désignés individuellement par « la Chambre de Commerce et d'Industrie de région Provence-Alpes-Côte d'Azur » ou « la CCI Provence-Alpes-Côte d'Azur » et « le Client » ou « les Clients » et collectivement par « les parties » ou « partie ».
            </p>
          </div>

          {/* Articles */}
          <div className="space-y-16">
            {/* Article 1 */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-8">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4" style={{ fontWeight: 500 }}>
                <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm">1</span>
                Objet - Nature du Contrat
              </h2>
              <div className="space-y-6 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>
                  <strong className="text-text-primary font-bold">1.1.</strong> Les présentes CGV, conformément à l'article L 441-6 du Code de Commerce, ont pour objet de fixer les conditions dans lesquelles la CCI Provence-Alpes-Côte d'Azur fournit à ses clients, des prestations de services, dont notamment, des prestations de services fournies dans le cadre de l'accompagnement individuel "Appui individuel" (études, conseils, prospections commerciales, etc.) ; des prestations de services fournies dans le cadre de l'accompagnement collectif "Action collective" (formations, réunions d'information, séminaires, salons, rencontres d'affaires, rencontres d'acheteurs, etc).
                </p>
                <p>
                  <strong className="text-text-primary font-bold">1.2.</strong> Les prestations de services de la CCI Provence-Alpes-Côte d'Azur s'adressent à des clients professionnels, personnes physiques ou morales de droit privé ou de droit public dont, notamment (liste non-exhaustive) "Clients" : entreprises, collectivités, organismes professionnels, clusters, syndicats, établissements consulaires, pôles de compétitivité, associations, etc.
                </p>
                <p>
                  <strong className="text-text-primary font-bold">1.3.</strong> Les Clients de la CCI Provence-Alpes-Côte d'Azur ne peuvent donc pas se prévaloir des dispositions du Code de la consommation, en particulier d'un quelconque droit de rétractation. Le client reconnait expressément que le présent contrat constitue un contrat d'adhésion au sens de l'article 1110 alinéa 2 du Code Civil, qui comporte un ensemble de clauses non négociables, déterminées à l'avance par la CCI Provence-Alpes-Côte d'Azur.
                </p>
                <p>
                  <strong className="text-text-primary font-bold">1.4.</strong> La signature du bon de commande ou du bulletin d'inscription vaut acceptation par le client des présentes Conditions Générales de Vente.
                </p>
                <p>
                  <strong className="text-text-primary font-bold">1.5.</strong> Les dispositions des présentes CGCV relatives aux prestations de la CCI Provence-Alpes-Côte d'Azur, à l'international notamment celles figurant aux articles 10.2, 14.10, 17.5, sont des prestations d'intermédiaire, ou de mandataire telles que régies notamment par les articles 1153 à 1121, 1988, 1989 et 1998 du Code Civil relatifs au contrat de représentation et de mandat, ainsi que notamment par l'article 267.II.2 du Code Général des Impôts.
                </p>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-8">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4" style={{ fontWeight: 500 }}>
                <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm">2</span>
                Conditions Générales - Champ contractuel
              </h2>
              <div className="space-y-6 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>
                  <strong className="text-text-primary font-bold">2.1.</strong> Les présentes CGV pourront éventuellement être complétées par les conditions particulières de vente, selon le type de prestation envisagé par la CCI Provence-Alpes-Côte d'Azur, prévues dans les documents transmis par la CCI Provence-Alpes-Côte d'Azur aux Clients à titre d'offre commerciale, ou figurant sur le site internet de la CCI Provence-Alpes-Côte d'Azur (« Conditions Particulières ») notamment : devis, fiche produit et/ou bon de commande, document de présentation.
                </p>
                <p>
                  <strong className="text-text-primary font-bold">2.2.</strong> Les présentes CGV ainsi que les Conditions Particulières expriment l'intégralité de l'accord entre la CCI Provence-Alpes-Côte d'Azur et le Client. Les parties ne pourront donc se prévaloir d'aucun autre document, contrat ou échange antérieurs à la signature du bon de commande ou du bulletin d'inscription.
                </p>
                <p>
                  <strong className="text-text-primary font-bold">2.3.</strong> En cas de contradiction entre les Conditions Particulières et les présentes CGV, les dispositions des Conditions Particulières priment. En cas de contradiction avec tout document émis par le Client, notamment ses conditions générales d'achat, les présentes CGV et les Conditions Particulières priment.
                </p>
                <p>
                  <strong className="text-text-primary font-bold">2.4.</strong> Dans le cas où l'une quelconque des dispositions des présentes CGV serait déclarée nulle ou non écrite par un tribunal compétent, les autres dispositions resteront intégralement en vigueur et seront interprétées de façon à respecter l'intention originelle des parties. La CCI Provence-Alpes-Côte d'Azur peut modifier à tout moment les présentes CGV. Les CGV applicables sont celles qui sont consultables en ligne sur le site internet de la CCI Provence-Alpes-Côte d'Azur au moment de la commande. Le Client en prend connaissance et les accepte, sans réserve, en signant le bon de commande ou le bulletin d'inscription. Le Client reconnaît avoir sollicité et reçu toute l'information nécessaire et/ou complémentaire pour passer sa commande en toute connaissance de cause. Le Client reconnait expressément que la CCI Provence-Alpes-Côte d'Azur a pleinement rempli envers lui son devoir général d'information précontractuelle en application des articles 1112 et suivants du code civil et l'a informé de ses obligations de confidentialité en application de l'article 1112-2 dudit code.
                </p>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
import React, { useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, PhoneCall, ArrowRight, CaretDown } from '@phosphor-icons/react';
import { ParallaxHeading } from '../Decor/ParallaxHeading';
import { useTranslation } from '../../contexts/LanguageContext';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';
import { CALENDAR_LINK, openAuditLink } from '../../constants/links';
import { CTA } from '../../constants/offer';

interface ServiceData {
  plan: string;
  timeline: string;
  title: string;
  price: string;
  description: string;
  forWho: string;
  deliverables: string[];
  /** Precisions repliees. Vide ou absent : aucun depliant n'est rendu. */
  details?: string[];
  ctaPrimaryLabel: string;
  ctaPrimaryAction: 'contact' | 'calendar' | 'audit';
  ctaSecondaryLabel: string;
  ctaSecondaryAction: 'contact' | 'caseStudies' | 'calendar';
  featured: boolean;
  /** Quelle carte porte le bouton plein. Distinct de `featured`, qui ne
   *  gouverne que le badge et les accents de couleur : l'offre mise en
   *  avant visuellement n'est pas forcement l'action prioritaire du site. */
  emphasis: 'primary' | 'secondary';
  microProof: string;
}

/**
 * Nombre de livrables laissés sur la carte fermée.
 *
 * La carte doit tenir en entier dans l'écran : c'est la condition pour que les
 * trois offres se comparent d'un regard, ce qui est tout l'intérêt d'une
 * section de tarifs. Trois livrables suffisent à situer l'offre ; le reste
 * relève de la vérification et attend dans le dépliant.
 */
const VISIBLE_DELIVERABLES = 3;

/**
 * Dépliant de précisions d'une carte d'offre.
 *
 * La carte portait toutes les précisions d'un bloc : la liste des livrables
 * pesait à elle seule 272px parce que deux libellés couraient sur deux et trois
 * lignes. Les replier ne retire rien du site — elles restent sur la carte, à un
 * clic, au lieu d'arriver toutes en même temps au moment où le visiteur compare
 * trois offres.
 *
 * Trois points d'attention sur l'implémentation :
 *
 * - L'ouverture anime `grid-template-rows` de `0fr` à `1fr`. C'est ce qui
 *   permet d'animer vers une hauteur *automatique* : ni mesure du contenu en
 *   JavaScript, ni hauteur figée en dur qui casserait au premier changement de
 *   texte ou de largeur.
 * - `visibility` accompagne la transition. Elle bascule de façon discrète —
 *   immédiatement à `visible` à l'ouverture, seulement en fin de transition à
 *   `hidden` — ce qui sort le contenu replié de l'ordre de tabulation et de
 *   l'arbre d'accessibilité sans le faire disparaître avant la fin du repli.
 * - `prefers-reduced-motion` coupe la transition : le contenu apparaît d'un
 *   coup, sans mouvement de hauteur.
 */
function CardDetails({
  deliverables,
  forWho,
  details,
  open,
  onToggle,
}: {
  deliverables: readonly string[];
  forWho?: string;
  details?: readonly string[];
  /* État remonté à la section : la grille doit savoir qu'une carte est
     ouverte pour cesser d'étirer les autres (voir `anyOpen` plus bas). */
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();

  if (!deliverables.length && !forWho && !details?.length) return null;

  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="
          inline-flex items-center gap-1.5 min-h-[44px]
          font-body text-[13px] font-medium text-text-secondary
          hover:text-text-primary transition-colors rounded
          outline-none focus-visible:ring-2 focus-visible:ring-focus-ring
          focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0
        "
      >
        {open ? 'Masquer le détail' : 'Voir tout le détail'}
        <CaretDown
          size={13}
          weight="bold"
          aria-hidden="true"
          className={`${reduce ? '' : 'transition-transform duration-300 ease-out'} ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id={panelId}
        className={`grid ${reduce ? '' : 'transition-[grid-template-rows] duration-300 ease-out'} ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div
          className={`overflow-hidden ${reduce ? '' : 'transition-[visibility] duration-300'} ${open ? 'visible' : 'invisible'}`}
        >
          <div className="mt-2 border-t border-border-0 pt-4 space-y-4">
            {/* Suite des livrables — même traitement que ceux restés visibles :
                ce sont les mêmes éléments, seule leur place change. */}
            {deliverables.length > 0 && (
              <ul className="space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-accent-primary/10 text-accent-primary"
                    >
                      <Check size={12} weight="bold" />
                    </span>
                    <span className="font-body text-[14px] text-text-secondary font-normal">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {forWho && (
              <p className="font-body text-[12px] text-text-muted font-normal border-l border-border-1 pl-4">
                {forWho}
              </p>
            )}

            {details && details.length > 0 && (
              <ul className="space-y-2.5">
                {details.map((d) => (
                  <li key={d} className="font-body text-[12px] leading-[1.6] text-text-muted">
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { t } = useTranslation();

  /* Quelles cartes ont leur détail déplié.
     Cet état vit ici, et non dans chaque dépliant, parce que la grille en
     dépend : tant que tout est replié, elle étire les cartes à hauteur égale
     — c'est ce qui garantit des bas de cartes alignés même si un contenu
     s'allonge un jour. Dès qu'un détail s'ouvre, l'étirement devient nuisible :
     il imposait la hauteur de la carte ouverte aux deux autres, qui se
     retrouvaient avec 400px de vide. La grille repasse alors en `items-start`,
     et seule la carte ouverte grandit. */
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const anyOpen = Object.values(openCards).some(Boolean);
  const toggleCard = (plan: string) =>
    setOpenCards((prev) => ({ ...prev, [plan]: !prev[plan] }));

  const services: ServiceData[] = [
    {
      plan: 'Audit',
      /* Le delai apparaissait ici sous une troisieme forme (« 3–5 jours »),
         alors que la carte l'annonce deja plus bas. Une seule formulation. */
      timeline: 'SOUS 5\u00A0JOURS OUVRÉS',
      title: 'Audit UX & Conversion',
      price: '890\u00A0€',
      /* Cette description courait sur 5 lignes contre 3 pour les deux autres
         cartes : 51px d'ecart, absorbes en vide sous la liste, d'ou le bas de
         carte en escalier. Le perimetre reste annonce juste au-dessus du bouton
         d'achat (micro-preuve) et detaille dans le depliant. */
      description: 'Les problèmes qui bloquent vos conversions, priorisés, et les corrections à appliquer.',
      forWho: 'Pour\u00A0: une landing page, un onboarding, un checkout ou un parcours critique.',
      deliverables: [
        'Problèmes UX priorisés',
        'Recommandations actionnables',
        'Contrôles SEO UX & accessibilité',
        'Microcopy prioritaire réécrite',
        '1 écran clé corrigé dans Figma',
        'Rapport final priorisé',
      ],
      /* Precisions repliees : ce sont elles qui alourdissaient la carte,
         et elles servent a verifier une fois le choix fait, pas a choisir. */
      details: [
        'Périmètre : un parcours critique, une landing page ou jusqu’à 5\u00A0écrans/pages. Pour un site plus large, le parcours ayant le plus d’impact est priorisé.',
        'Accessibilité : repérage des principaux écarts WCAG\u00A02.2\u00A0AA sur le périmètre audité — contrastes, focus, clavier, labels, alternatives textuelles et cibles interactives.',
        'SEO UX : titres, structure des contenus, libellés et lisibilité — Hn, title, meta.',
        'Microcopy : titres, CTA, aides, erreurs, réassurances et FAQ du périmètre audité.',
        'Démarrage confirmé sous 24\u00A0h après réception des éléments nécessaires.',
      ],
      ctaPrimaryLabel: CTA.audit,
      ctaPrimaryAction: 'audit',
      /* Ouvrait le meme calendrier que « Reserver un appel — 30 min »
         ailleurs sur la page : deux libelles pour une seule action. */
      ctaSecondaryLabel: CTA.call,
      ctaSecondaryAction: 'calendar',
      featured: false,
      emphasis: 'primary',
      /* Le delai figurait ici et en surtitre : deux fois la meme
         information sur une carte de 900px. */
      microProof: 'Jusqu\u2019à 5\u00A0écrans/pages\u00A0\u2022\u00A0Paiement sécurisé',
    },
    {
      plan: 'Sprint',
      timeline: '2\u00A0SEMAINES',
      title: 'Product Sprint + Tests',
      price: '3\u00A0900\u00A0€',
      description: 'Testez et validez votre parcours critique avec de vrais utilisateurs, avant d\u2019engager votre budget dev.',
      forWho: 'Pour\u00A0: une feature clé, un onboarding, un checkout ou un dashboard.',
      deliverables: [
        'Cadrage + user flow',
        'Wireframes + prototype interactif',
        'Tests avec 5 utilisateurs + itération',
        'UI finale + transmission Figma aux dev',
      ],
      /* Le bouton principal ne disait pas de quoi on allait parler : les
         trois offres portaient le meme « Reserver un appel ». */
      ctaPrimaryLabel: CTA.sprint,
      ctaPrimaryAction: 'calendar',
      ctaSecondaryLabel: CTA.caseStudy,
      ctaSecondaryAction: 'caseStudies',
      featured: true,
      emphasis: 'secondary',
      microProof: 'Prototype testé et itéré\u00A0\u2022\u00A05\u00A0utilisateurs',
    },
    {
      plan: 'Partner',
      timeline: 'MENSUEL',
      title: 'Fractional Product Designer',
      price: 'Dès 2\u00A0200\u00A0€/mois',
      description: 'Une capacité Product Design dédiée chaque mois, sans les coûts ni les délais d’un recrutement.',
      forWho: 'Pour\u00A0: concevoir, tester et améliorer votre produit en continu.',
      deliverables: [
        'UX/UI & conception de features',
        'Tests utilisateurs & optimisation',
        'Design System & composants',
        'Transmission aux dev & documentation',
      ],
      /* Version courte : le mot « mensuel » est deja porte par le surtitre
         et par le prix. Sur deux lignes, ce bouton desalignait le bas des
         trois cartes. */
      ctaPrimaryLabel: CTA.fractionalShort,
      ctaPrimaryAction: 'calendar',
      /* « Demander un devis » descendait au formulaire alors que le prix est
         affiche. Bascule ensuite sur l'appel, la carte s'est retrouvee avec
         deux boutons ouvrant le meme calendrier — deux chemins pour une seule
         action, ce que la taxonomie doit justement empecher. Le secondaire
         reprend le schema de la carte Sprint : parler de l'offre d'un cote,
         voir la preuve de l'autre. */
      ctaSecondaryLabel: CTA.caseStudy,
      ctaSecondaryAction: 'caseStudies',
      featured: false,
      emphasis: 'secondary',
      microProof: '4\u00A0jours/mois réservés\u00A0\u2022\u00A0Engagement flexible',
    },
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCaseStudies = () => {
    const element = document.getElementById('case-studies');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSecondaryAction = (action: ServiceData['ctaSecondaryAction'], context?: string) => {
    switch (action) {
      case 'caseStudies':
        scrollToCaseStudies();
        break;
      case 'calendar':
        window.dispatchEvent(new CustomEvent('flowdee:open-calendar', { detail: context ? { context } : undefined }));
        break;
      case 'contact':
      default:
        scrollToContact();
        break;
    }
  };

  return (
    <section
      id="services"
      className="services-blueprint-section relative py-24 md:py-32 overflow-hidden bg-bg-base border-t border-border-0"
      aria-label="Offres et tarifs"
    >
      {/* Container resserré face à Deliverables (1320) : la comparaison se lit
          mieux cadrée, et le changement de largeur marque la frontière. */}
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 relative z-10">
        {/* Section title */}
        <div className="flex flex-col items-center mb-16">
          <ParallaxHeading>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="heading-1 text-center text-text-primary mt-4"
            >
              {t.services.title}
            </motion.h2>
          </ParallaxHeading>

          {/* Les trois offres se lisaient comme trois produits posés côte à
              côte, sans indiquer lequel vient quand. Cette ligne donne l'ordre
              — identifier, puis concevoir et tester, puis accompagner — sans
              ouvrir une section de plus. */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-[15px] md:text-[16px] leading-[1.7] text-text-secondary text-center max-w-[680px] mx-auto mt-5"
          >
            Trois étapes qui s’enchaînent : l’<strong className="font-medium text-text-primary">audit</strong> identifie
            et priorise, le <strong className="font-medium text-text-primary">Product Sprint</strong> conçoit, teste et
            corrige, le <strong className="font-medium text-text-primary">Fractional Product Designer</strong> accompagne
            l’équipe dans la durée. Chacune se prend seule.
          </motion.p>
        </div>

        {/* Cards grid — 3 columns desktop, 2 tablet, 1 mobile */}
        <div className={`services-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7 mb-16 ${anyOpen ? 'items-start' : 'items-stretch'}`}>
          {services.map((service, index) => {
            const isFeatured = service.featured;

            return (
              <motion.div
                key={service.plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  card-surface services-card flex flex-col relative transition-all duration-200 p-7 lg:p-8
                  ${isFeatured
                    ? 'bg-surface-0 border-accent-primary/40'
                    : 'bg-surface-0 border-border-0'
                  }
                `}
              >
                {/* Le badge annonçait « Offre recommandée » sur le Product
                    Sprint, alors que tout le haut de page pousse l'Audit comme
                    point d'entrée : le visiteur recevait deux recommandations
                    contradictoires, sans qu'aucune n'explique pourquoi.
                    Il indique désormais à quel moment l'offre correspond — une
                    information, plus une préférence non justifiée. */}
                {isFeatured && (
                  <div className="absolute top-3 right-3">
                    <span
                      className="
                        inline-flex items-center gap-1.5
                        font-body text-[10px] px-2.5 py-1
                        bg-surface-0/60 backdrop-blur-sm text-accent-primary border border-accent-primary/20
                        font-medium whitespace-nowrap tracking-[0.04em] normal-case
                        rounded-full
                      "
                    >
                      Pour concevoir + tester
                    </span>
                  </div>
                )}

                {/* Timeline eyebrow — muted by default; accent stays punctual, reserved for the recommended card */}
                <div className="mb-6">
                  <span className={`font-body text-[12px] font-medium uppercase tracking-[0.2em] ${isFeatured ? 'text-accent-primary' : 'text-text-muted'}`}>
                    {service.timeline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-[24px] lg:text-[28px] text-text-primary mb-3 tracking-[-0.01em]" style={{ fontWeight: 400 }}>
                  {service.title}
                </h3>

                {/* Price — accent anchor on the recommended card only, standard cards read as primary text */}
                <div className={`font-display text-[20px] lg:text-[22px] tracking-[-0.01em] ${isFeatured ? 'text-accent-primary' : 'text-text-primary'}`} style={{ fontWeight: 300 }}>
                  {service.price}
                </div>

                {/* TVA annoncée près du prix, pas seulement aux CGV : un
                    acheteur professionnel doit savoir avant de payer qu'il ne
                    récupérera pas de TVA. */}
                <p className="font-body text-[11px] text-text-muted mb-5">
                  TVA non applicable, art. 293 B du CGI
                </p>

                {/* Description */}
                <p className="body mb-4">
                  {service.description}
                </p>

                {/* Livrables — les premiers seulement. La carte doit tenir en
                    entier dans l'écran pour que les trois offres se comparent ;
                    le reste part dans le dépliant, sur la carte, pas ailleurs. */}
                <div className="space-y-3 mb-5 flex-grow">
                  {service.deliverables.slice(0, VISIBLE_DELIVERABLES).map((deliverable, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="
                          w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                          bg-accent-primary/10 text-accent-primary
                        "
                      >
                        <Check size={12} weight="bold" />
                      </div>
                      <span className="font-body text-[14px] text-text-secondary font-normal">
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tout le détail de l'offre : les livrables restants, à qui
                    elle s'adresse, et les précisions de périmètre. */}
                <CardDetails
                  deliverables={service.deliverables.slice(VISIBLE_DELIVERABLES)}
                  forWho={service.forWho}
                  details={service.details}
                  open={!!openCards[service.plan]}
                  onToggle={() => toggleCard(service.plan)}
                />

                {/* Micro-proof */}
                <p
                  className="font-body text-[12px] text-text-muted font-normal tracking-[0.02em] mb-5"
                  aria-label="Preuve de livraison"
                >
                  {service.microProof}
                </p>

                {/* CTA area — single primary button + secondary link */}
                <div className="flex flex-col gap-3 mt-auto">
                  {/* Primary action — gold solid only on the recommended card;
                      standard cards use the secondary style so the three CTAs
                      don't compete visually. Text, destination, size unchanged. */}
                  {service.emphasis === 'primary' ? (
                    <ButtonPrimary
                      onClick={
                        service.ctaPrimaryAction === 'calendar'
                          ? () => window.dispatchEvent(new CustomEvent('flowdee:open-calendar', { detail: { context: service.title } }))
                          : service.ctaPrimaryAction === 'audit'
                          ? () => openAuditLink()
                          : scrollToContact
                      }
                      size="m"
                      /* « Parler de l'accompagnement mensuel » depassait du
                         bouton et se coupait en plein mot. Le texte peut
                         desormais revenir a la ligne, la hauteur suit — plutot
                         que de rogner un libelle deja fixe par la taxonomie. */
                      className="w-full px-3 sm:px-5 min-h-[48px] h-auto py-2.5 whitespace-normal text-center leading-tight text-[14px] sm:text-[15px]"
                      aria-label={service.ctaPrimaryLabel}
                    >
                      {service.ctaPrimaryLabel}
                    </ButtonPrimary>
                  ) : (
                    <ButtonSecondary
                      onClick={
                        service.ctaPrimaryAction === 'calendar'
                          ? () => window.dispatchEvent(new CustomEvent('flowdee:open-calendar', { detail: { context: service.title } }))
                          : service.ctaPrimaryAction === 'audit'
                          ? () => openAuditLink()
                          : scrollToContact
                      }
                      size="m"
                      /* « Parler de l'accompagnement mensuel » depassait du
                         bouton et se coupait en plein mot. Le texte peut
                         desormais revenir a la ligne, la hauteur suit — plutot
                         que de rogner un libelle deja fixe par la taxonomie. */
                      className="w-full px-3 sm:px-5 min-h-[48px] h-auto py-2.5 whitespace-normal text-center leading-tight text-[14px] sm:text-[15px]"
                      aria-label={service.ctaPrimaryLabel}
                    >
                      {service.ctaPrimaryLabel}
                    </ButtonSecondary>
                  )}

                  {/* Secondary — text link, not button */}
                  <button
                    type="button"
                    onClick={() => handleSecondaryAction(service.ctaSecondaryAction, service.title)}
                    className="
                      group/link inline-flex items-center justify-center gap-1.5
                      min-h-[44px] px-2
                      font-body text-[13px] font-normal
                      text-text-secondary bg-transparent border-0
                      hover:text-text-primary hover:underline hover:underline-offset-4
                      transition-all duration-200
                      outline-none
                      focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0
                      rounded-md
                    "
                    aria-label={service.ctaSecondaryLabel}
                  >
                    <span className="text-text-primary">{service.ctaSecondaryLabel}</span>
                    <ArrowRight
                      size={14}
                      className="text-text-primary transition-transform duration-200 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clôture unique : indécision + partenariat long-terme menaient toutes
            deux à "réserver un appel" — un seul bloc plutôt que deux prompts
            empilés au poids visuel identique, pour clarifier la hiérarchie. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative text-center mt-4 p-10 rounded-[24px] bg-accent-bg border border-accent-border shadow-panel hover:border-accent-primary/50 transition-all duration-300 hover:scale-[1.01] group"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Groupe 1 — message : icone + label court + phrase de valeur concrete */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary/15 border border-accent-border group-hover:bg-accent-primary/25 transition-all duration-300">
                <PhoneCall weight="duotone" className="w-5 h-5 text-accent-primary" />
              </div>
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
                Pas encore décidé ?
              </span>
              <p className="font-body text-[16px] text-text-primary font-medium max-w-md">
                Un appel de 30 minutes suffit pour trouver la bonne formule — audit, sprint, ou partenariat continu.
              </p>
            </div>
            {/* Groupe 2 — action */}
            <a
              href={CALENDAR_LINK}
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('flowdee:open-calendar')); }}
              rel="noopener noreferrer"
              className="group/pri relative !overflow-hidden inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-[var(--radius-button)] bg-accent-primary text-on-accent border-[1.5px] border-transparent hover:!border-accent-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              aria-label="Réserver mes 30 minutes découverte"
            >
              {/* Hover BG (wave overlay) — same as ButtonPrimary */}
              <span className="absolute inset-0 invisible translate-y-full opacity-0 group-hover/pri:visible group-hover/pri:translate-y-0 group-hover/pri:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                <svg
                  className="absolute bottom-full left-0 w-full"
                  style={{ height: '10px' }}
                  viewBox="0 0 500 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,12 C60,12 100,0 250,4 C400,8 440,12 500,12 L500,12 Z"
                    fill="var(--accent-hover)"
                  />
                </svg>
                <div className="w-full h-full" style={{ backgroundColor: 'var(--accent-hover)' }} />
              </span>
              <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-200">
                <PhoneCall weight="duotone" className="w-4 h-4" />
                <span className="font-body text-[14px]">Réserver mes 30 minutes</span>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { ServicesSection as Services };

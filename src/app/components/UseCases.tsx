import neurolaboAnalysesWireframe from '../../assets/neurolabo-analyses-wireframe.jpg';
import neurolaboAnalysesOptimise from '../../assets/neurolabo-analyses-optimise.jpg';
import neurolaboAnalysesWireframeWebp from '../../assets/neurolabo-analyses-wireframe.webp';
import neurolaboAnalysesOptimiseWebp from '../../assets/neurolabo-analyses-optimise.webp';
import React, { useState, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowsHorizontal, X } from '@phosphor-icons/react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';
import { ctaButtonVariants } from './Button/CTA';
import { cn } from './ui/utils';
import { SectionHeader } from './Layout/SectionHeader';
import { CTA } from '../constants/offer';
import { FEATURED_CASE, FEATURED_CASE_COMPARE_IMAGES, OTHER_CASE_STUDIES } from '../constants/caseStudies';

// Contenu réel des études de cas : source de vérité dans constants/caseStudies.ts,
// partagée avec les pages dédiées /etudes-de-cas/:slug.
const featuredCase = FEATURED_CASE;
const otherUseCases = OTHER_CASE_STUDIES;

/**
 * Étude de cas phare — une entrée par PUBLIC, pas par étape.
 *
 * Le détail se lisait en trois colonnes (Problème / Mon action / Ce qui a
 * changé), c'est-à-dire dans la forme d'un comparatif alors qu'il s'agit d'une
 * chaîne causale. Le contenu, lui, ne compte pas trois parties mais deux
 * personnes : `FEATURED_CASE.metrics` les nomme déjà — « côté étudiant »,
 * « côté professeur ». Chaque ligne suit donc une personne de gauche à droite.
 *
 * Rien n'est inventé ici : chaque phrase provient du bloc précédent, replacée
 * sous la personne qu'elle concerne. Le résultat final n'est pas recopié, il
 * est lu dans `metrics` — c'est cette étiquette qui a révélé la structure, et
 * la source doit rester unique.
 */
const VOIX = [
  {
    qui: 'L’élève',
    role: 'Lycéen → Universitaires',
    avant: 'Apprentissage passif et déconnecté. L’intérêt retombe, le distanciel n’arrange rien.',
    actions: [
      'Gamification UX : récompenses et progression',
      'Interface immersive multi-supports (BYOD)',
    ],
    metric: 0,
  },
  {
    qui: 'Le professeur',
    role: 'Suivi de promotion',
    avant: 'Correction manuelle, chronophage. Les blocages d’une promotion ne se voient qu’après coup.',
    actions: [
      'Dashboard : notes et analytics automatisés',
      'IA : analyse prédictive des blocages pédagogiques',
    ],
    metric: 1,
  },
] as const;

// Écrans comparables (avant/après). Pour ajouter un slot, ajoute une entrée ici
// avec son wireframe (before) et sa version finale (after).
const compareScreens = [
  {
    label: 'Catalogue',
    sublabel: 'Liste des simulations',
    before: FEATURED_CASE_COMPARE_IMAGES.before,
    beforeWebp: FEATURED_CASE_COMPARE_IMAGES.beforeWebp,
    after: FEATURED_CASE_COMPARE_IMAGES.after,
    afterWebp: FEATURED_CASE_COMPARE_IMAGES.afterWebp,
  },
  {
    label: 'Analyses',
    sublabel: 'Heatmap & débriefing',
    before: neurolaboAnalysesWireframe,
    beforeWebp: neurolaboAnalysesWireframeWebp,
    after: neurolaboAnalysesOptimise,
    afterWebp: neurolaboAnalysesOptimiseWebp,
  },
];

/**
 * Comparateur avant/après.
 *
 * Le curseur ne se pilotait qu'au pointeur : aucun élément focusable, aucun
 * rôle, aucune valeur exposée. Au clavier ou au lecteur d'écran, le composant
 * n'existait pas, et les deux images restaient à moitié masquées sans moyen de
 * révéler l'autre.
 *
 * Un `input type="range"` transparent recouvre la zone. Il apporte d'un coup le
 * clavier (flèches, Origine/Fin), le glisser natif au doigt comme à la souris,
 * et la sémantique attendue — plutôt qu'une réimplémentation partielle en
 * `role="slider"`.
 *
 * Le volet se pilotait AUSSI au survol, via `onMouseMove`/`onTouchMove` sur le
 * conteneur : le rideau suivait le curseur sans qu'on ait rien à presser, et
 * comme les événements souris remontent de l'input vers ce conteneur, ce survol
 * écrasait le glisser natif — impossible de relâcher pour figer une comparaison,
 * ni de simplement traverser la zone pour lire la page. Ces deux gestionnaires
 * ont été retirés : la commande native est désormais la seule source du geste,
 * donc presser, déplacer, relâcher — et ça s'arrête au relâchement.
 *
 * `step` est fin pour que le glisser reste fluide (1 % ferait des sauts d'une
 * douzaine de pixels sur cette largeur), ce qui rendrait les flèches du clavier
 * inutilisables — d'où `handleKeyDown`, qui leur redonne un pas utile.
 */

/* Les réalisations forment UNE seule suite numérotée : le cas phare prend 01,
   les autres continuent en 02, 03… Passer par une constante évite que le
   décalage se désynchronise si un second cas phare apparaissait un jour. */
const FEATURED_CASE_COUNT = 1;

/* Pas du glisser : assez fin pour être fluide, assez grand pour rester discret. */
const DRAG_STEP = 0.25;
/* Pas au clavier : ~50 pressions pour traverser l'image. */
const KEY_STEP = 2;
const PAGE_STEP = 10;

function BeforeAfterSlider({
  before,
  beforeWebp,
  after,
  afterWebp,
}: {
  before: string;
  beforeWebp?: string;
  after: string;
  afterWebp?: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const rounded = Math.round(sliderPos);

  const clamp = (value: number) => Math.min(100, Math.max(0, value));

  /* Glisser par la poignée. Ce n'est PAS le retour du survol qui avait été
     retiré (voir la note ci-dessus) : là, le rideau suivait le curseur sans
     qu'on presse rien, depuis le conteneur entier, et écrasait le glisser
     natif. Ici la capture est demandée au pressé sur la seule poignée et
     rendue au relâché — presser, déplacer, relâcher.

     `setPointerCapture` est ce qui rend le geste fiable : le pointeur reste
     lié à la poignée même si le doigt sort de l'image, et le relâchement est
     garanti, y compris hors fenêtre. C'est exactement ce qui manquait à
     l'ancien `onMouseMove` sur window. */
  const setFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setSliderPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onHandlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onHandlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    setFromClientX(e.clientX);
  };

  const onHandlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const steps: Record<string, number> = {
      ArrowLeft: -KEY_STEP,
      ArrowDown: -KEY_STEP,
      ArrowRight: KEY_STEP,
      ArrowUp: KEY_STEP,
      PageDown: -PAGE_STEP,
      PageUp: PAGE_STEP,
    };
    if (e.key in steps) {
      e.preventDefault();
      setSliderPos((pos) => clamp(pos + steps[e.key]));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full aspect-[1600/782] cursor-ew-resize overflow-hidden select-none rounded-[16px] border border-border-0 bg-surface-1 shadow-panel"
    >
      <div className="absolute inset-0">
        <ImageWithFallback src={after} srcWebp={afterWebp} alt="Interface après refonte UX — version corrigée" className="w-full h-full object-cover" />
        {/* Libellé raccourci sous 640px : à 343px de large, les deux pastilles
            se chevauchaient au milieu de l'image et « Avant — wireframe » se
            faisait recouvrir. La mention complète revient dès qu'il y a la
            place. */}
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20">
          <span className="font-body text-[11px] sm:text-[12px] bg-surface-0/75 backdrop-blur-md text-accent-primary border border-accent-primary/30 font-medium px-3 py-1 sm:px-4 sm:py-1.5 uppercase tracking-[0.15em] rounded-full whitespace-nowrap">
            <span className="sm:hidden">Après</span>
            <span className="hidden sm:inline">Après — optimisé</span>
          </span>
        </div>
      </div>
      <div
        className="absolute inset-0 border-r border-accent-primary z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <ImageWithFallback src={before} srcWebp={beforeWebp} alt="Interface avant refonte — version initiale" className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20">
          <span className="font-body text-[11px] sm:text-[12px] bg-surface-0/75 backdrop-blur-md text-text-secondary border border-border-0 font-medium px-3 py-1 sm:px-4 sm:py-1.5 uppercase tracking-[0.15em] rounded-full whitespace-nowrap">
            <span className="sm:hidden">Avant</span>
            <span className="hidden sm:inline">Avant — wireframe</span>
          </span>
        </div>
      </div>
      {/* Poignée — au-dessus de la commande (z-40), et seul endroit de l'image
          qui capte le pointeur. Partout ailleurs le geste continue d'aller à
          l'input, qui garde le clavier, la sémantique et le glisser natif.

          Sur mobile, c'est ce qui rend le glisser fiable : `touch-action: none`
          sur la poignée seule empêche le navigateur de confisquer un geste un
          peu diagonal pour faire défiler la page. Le reste de l'image garde
          `pan-y`, donc la lecture verticale n'est jamais bloquée. */}
      <div
        className="absolute top-0 bottom-0 z-40 flex w-[2px] items-center justify-center bg-accent-primary pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Zone de préhension de 64px autour d'un disque de 44 : la cible
            tactile dépasse largement le visuel au lieu de l'alourdir. 44px est
            aussi le plancher retenu ailleurs dans le projet pour les cibles. */}
        <div
          role="presentation"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
          /* `shrink-0` : le parent ne fait que 2px de large, et flexbox comprimait
             la zone de 64 à 44px — la cible tactile se réduisait au disque. */
          className="pointer-events-auto flex h-16 w-16 shrink-0 cursor-ew-resize items-center justify-center"
          style={{ touchAction: 'none' }}
        >
          {/* Accent plein plutôt qu'une surface translucide : la poignée se
              superpose à deux images quelconques, l'une claire l'autre sombre.
              Un fond de surface se fondait dans le côté sombre. La paire
              --accent-primary / --on-accent est celle que le projet a déjà
              mesurée pour porter du texte, dans les deux thèmes — elle garantit
              le contraste sans dépendre de ce qu'il y a dessous. */}
          <span
            className={cn(
              'flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full',
              'bg-accent-primary border border-[color:var(--on-accent)]/30',
              'transition-[transform,box-shadow] duration-200 ease-out',
              dragging ? 'scale-110 shadow-[0_0_0_7px_var(--accent-ring)]' : 'shadow-panel'
            )}
          >
            {/* Une flèche double dit « ça se tire horizontalement » ; les deux
                filets de 1px d'avant ne disaient rien de la direction. */}
            <ArrowsHorizontal
              size={20}
              weight="bold"
              className="text-[color:var(--on-accent)]"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>

      {/* Commande réelle : invisible, mais focusable et annoncée.
          `touch-action: pan-y` laisse le doigt faire défiler la page
          verticalement — sans quoi le comparateur capturerait le geste et
          bloquerait la lecture sur mobile. */}
      <label htmlFor={inputId} className="sr-only">
        Comparer l’avant et l’après
      </label>
      <input
        id={inputId}
        type="range"
        min={0}
        max={100}
        step={DRAG_STEP}
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        onKeyDown={handleKeyDown}
        aria-valuetext={`${rounded}% de la version initiale visible à gauche, le reste montre la version optimisée`}
        className="peer absolute inset-0 z-30 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 outline-none"
        style={{ touchAction: 'pan-y' }}
      />
      {/* L'anneau de focus se pose sur ce calque : la commande elle-même est
          transparente, elle ne peut pas le porter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[16px] peer-focus-visible:ring-2 peer-focus-visible:ring-focus-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-base"
      />
    </div>
  );
}

export function UseCases() {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [screenIdx, setScreenIdx] = useState(0);
  const screen = compareScreens[screenIdx];
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Featured Case Study Section */}
      <section
        /* L'ancre "case-studies" est portée par cette section et non par la
           grille qui suit : c'est ici que commence l'acte "preuve". Posée plus
           bas, elle faisait sauter l'étude de cas phare aux liens du menu, du
           pied de page et du hero, et laissait l'indicateur de défilement
           annoncer encore "Offres & tarifs" sur près de 1900px déjà consacrés
           aux réalisations. */
        id="case-studies"
        /* Rythme le plus large de la page : ouverture de l'acte "preuve",
           la rupture la plus forte du parcours — seule vraie bascule vers
           l'îlot inverse (Midnight Navy fixe, cf. .theme-inverse) avant celle
           du contact final. Les utilitaires bg-, text-, border- et accent-
           déjà posés plus bas dans cette section héritent automatiquement des
           valeurs sombres via la cascade, sans autre changement de classe. */
        className="theme-inverse bg-bg-base py-32 md:py-44 border-b border-border-1 overflow-hidden relative"
        aria-labelledby="featured-case-title"
      >
        {/* Header — éditorial, aligné à gauche : la section s'annonce, elle ne se centre pas */}
        <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Le numéro ouvre la série et domine son étiquette : il situe le
                lecteur, l'étiquette ne fait que qualifier. Il était à la même
                taille que l'étiquette (12px), soit quatre fois plus petit que
                le titre qu'il était censé repérer. */}
            <p className="flex items-baseline gap-4">
              <span className="text-case-index">01</span>
              <span className="text-eyebrow">Étude de cas</span>
            </p>
            <h2 id="featured-case-title" className="text-section-title mt-6 max-w-[15ch] text-balance">
              {featuredCase.title}
            </h2>
            <p className="text-lede mt-7 max-w-[60ch]">{featuredCase.headerSubtitle}</p>
            <p className="text-metadata mt-3">EdTech SaaS B2B2C · {featuredCase.duration}</p>
          </motion.div>
        </div>

        {/* Showcase — le comparateur casse volontairement le container :
            c'est la preuve du travail, elle doit dominer la section. */}
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 md:px-12 mt-12 md:mt-16 relative z-10">
          {/* Sélecteur d'écrans — barre horizontale compacte, pour libérer toute la largeur au visuel */}
          <div
            className="flex gap-3 overflow-x-auto pb-4 mb-4"
            role="tablist"
            aria-label="Choisir un écran à comparer"
          >
            {compareScreens.map((s, i) => {
              const active = i === screenIdx;
              return (
                <button
                  key={s.label}
                  role="tab"
                  aria-selected={active}
                  aria-label={`${s.label} — ${s.sublabel}`}
                  onClick={() => setScreenIdx(i)}
                  className={`group flex items-center gap-3 shrink-0 text-left rounded-[14px] border p-2 pr-4 transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${active ? 'border-accent-primary bg-accent-bg' : 'border-border-0 bg-surface-0 hover:border-border-1'}`}
                >
                  <span className="block w-14 h-10 rounded-[8px] overflow-hidden border border-border-0 shrink-0">
                    <ImageWithFallback src={s.after} srcWebp={s.afterWebp} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-body text-[13px] font-semibold truncate ${active ? 'text-accent-primary' : 'text-text-primary'}`}>{s.label}</span>
                    <span className="block font-body text-[12px] text-text-muted truncate">{s.sublabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <BeforeAfterSlider key={screenIdx} before={screen.before} beforeWebp={screen.beforeWebp} after={screen.after} afterWebp={screen.afterWebp} />

          <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
            <span className="font-body text-[13px] text-text-secondary inline-flex items-center gap-2">
              <ArrowsHorizontal size={16} weight="bold" className="text-accent-primary" />
              Glissez pour comparer le wireframe et la version optimisée
            </span>
          </div>
        </div>

        {/* Détails — 3 colonnes à plat, séparées par des filets.
            Plus de carte englobante : moins de conteneurs imbriqués, plus de présence. */}
        <div className="max-w-[1320px] mx-auto px-8 md:px-16 mt-20 md:mt-24 relative z-10">
          {/* Le bloc présentait Problème / Mon action / Ce qui a changé en
              trois colonnes égales. Trois colonnes de même largeur, mêmes
              filets, même ligne de départ, c'est la grammaire d'un
              COMPARATIF : trois objets de même nature, lisibles dans
              n'importe quel ordre. Le contenu, lui, est une chaîne causale.
              Trois coûts mesurables :
                · le regard remontait deux fois — on lit une colonne, on
                  revient en haut pour la suivante, ce qu'un flux ne fait
                  jamais ;
                · « correction manuelle » et « correction automatisée » sont
                  la même chose avant/après, et la grille les plaçait aux deux
                  extrémités de l'écran avec une colonne étrangère au milieu :
                  le lecteur devait tenir la première en mémoire ;
                · « Mon action » est la seule des trois qui soit le travail
                  vendu — le reste appartient au client — et elle recevait
                  exactement le même budget visuel.

              Ce que la grille cachait : ce bloc n'a pas trois parties, il a
              DEUX PERSONNES. Les résultats le disent déjà dans les données
              (« côté étudiant », « côté professeur »), le problème en contient
              une de chaque, et les actions se répartissent pareil. Chaque
              ligne suit donc une personne, de gauche à droite ; le
              parallélisme redevient légitime, puisque deux publics SONT
              parallèles.

              Le contenu n'est pas réécrit, il est redistribué : chaque phrase
              vient du bloc précédent, replacée sous la personne concernée. La
              contrainte « distanciel » n'appartenait à aucune des deux — elle
              encadre les deux au lieu de traîner en fin de colonne. */}
          <p className="max-w-[62ch] mx-auto text-center font-body text-[15px] md:text-[17px] leading-[1.7] text-text-secondary mb-10 md:mb-14">
            Une même contrainte pour les deux :{' '}
            <strong className="font-medium text-text-primary">tout devait tenir à distance</strong>, sur
            n'importe quel support. Le reste ne se raconte pas ensemble — un élève et un
            professeur n'avaient pas le même problème, et n'ont pas reçu la même réponse.
          </p>

          {/* Repères de colonne : affichés UNE fois, pas à chaque ligne. Les
              répéter ferait réapparaître la grille de comparaison qu'on quitte. */}
          <div
            className="hidden lg:grid grid-cols-[0.62fr_1fr_1.35fr_1fr] gap-x-10 pb-3.5 border-b border-border-0"
            aria-hidden="true"
          >
            <span />
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">Avant</span>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-text-primary">Mon action</span>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-accent-primary">Après</span>
          </div>

          {VOIX.map((voix) => (
            <div
              key={voix.qui}
              className="grid grid-cols-1 lg:grid-cols-[0.62fr_1fr_1.35fr_1fr] gap-x-10 gap-y-5 items-start py-8 md:py-10 border-t border-border-0 first-of-type:lg:border-t-0"
            >
              {/* La personne, comme un nom de personnage : c'est elle qui parle
                  sur toute la ligne. */}
              <p className="font-heading text-[17px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-text-primary" style={{ fontWeight: 500 }}>
                {voix.qui}
                <span className="block mt-1.5 font-body text-[12px] font-normal uppercase tracking-[0.14em] text-[color:var(--accent-eyebrow)]">
                  {voix.role}
                </span>
              </p>

              {/* Trois moments, trois valeurs : sourdine → plein contraste →
                  accent. C'est cette montée qui porte le sens de lecture, sans
                  qu'aucune flèche ne l'indique. Une flèche entre deux colonnes
                  ne crée pas un flux : elle le décrit, et avoue que la mise en
                  page ne le porte pas.

                  Les repères reviennent en mobile sous forme de vrai texte
                  (`lg:hidden`) et non de `content` CSS, qui n'est pas restitué
                  de façon fiable par les lecteurs d'écran. */}
              <div>
                <span className="lg:hidden block mb-1.5 font-body text-[10.5px] font-medium uppercase tracking-[0.16em] text-text-muted">Avant</span>
                <p className="font-body text-[14px] md:text-[15px] leading-[1.7] text-text-muted">{voix.avant}</p>
              </div>

              <div>
                <span className="lg:hidden block mb-1.5 font-body text-[10.5px] font-medium uppercase tracking-[0.16em] text-text-primary">Mon action</span>
                <ul className="font-body text-[14px] md:text-[15px] leading-[1.7] text-text-primary space-y-2.5">
                  {voix.actions.map((action) => (
                    <li key={action} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mt-[0.62em] shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="lg:hidden block mb-1.5 font-body text-[10.5px] font-medium uppercase tracking-[0.16em] text-accent-primary">Après</span>
                <p className="font-body text-[14px] md:text-[15px] leading-[1.7] font-medium text-accent-primary lg:border-l-2 lg:border-accent-primary lg:pl-[1.1rem]">
                  {featuredCase.metrics[voix.metric]?.label}
                </p>
              </div>
            </div>
          ))}

          {/* CTA — vrai lien vers la page dédiée /etudes-de-cas/:slug (indexable
              par Google), l'aperçu rapide en volet reste l'action par défaut au
              clic. Reproduit le rendu de ButtonPrimary sur un <a> plutôt qu'un
              <button> : un bouton imbriqué dans un lien serait un HTML invalide. */}
          <div className="flex justify-center mt-16">
            <Link
              to={`/etudes-de-cas/${featuredCase.slug}/`}
              onClick={(e) => { e.preventDefault(); setSelectedCase(featuredCase); }}
              className={cn('group/pri font-body', ctaButtonVariants({ intent: 'primary', size: 'l' }))}
            >
              <span className="relative z-10 inline-flex items-center gap-2">{CTA.caseStudy}</span>
              <span className="cta-blobs" aria-hidden="true">
                <span className="cta-blobs__wrap">
                  <span className="cta-blob" />
                  <span className="cta-blob" />
                  <span className="cta-blob" />
                  <span className="cta-blob" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Other Cases Section */}
      <section
        id="case-studies-list"
        className="py-24 md:py-32 bg-bg-base border-b border-border-1 relative overflow-hidden"
        aria-labelledby="other-cases-title"
      >
        <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
          {/* Plus de « 02 · Autres réalisations ». Cet en-tête ouvrait une
              SECONDE série numérotée repartant de 01 : la page comptait donc
              deux « 01 », et les réalisations se lisaient comme deux lots
              séparés. Elles forment désormais une seule suite — le cas phare
              est 01, ceux-ci continuent en 02 et 03 (décision Benji,
              2026-08-20).

              Le titre reste : il introduit la suite, il ne rouvre plus un
              chapitre. ⚠️ Cela renverse le parti pris précédent, qui voulait
              ces cas visiblement « subordonnés au cas phare ». */}
          <SectionHeader
            variant="inline"
            title="Résultats observés sur des cas concrets"
            titleId="other-cases-title"
            className="mb-4"
          />

          {/* Lignes éditoriales alternées — mouvement vertical plutôt qu'une
              nouvelle grille de cards qui rimerait avec le pricing. */}
          <div>
            {otherUseCases.map((useCase, index) => {
              const kpiHero = useCase.metrics[0]?.label || useCase.title;
              const visualFirst = index % 2 === 1;

              return (
                <motion.article
                  key={useCase.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center py-14 md:py-20 border-t border-border-0"
                >
                  {/* Texte — reste premier dans le DOM, l'ordre visuel alterne via `order` */}
                  <div className={visualFirst ? 'md:order-2' : ''}>
                    <div className="flex items-baseline gap-4">
                      {/* Décalé du nombre de cas déjà numérotés en amont : le
                          cas phare occupe 01, ceux-ci poursuivent la série. */}
                      <span className="text-case-index">
                        {String(index + 1 + FEATURED_CASE_COUNT).padStart(2, '0')}
                      </span>
                      <span className="text-eyebrow">{useCase.tag}</span>
                    </div>

                    {/* Le nom du cas passe avant la métrique : sans lui, la
                        grosse phrase KPI se lisait comme le titre de
                        l'article, et on ne savait qu'après coup de quel cas
                        il s'agissait (retour Adel, revue du 2026-08-18). */}
                    <h3 className="font-heading text-[22px] md:text-[26px] lg:text-[28px] text-text-primary leading-[1.2] tracking-[-0.01em] mt-5 text-balance" style={{ fontWeight: 500 }}>
                      {useCase.title}
                    </h3>

                    <p className="font-display text-[19px] md:text-[22px] text-accent-primary leading-snug tracking-[-0.01em] mt-3 text-balance" style={{ fontWeight: 300 }}>
                      {kpiHero}
                    </p>

                    {/* Problème → Action → Résultat en flux horizontal plutôt
                        qu'en colonne : c'est une transformation qu'on vend,
                        pas une liste (revue Adel × Benji du 2026-08-18). Le
                        résultat, seul temps du flux qui prouve la mesure,
                        porte l'accent — les deux premiers ne font que mener
                        jusqu'à lui. */}
                    <dl className="mt-7 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <dt className="font-body text-[10px] uppercase tracking-[0.16em] text-text-muted font-medium">Problème</dt>
                        <dd className="font-body text-[14px] leading-[1.6] text-text-secondary mt-1.5">{useCase.problemShort}</dd>
                      </div>
                      <ArrowRight size={16} weight="bold" className="hidden sm:block shrink-0 mt-1 text-text-muted" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <dt className="font-body text-[10px] uppercase tracking-[0.16em] text-text-muted font-medium">Action</dt>
                        <dd className="font-body text-[14px] leading-[1.6] text-text-secondary mt-1.5">{useCase.actionShort}</dd>
                      </div>
                      <ArrowRight size={16} weight="bold" className="hidden sm:block shrink-0 mt-1 text-accent-primary" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <dt className="font-body text-[10px] uppercase tracking-[0.16em] text-accent-primary font-medium">Résultat</dt>
                        {/* Pleine opacité : à 10px, le modificateur /60 tombait
                            sous le seuil WCAG AA de 4.5:1. */}
                        <dd className="font-body text-[14px] leading-[1.6] text-text-primary font-medium mt-1.5">{useCase.resultShort}</dd>
                      </div>
                    </dl>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {useCase.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="
                            inline-flex items-center gap-1.5
                            font-body text-[10px] font-medium text-text-secondary
                            bg-transparent border border-border-0
                            px-3 py-1 rounded-full tracking-[0.06em]
                          "
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0" />
                          {metric.label}
                        </span>
                      ))}
                    </div>

                    {/* Vrai lien vers /etudes-de-cas/:slug (indexable), anchor
                        descriptif plutôt que générique — cf. section 5 de l'audit SEO. */}
                    <Link
                      to={`/etudes-de-cas/${useCase.slug}/`}
                      onClick={(e) => { e.preventDefault(); setSelectedCase(useCase); }}
                      className="
                        inline-flex items-center gap-2 mt-4
                        font-body text-[13px] font-medium uppercase tracking-widest
                        text-accent-primary hover:underline transition-all
                        outline-none focus-visible:ring-2 focus-visible:ring-accent-ring
                        focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
                        rounded-sm min-h-[44px]
                      "
                    >
                      Voir l’étude de cas : {useCase.title} →
                    </Link>
                  </div>

                  {/* Visuel */}
                  <div className={visualFirst ? 'md:order-1' : ''}>
                    <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-border-0 bg-surface-0">
                      <ImageWithFallback
                        src={useCase.image}
                        srcWebp={useCase.imageWebp}
                        alt={useCase.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-16"
          >
            <ButtonPrimary onClick={scrollToContact} size="l" className="px-12">{CTA.call}</ButtonPrimary>
          </motion.div>
        </div>
      </section>

      {/* Side Panel for Details */}
      <AnimatePresence>
        {selectedCase && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCase(null)} className="fixed inset-0 bg-bg-depth/60 z-[100] backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 h-full w-full md:w-[850px] lg:w-[1000px] bg-surface-0 z-[101] overflow-y-auto pb-24 shadow-panel">
              {/* Close Button */}
              <div className="sticky top-0 right-0 p-6 flex justify-between items-center bg-surface-0/90 backdrop-blur-md z-[102] border-b border-border-0">
                <div className="font-body text-[11px] font-bold text-accent-primary tracking-[0.2em]">
                  PROJECT VIEWER
                </div>
                <button onClick={() => setSelectedCase(null)} className="w-[44px] h-[44px] flex items-center justify-center bg-surface-1 border border-border-0 rounded-xl text-text-primary hover:bg-state-hover-bg transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="p-0 relative">
                {/* Image Header */}
                <div className="relative h-64 md:h-80 overflow-hidden border-b border-border-0">
                  <ImageWithFallback
                    src={selectedCase.image}
                    srcWebp={selectedCase.imageWebp}
                    alt={selectedCase.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-surface-0/80 backdrop-blur-md border-t border-border-0">
                    <span className="font-body text-[10px] bg-surface-0/75 backdrop-blur-md text-accent-primary border border-accent-primary/30 font-medium px-4 py-1 mb-4 uppercase tracking-[0.15em] inline-block rounded-full">
                      {selectedCase.tag}
                    </span>
                    <h2 className="heading-1 text-text-primary">
                      {selectedCase.title}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-12 md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-0 space-y-12">
                    <div className="space-y-6">
                      <h3 className="font-heading text-[24px] text-accent-primary flex items-center gap-4 tracking-[-0.01em]" style={{ fontWeight: 700 }}>
                        <span className="w-10 h-10 border-2 border-accent-primary text-accent-primary rounded-full flex items-center justify-center text-[15px] leading-none shrink-0" style={{ fontWeight: 600 }}>01</span>
                        LE DÉFI
                      </h3>
                      <p className="body-large">
                        {selectedCase.challenge || selectedCase.problemShort}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-heading text-[24px] text-text-primary flex items-center gap-4 tracking-[-0.01em]" style={{ fontWeight: 700 }}>
                        <span className="w-10 h-10 border-2 border-text-primary text-text-primary rounded-full flex items-center justify-center text-[15px] leading-none shrink-0" style={{ fontWeight: 600 }}>02</span>
                        LA SOLUTION
                      </h3>
                      <p className="body-large">
                        {selectedCase.solution || selectedCase.actionShort}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-5 p-8 md:p-12 space-y-12 bg-surface-1 relative">
                    <div className="space-y-6">
                      <h3 className="font-body text-[14px] font-bold text-text-primary uppercase tracking-[0.2em] border-b border-border-0 pb-2">MÉTRIQUES CLÉS</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {selectedCase.metrics.map((m: any, i: number) => (
                          <div key={i} className="flex flex-col border-l-4 border-accent-primary pl-4">
                            <span className="font-display text-[26px] text-accent-primary leading-tight" style={{ fontWeight: 600 }}>{m.label}</span>
                            <span className="font-body text-[10px] font-bold text-text-muted uppercase tracking-widest mt-2">IMPACT LOG</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedCase.deliverables && (
                      <div className="space-y-6">
                        <h3 className="font-body text-[14px] font-bold text-text-primary uppercase tracking-[0.2em] border-b border-border-0 pb-2">LIVRABLES</h3>
                        <ul className="grid grid-cols-1 gap-3">
                          {selectedCase.deliverables.map((item: any, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
                              <span className="w-2 h-2 bg-accent-primary rounded-full" />
                              {item.name || item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-12 p-8 md:p-12 border-y border-border-0 bg-surface-1 relative">
                  <h3 className="font-heading text-[28px] text-text-primary mb-8 tracking-[-0.01em]" style={{ fontWeight: 400 }}>Résultats détaillés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCase.results?.map((r: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 p-6 bg-surface-0 border border-border-0 rounded-xl shadow-panel">
                        <span className="text-accent-primary font-bold text-lg leading-none mt-1">/</span>
                        <span className="text-text-secondary text-[14px] font-semibold uppercase leading-relaxed">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 p-8 md:p-12 space-y-12">
                  <div className="flex flex-wrap gap-12">
                    {selectedCase.tools && (
                      <div className="space-y-4 flex-1">
                        <span className="font-body text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">Stack technique</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedCase.tools.map((tool: string) => (
                            <span key={tool} className="px-3 py-1 bg-transparent border border-border-0 text-text-secondary font-medium uppercase text-[10px] tracking-[0.12em] rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedCase.iaNote && (
                      <div className="space-y-4 flex-[2] min-w-[300px]">
                        <span className="font-body text-[11px] font-bold text-accent-primary uppercase tracking-[0.2em]">Optimisation IA</span>
                        <p className="font-body text-lg font-semibold text-text-primary bg-accent-bg p-6 border-l-4 border-accent-primary rounded-r-xl">
                          "{selectedCase.iaNote}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-8">
                    <ButtonPrimary 
                      onClick={scrollToContact} 
                      size="l"
                      className="w-full flex items-center justify-center gap-3"
                    >
                      <span>Discuter de ce projet</span>
                      <ArrowRight size={18} />
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
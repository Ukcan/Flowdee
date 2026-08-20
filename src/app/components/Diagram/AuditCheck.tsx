import React from 'react';

/**
 * Diagram/AuditCheck — les trois axes de l'audit, rendus mesurables.
 *
 * Accompagne la bande « L'audit vérifie » de ProblemCards. Chaque axe y était
 * un mot abstrait (CLARTÉ / EFFORT / CONFIANCE) suivi d'une question : le
 * lecteur devait se représenter seul ce qui est vérifié.
 *
 * Parti pris : les trois ne sont PAS trois pictogrammes mais **trois mesures**
 * — une distance, un compte, un ordre. C'est ce qui les fait lire comme un
 * instrument unique plutôt que comme trois vignettes décoratives, et c'est
 * honnête à ce qu'est un audit : on relève, on ne suggère pas une ambiance.
 *
 *   clarity → une DISTANCE : combien de page avant la ligne qui décide.
 *   effort  → un COMPTE    : combien de jalons avant le but, et les détours.
 *   trust   → un ORDRE     : la preuve tombe-t-elle avant ou après la décision.
 *
 * Grammaire commune, tenue volontairement stricte :
 * - même toile 320×132, mêmes graisses, mêmes opacités ;
 * - l'accent doré désigne TOUJOURS la même chose : *ce qui décide* (la ligne
 *   qui porte l'offre, le but à atteindre, l'instant du choix). Il ne sert
 *   jamais de simple mise en valeur graphique ;
 * - la structure (cadre, axe, chemin) est en `text-text-muted` atténué : elle
 *   situe sans concurrencer.
 *
 * Thème : aucune couleur en dur. Les groupes portent une classe de couleur du
 * projet et les tracés `stroke="currentColor"`, donc les deux thèmes sont
 * servis par un seul fichier — l'accent vaut #6B5430 en ivoire et #D3B376 en
 * navy sans qu'aucune variante n'existe ici.
 *
 * Aucun texte dans le SVG : le libellé et la question vivent déjà en HTML à
 * côté. Cela évite de dupliquer la copie, garde le schéma traduisible sans le
 * rouvrir, et permet de le sortir de l'arbre d'accessibilité (`aria-hidden`)
 * sans rien retirer au lecteur d'écran.
 *
 * Statique à dessein. La passation du 19/08 recense une série d'effets qui
 * échouent en silence (Tailwind qui ne scanne pas, rAF bridé, valeurs de
 * départ figées par GSAP, `prefers-reduced-motion: reduce` actif sur le poste)
 * et la section entière est déjà animée à l'entrée par le ScrollReveal de
 * Home. Une animation propre ici n'ajouterait rien de lisible.
 */

export type AuditCheckVariant = 'clarity' | 'effort' | 'trust';

interface AuditCheckDiagramProps {
  variant: AuditCheckVariant;
  className?: string;
}

/* Graisses partagées — sortir ces valeurs des tracés est ce qui garantit que
   les trois schémas restent une même famille quand l'un d'eux est retouché. */
const W = {
  /** Cadre, axe, chemin : ce qui situe. */
  structure: 1.25,
  /** Blocs de contenu abstraits. */
  content: 3.5,
  /** Ce qui décide. */
  accent: 4,
  /** Traits de mesure (crochets, cotes). */
  measure: 1.25,
} as const;

const O = {
  /** Cadre fermé : une forme pleine pèse plus qu'un trait, donc plus discrète. */
  frame: 0.26,
  /** Axe et chemin : trait ouvert, remonté pour égaler le poids perçu du cadre. */
  path: 0.42,
  content: 0.34,
  measure: 0.55,
  aside: 0.45,
} as const;

/* ───────────────────────────────────────────────────────────────────────────
   CLARTÉ — « L'offre est-elle comprise rapidement ? »
   Une DISTANCE. Le premier écran, ses blocs de contenu, et la ligne qui porte
   l'offre placée bas : le crochet de gauche cote le chemin de lecture qu'il
   faut parcourir avant de comprendre. C'est cette cote que l'audit relève.
   ─────────────────────────────────────────────────────────────────────────── */
function ClarityMarks() {
  const contentX = 46;
  const offerY = 86;
  const contentLines = [
    { y: 32, w: 118 },
    { y: 50, w: 198 },
    { y: 68, w: 168 },
    { y: 104, w: 138 },
  ];

  return (
    <>
      {/* Le premier écran — ouvert en bas, à dessein. Fermé en rectangle, il se
          lisait comme une carte d'interface et pesait bien plus que le trait
          ouvert des deux autres schémas ; ouvert, il dit ce qu'il doit dire :
          la page continue sous la ligne de flottaison. */}
      <path
        d="M 8 124 L 8 16 Q 8 8 16 8 L 304 8 Q 312 8 312 16 L 312 124"
        fill="none"
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.frame}
        strokeWidth={W.structure}
      />

      {/* Contenu ordinaire : présent, lu, mais qui ne décide de rien. */}
      <g
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.content}
        strokeWidth={W.content}
        strokeLinecap="round"
      >
        {contentLines.map((l) => (
          <line key={l.y} x1={contentX} y1={l.y} x2={contentX + l.w} y2={l.y} />
        ))}
      </g>

      {/* La ligne qui porte l'offre — placée en quatrième position. */}
      <line
        x1={contentX}
        y1={offerY}
        x2={contentX + 206}
        y2={offerY}
        className="text-accent-primary"
        stroke="currentColor"
        strokeWidth={W.accent}
        strokeLinecap="round"
      />

      {/* La cote : du haut de l'écran jusqu'à cette ligne. */}
      <g
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.measure}
        strokeWidth={W.measure}
        strokeLinecap="round"
      >
        <line x1={28} y1={24} x2={28} y2={offerY} />
        <line x1={23} y1={24} x2={33} y2={24} />
        <line x1={23} y1={offerY} x2={33} y2={offerY} />
      </g>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   EFFORT — « L'action demande-t-elle trop d'étapes ? »
   Un COMPTE. Le chemin jusqu'au but, jalon par jalon, et les embranchements
   qui en détournent — « les actions essentielles noyées dans des choix ou
   étapes secondaires ». Le but est en accent : on voit combien il est loin.
   ─────────────────────────────────────────────────────────────────────────── */
function EffortMarks() {
  const y = 68;
  const steps = [30, 96, 162, 228];
  const goal = 292;

  /* Détours : tous orientés vers l'avant, alternés haut/bas, et arrêtés avant
     de recouper le chemin. La première version partait en arrière et croisait
     l'axe — ça se lisait comme un gribouillis, pas comme un embranchement. */
  const detours = [
    { from: steps[0], to: [60, 34] as const },
    { from: steps[1], to: [126, 102] as const },
    { from: steps[2], to: [192, 34] as const },
  ];

  return (
    <>
      {/* Le chemin. */}
      <line
        x1={steps[0]}
        y1={y}
        x2={goal}
        y2={y}
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.path}
        strokeWidth={W.structure}
        strokeLinecap="round"
      />

      {/* Les détours, en retrait : ils encombrent, ils ne mènent pas. */}
      <g
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.aside}
        strokeWidth={W.measure}
        strokeLinecap="round"
        fill="none"
      >
        {detours.map((d, i) => (
          <React.Fragment key={i}>
            <line x1={d.from} y1={y} x2={d.to[0]} y2={d.to[1]} />
            <circle cx={d.to[0]} cy={d.to[1]} r={3.5} />
          </React.Fragment>
        ))}
      </g>

      {/* Les jalons à franchir. */}
      <g
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.measure}
        strokeWidth={W.structure}
        fill="none"
      >
        {steps.map((x) => (
          <circle key={x} cx={x} cy={y} r={5} />
        ))}
      </g>

      {/* Le but. */}
      <g className="text-accent-primary">
        <circle cx={goal} cy={y} r={5} fill="currentColor" />
        <circle
          cx={goal}
          cy={y}
          r={10}
          fill="none"
          stroke="currentColor"
          strokeWidth={W.measure}
          strokeOpacity={0.5}
        />
      </g>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   CONFIANCE — « Les preuves arrivent-elles avant la décision ? »
   Un ORDRE. Un axe de temps, l'instant de la décision en accent, et les
   éléments de réassurance placés après lui. Le crochet du haut cote le
   retard : c'est littéralement la phrase du signal 03, rendue visible.
   ─────────────────────────────────────────────────────────────────────────── */
function TrustMarks() {
  const axisY = 80;
  const decision = 112;
  const proofs = [200, 250];

  return (
    <>
      {/* L'axe du temps, flèche à droite. */}
      <g
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.path}
        strokeWidth={W.structure}
        strokeLinecap="round"
      >
        <line x1={24} y1={axisY} x2={300} y2={axisY} />
        <line x1={292} y1={75} x2={300} y2={axisY} />
        <line x1={292} y1={85} x2={300} y2={axisY} />
      </g>

      {/* Le retard, coté SOUS l'axe : au-dessus, la cote flottait à distance de
          ce qu'elle mesure et ne se rattachait visuellement à rien. Les pattes
          remontent jusqu'à l'axe pour désigner l'intervalle sans ambiguïté. */}
      <g
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.measure}
        strokeWidth={W.measure}
        strokeLinecap="round"
      >
        <line x1={decision} y1={112} x2={proofs[0]} y2={112} />
        <line x1={decision} y1={112} x2={decision} y2={100} />
        <line x1={proofs[0]} y1={112} x2={proofs[0]} y2={100} />
      </g>

      {/* Les preuves — arrivées après. */}
      <g
        className="text-text-muted"
        stroke="currentColor"
        strokeOpacity={O.measure}
        strokeWidth={W.structure}
        fill="none"
      >
        {proofs.map((x) => (
          <circle key={x} cx={x} cy={axisY} r={5.5} />
        ))}
      </g>

      {/* L'instant de la décision. Tenu au-dessus de la cote (y=96 et non 108)
          pour ne pas se confondre avec sa patte gauche. */}
      <g className="text-accent-primary">
        <line
          x1={decision}
          y1={54}
          x2={decision}
          y2={96}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <circle cx={decision} cy={axisY} r={5} fill="currentColor" />
      </g>
    </>
  );
}

const MARKS: Record<AuditCheckVariant, () => React.ReactElement> = {
  clarity: ClarityMarks,
  effort: EffortMarks,
  trust: TrustMarks,
};

export function AuditCheckDiagram({ variant, className }: AuditCheckDiagramProps) {
  const Marks = MARKS[variant];

  return (
    <svg
      viewBox="0 0 320 132"
      /* Une seule toile pour les trois : c'est ce qui aligne les schémas entre
         colonnes, quelle que soit la longueur des questions au-dessus. */
      className={className}
      /* Pas d'attributs width/height : `height="auto"` n'est pas une longueur
         SVG valide (erreur console silencieuse à l'affichage). Le viewBox donne
         le ratio, et la hauteur se déduit de la largeur CSS. */
      /* Décoratif : le libellé et la question portent déjà le sens en HTML. */
      aria-hidden="true"
      focusable="false"
    >
      <Marks />
    </svg>
  );
}

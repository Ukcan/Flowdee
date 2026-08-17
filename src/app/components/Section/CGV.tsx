import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from '@phosphor-icons/react';
import { useSeo } from '../../hooks/useSeo';

/**
 * Section/CGV Component
 * Nomenclature Figma: Section/CGV
 * Conditions Générales de Vente
 *
 * Page à part entière (/cgv) : contenu dans le flux normal, sous le header
 * et au-dessus du footer comme n'importe quelle autre page — pas un calque
 * plein-écran superposé au reste du site.
 */

function Article({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-6">
      <h2
        className="text-2xl font-heading text-text-primary tracking-[-0.01em] flex items-center gap-4"
        style={{ fontWeight: 500 }}
      >
        <span className="w-10 h-10 rounded-xl bg-accent-cta text-on-accent flex items-center justify-center text-sm shrink-0">
          {n}
        </span>
        {title}
      </h2>
      <div className="space-y-4 font-body text-[15px] leading-relaxed text-text-primary/80">{children}</div>
    </article>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5 list-disc marker:text-accent-primary">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Blank() {
  return <span className="inline-block border-b border-border-1 min-w-[220px] h-5 align-bottom" aria-hidden="true" />;
}

export function CGVSection() {
  const navigate = useNavigate();

  useSeo({
    title: 'Conditions générales de vente | Flowdee',
    description: 'Conditions générales de vente de Flowdee : offres, tarifs, modalités de paiement, propriété intellectuelle, résiliation et rétractation.',
    canonical: 'https://flowdee.fr/cgv/',
  });

  return (
    <>
      {/* Fil d'Ariane — même pattern que /audit-ux et /etudes-de-cas/:slug */}
      <nav aria-label="Fil d’Ariane" className="max-w-[1000px] mx-auto px-8 md:px-16 pt-28 md:pt-32">
        <ol className="flex items-center gap-2 font-body text-[12px] text-text-muted">
          <li>
            <Link to="/" className="hover:text-accent-primary transition-colors underline-offset-4 hover:underline">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary" aria-current="page">CGV</li>
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
              Conditions Générales <br />
              <span className="text-accent-primary">de Vente</span>
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-accent-primary" />
              <p className="font-body font-medium text-sm uppercase tracking-widest text-accent-primary">
                Dernière mise à jour : 17 août 2026
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Article n={1} title="Identité du prestataire">
              <p>Les présentes Conditions Générales de Vente, ci-après les « CGV », sont proposées par :</p>
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
                Régime de TVA : <strong className="text-text-primary font-bold">TVA non applicable, article 293 B du Code général des impôts</strong> (franchise en base de TVA).
              </p>
              <p>Ci-après désigné « Flowdee ».</p>
            </Article>

            <Article n={2} title="Objet">
              <p>Les présentes CGV définissent les conditions dans lesquelles Flowdee fournit ses prestations à ses clients.</p>
              <p>Les prestations peuvent notamment concerner :</p>
              <List
                items={[
                  'UX Design',
                  'UI Design',
                  'Product Design',
                  'audits UX et conversion',
                  'optimisation de parcours numériques',
                  'recherche et tests utilisateurs',
                  'wireframes et prototypes',
                  'Design Systems',
                  'accessibilité numérique',
                  'SEO UX',
                  'accompagnement Product Design',
                  'conseil, analyse et optimisation de produits numériques',
                ]}
              />
              <p>Le contenu exact d’une prestation est celui indiqué sur le Site, dans un devis, une proposition commerciale ou tout autre document contractuel accepté par les parties.</p>
            </Article>

            <Article n={3} title="Clients professionnels et consommateurs">
              <p>Flowdee fournit ses prestations aussi bien :</p>
              <List items={['à des professionnels', 'qu’à des consommateurs particuliers']} />
              <p>Le terme « Client » désigne indifféremment ces deux catégories lorsque aucune distinction n’est nécessaire.</p>
              <p>Les dispositions identifiées comme applicables exclusivement aux consommateurs ou exclusivement aux professionnels ne s’appliquent qu’à la catégorie concernée.</p>
              <p>Aucune disposition des présentes CGV ne prive un consommateur des droits impératifs que lui reconnaît la législation applicable.</p>
            </Article>

            <Article n={4} title="Documents contractuels et ordre de priorité">
              <p>La relation contractuelle peut être constituée notamment :</p>
              <ol className="space-y-2 pl-5 list-decimal marker:text-accent-primary marker:font-semibold">
                <li>des conditions particulières expressément convenues entre les parties ;</li>
                <li>du devis ou de la proposition commerciale acceptée ;</li>
                <li>de la description de la prestation commandée ;</li>
                <li>des présentes CGV.</li>
              </ol>
              <p>En cas de contradiction, le document situé le plus haut dans cet ordre prévaut pour le point concerné.</p>
              <p>Toute modification du périmètre doit faire l’objet d’un accord écrit.</p>
              <p>Les validations peuvent notamment être matérialisées par signature électronique, paiement, e-mail, outil de gestion de projet ou validation explicite dans un espace collaboratif.</p>
            </Article>

            <Article n={5} title="Formation de la commande">
              <p>Une commande devient ferme lorsque le Client :</p>
              <List
                items={[
                  'accepte le devis ou la proposition commerciale selon les modalités indiquées',
                  'ou valide une commande directement sur le Site',
                  'et règle le montant exigible à la commande lorsqu’un paiement initial est prévu',
                ]}
              />
              <p>Flowdee n’est pas tenu de réserver un créneau de production avant la réception du paiement initial convenu.</p>
              <p>Pour les prestations commandées directement en ligne, les informations essentielles relatives à la prestation, au prix et aux conditions applicables sont présentées avant la validation de la commande.</p>
            </Article>

            <Article n={6} title="Prix">
              <p>Les prix applicables sont ceux indiqués avant la commande ou figurant dans le devis accepté.</p>
              <p>Ils sont exprimés en euros.</p>
              <p>Pour les consommateurs, le prix total effectivement dû est présenté avant la conclusion du contrat conformément au régime de TVA applicable à Flowdee.</p>
              <p>Toute demande supplémentaire sortant du périmètre initial peut faire l’objet :</p>
              <List items={['d’un devis complémentaire', 'd’une facturation supplémentaire', 'ou d’un ajustement du calendrier']} />
              <p>Aucun travail supplémentaire significatif n’est engagé sans information préalable du Client sur son incidence financière.</p>
            </Article>

            <Article n={7} title="Acompte — et non arrhes">
              <p>
                Sauf mention contraire expresse, toute somme qualifiée d’<strong className="text-text-primary font-bold">acompte</strong> dans un devis, une commande ou une facture constitue un premier paiement ferme à valoir sur le prix total de la prestation.
              </p>
              <div className="border-l-4 border-accent-primary pl-4">
                <p className="text-text-primary/90">Les parties conviennent expressément que les sommes ainsi désignées constituent des acomptes et non des arrhes.</p>
              </div>
              <p>Le versement de l’acompte matérialise l’engagement contractuel des parties, sous réserve des droits impératifs reconnus aux consommateurs, notamment du droit de rétractation lorsqu’il est applicable.</p>
              <p>L’acompte est imputé sur le prix total de la prestation.</p>
              <p>Il ne constitue pas à lui seul une pénalité d’annulation.</p>
            </Article>

            <Article n={8} title="Modalités de paiement">
              <p>Sauf conditions différentes prévues dans le devis ou sur la page de commande :</p>

              <h3 className="font-heading text-[18px] text-text-primary mt-6" style={{ fontWeight: 500 }}>
                Prestations directement commandées en ligne
              </h3>
              <p>Le prix peut être exigé intégralement lors de la commande.</p>

              <h3 className="font-heading text-[18px] text-text-primary mt-6" style={{ fontWeight: 500 }}>
                Missions réalisées sur devis
              </h3>
              <p>Flowdee peut appliquer l’échéancier suivant :</p>
              <List
                items={[
                  <>40 % à la commande à titre d’acompte</>,
                  <>30 % lors de la validation d’une phase intermédiaire</>,
                  <>30 % avant la livraison définitive et, le cas échéant, la remise des fichiers sources</>,
                ]}
              />
              <p>Un devis peut prévoir un échéancier différent selon la durée ou la nature de la mission.</p>

              <h3 className="font-heading text-[18px] text-text-primary mt-6" style={{ fontWeight: 500 }}>
                Accompagnements mensuels
              </h3>
              <p>
                Les prestations récurrentes ou de type Fractional Product Designer peuvent être facturées <strong className="text-text-primary font-bold">mensuellement et d’avance</strong>.
              </p>
              <p>La période de travail concernée ne débute qu’après règlement de l’échéance correspondante, sauf disposition contraire.</p>
            </Article>

            <Article n={9} title="Démarrage de la prestation">
              <p>Le démarrage effectif de la prestation peut être conditionné à la réception :</p>
              <List
                items={[
                  'du paiement initial prévu',
                  'des informations nécessaires',
                  'des accès nécessaires',
                  'des fichiers et contenus demandés',
                  'des validations nécessaires au démarrage',
                ]}
              />
              <p>Le délai annoncé commence à courir lorsque l’ensemble des éléments indispensables à l’exécution de la mission a été reçu, sauf disposition différente expressément convenue.</p>
            </Article>

            <Article n={10} title="Droit de rétractation des consommateurs">
              <p>Le présent article concerne exclusivement les Clients ayant la qualité de consommateur.</p>
              <p>
                Lorsqu’un contrat de prestation de services est conclu à distance, le consommateur dispose en principe d’un délai de{' '}
                <strong className="text-text-primary font-bold">14 jours à compter de la conclusion du contrat</strong> pour exercer son droit de rétractation lorsque celui-ci est applicable.
              </p>
              <p>La rétractation peut être exercée :</p>
              <List
                items={[
                  'au moyen du formulaire figurant en annexe',
                  'ou par toute déclaration non ambiguë exprimant la volonté de se rétracter, notamment par e-mail',
                ]}
              />
              <p>
                La demande peut être envoyée à :{' '}
                <a href="mailto:contact@flowdee.fr" className="text-accent-primary hover:underline">contact@flowdee.fr</a>
              </p>
              <p>Le consommateur n’a pas à motiver sa décision.</p>
            </Article>

            <Article n={11} title="Commencement avant l’expiration des 14 jours">
              <p>Certaines prestations Flowdee peuvent être exécutées rapidement et donc commencer avant l’expiration du délai légal de rétractation.</p>
              <p>Lorsqu’un consommateur souhaite que la prestation commence avant la fin de ce délai, Flowdee recueille préalablement sa demande expresse.</p>
              <p>
                Lorsque le consommateur exerce ensuite son droit de rétractation après avoir demandé expressément le commencement de la prestation, il reste redevable, dans les conditions prévues par la loi, du montant correspondant aux services effectivement exécutés jusqu’à la communication de sa décision de se rétracter.
              </p>
              <p>Cette rémunération est déterminée proportionnellement au prix total convenu et à l’état réel d’avancement de la prestation.</p>
              <p>
                Lorsque la prestation a été pleinement exécutée avant la fin du délai de rétractation, la perte du droit de rétractation ne peut intervenir que lorsque les conditions légales applicables ont été respectées, notamment l’accord préalable exprès du consommateur et sa reconnaissance de la perte de ce droit après exécution complète.
              </p>
            </Article>

            <Article n={12} title="Rétractation en ligne">
              <p>
                Lorsqu’une commande soumise au droit de rétractation est conclue au moyen de l’interface en ligne de Flowdee, une fonctionnalité permettant au consommateur d’exercer sa rétractation directement en ligne est mise à disposition à l’adresse suivante :
              </p>
              <p>
                <a href="https://flowdee.fr/se-retracter" className="text-accent-primary hover:underline">
                  https://flowdee.fr/se-retracter
                </a>
              </p>
              <p>Elle permet notamment d’identifier :</p>
              <List
                items={[
                  'le consommateur',
                  'le contrat ou la commande concernée',
                  'le moyen permettant de lui transmettre l’accusé de réception',
                ]}
              />
              <p>Flowdee adresse ensuite au consommateur un accusé de réception de sa demande sur un support durable.</p>
              <p>Le consommateur peut également exercer son droit de rétractation par e-mail ou au moyen du formulaire type figurant en annexe, dans les conditions décrites à l’article 10.</p>
            </Article>

            <Article n={13} title="Collaboration du Client">
              <p>Le Client s’engage à collaborer activement avec Flowdee.</p>
              <p>Il lui appartient notamment de transmettre dans les délais convenus :</p>
              <List
                items={[
                  'les contenus',
                  'les accès',
                  'les documents',
                  'les informations',
                  'les contraintes métier',
                  'les validations',
                  'les retours nécessaires à l’exécution de la mission',
                ]}
              />
              <p>Le Client est responsable de l’exactitude des informations qu’il transmet.</p>
              <p>Flowdee n’est pas responsable d’un retard directement causé par l’absence, l’insuffisance ou le retard des éléments nécessaires provenant du Client.</p>
            </Article>

            <Article n={14} title="Retard du Client et suspension du calendrier">
              <p>Tout retard du Client dans la fourniture d’un élément nécessaire suspend ou décale le calendrier de production.</p>
              <p>Le nouveau planning dépend alors des disponibilités de Flowdee.</p>
              <p>Le délai initial ne peut être considéré comme maintenu lorsque le Client a lui-même retardé l’exécution de la prestation.</p>
              <p>Lorsque le Client reste sans réponse pendant une durée significative, Flowdee peut mettre le projet en attente.</p>
              <p>
                Après <strong className="text-text-primary font-bold">20 jours ouvrés consécutifs sans réponse</strong> malgré une relance écrite, Flowdee peut suspendre la mission.
              </p>
              <p>La reprise du projet intervient selon les disponibilités de Flowdee et peut nécessiter une nouvelle planification.</p>
            </Article>

            <Article n={15} title="Périmètre de la prestation">
              <p>La prestation est strictement limitée au périmètre décrit :</p>
              <List items={['sur la page de l’offre', 'dans le devis', 'ou dans la proposition commerciale']} />
              <p>Les éléments qui ne sont pas expressément indiqués comme inclus sont considérés comme exclus.</p>
              <p>Toute demande modifiant notamment :</p>
              <List
                items={[
                  'le nombre d’écrans',
                  'le nombre de pages',
                  'les fonctionnalités',
                  'les parcours',
                  'les plateformes',
                  'les formats',
                  'les contenus',
                  'les hypothèses déjà validées',
                  'les objectifs initiaux',
                  'ou les livrables',
                ]}
              />
              <p>peut constituer une <strong className="text-text-primary font-bold">modification de périmètre</strong>.</p>
              <p>Flowdee peut alors proposer un ajustement du prix, du planning ou un devis complémentaire.</p>
            </Article>

            <Article n={16} title="Révisions et demandes de modification">
              <p>
                Sauf indication différente dans le devis, une prestation de conception comprend au maximum{' '}
                <strong className="text-text-primary font-bold">deux cycles de corrections consolidées par phase de validation</strong>.
              </p>
              <p>Un cycle de correction correspond à un ensemble cohérent de retours transmis en une seule fois par le Client.</p>
              <p>Ne constituent pas une simple correction :</p>
              <List
                items={[
                  'une modification d’objectif',
                  'un changement de direction artistique après validation',
                  'une nouvelle fonctionnalité',
                  'une nouvelle page',
                  'une modification substantielle d’un parcours déjà validé',
                  'le retour sur une phase précédemment approuvée',
                ]}
              />
              <p>Ces demandes peuvent être facturées séparément après information du Client.</p>
            </Article>

            <Article n={17} title="Validation des phases">
              <p>Le Client doit formuler ses remarques de manière suffisamment précise pour permettre leur traitement.</p>
              <p>
                Pour les Clients professionnels, sauf délai différent prévu au devis, Flowdee peut demander une validation dans un délai de{' '}
                <strong className="text-text-primary font-bold">5 jours ouvrés</strong>.
              </p>
              <p>À défaut de remarques dans ce délai après une relance, la phase peut être considérée comme validée pour les besoins de la poursuite du planning, à condition que cette conséquence ait été clairement portée à la connaissance du Client.</p>
              <p>Toute nouvelle modification portant ultérieurement sur une phase validée peut être considérée comme une demande supplémentaire.</p>
              <p>Cette règle ne prive pas un consommateur des garanties et droits impératifs dont il bénéficie.</p>
            </Article>

            <Article n={18} title="Défaut de paiement">
              <p>Tout montant arrivé à échéance doit être réglé conformément aux conditions convenues.</p>
              <p>En cas de non-paiement d’une somme exigible, Flowdee peut, lorsque les conditions légales sont réunies :</p>
              <List
                items={[
                  'suspendre l’exécution de la mission',
                  'interrompre les travaux',
                  'différer toute nouvelle phase',
                  'suspendre la livraison',
                  'retenir les fichiers sources non encore remis',
                  'suspendre l’octroi ou la prise d’effet des droits d’exploitation conditionnés au paiement',
                ]}
              />
              <p>La suspension liée à un défaut de paiement entraîne un décalage du calendrier qui ne peut être imputé à Flowdee.</p>
              <p>La prestation reprend après régularisation selon les disponibilités de Flowdee.</p>
            </Article>

            <Article n={19} title="Retards de paiement — Clients professionnels">
              <p>Le présent article concerne exclusivement les Clients professionnels.</p>
              <p>Tout retard de paiement entraîne l’application de pénalités de retard calculées au taux indiqué sur le devis ou la facture, lequel ne peut être inférieur au minimum légal applicable.</p>
              <p>
                À défaut de taux différent indiqué, le taux retenu est égal à <strong className="text-text-primary font-bold">trois fois le taux d’intérêt légal en vigueur</strong>.
              </p>
              <p>Les pénalités sont exigibles conformément aux dispositions applicables aux transactions entre professionnels.</p>
              <p>
                Tout Client professionnel en retard de paiement est également redevable de plein droit de l’<strong className="text-text-primary font-bold">indemnité forfaitaire légale de 40 euros pour frais de recouvrement</strong>.
              </p>
              <p>Lorsque les frais de recouvrement réellement engagés excèdent ce montant, une indemnisation complémentaire peut être réclamée sur justificatifs dans les conditions prévues par la loi.</p>
            </Article>

            <Article n={20} title="Arrêt anticipé à l’initiative du Client">
              <p>En dehors de l’exercice régulier d’un droit légal de rétractation et en l’absence de manquement imputable à Flowdee, le Client qui décide d’arrêter une mission en cours reste redevable des prestations effectivement exécutées.</p>
              <p>Sont notamment immédiatement exigibles :</p>
              <List
                items={[
                  'les phases terminées',
                  'les éléments déjà produits',
                  'les travaux en cours correspondant à leur état réel d’avancement',
                  'les dépenses et engagements non annulables spécifiquement engagés pour la mission',
                ]}
              />
              <p>Lorsque le devis prévoit des phases tarifées séparément, celles-ci servent de référence pour déterminer les sommes dues.</p>
              <p>À défaut, l’état d’avancement peut être évalué au regard des travaux réellement exécutés et du prix global convenu.</p>
              <p>L’acompte déjà versé est imputé sur ces sommes.</p>
            </Article>

            <Article n={21} title="Indemnité de résiliation anticipée — Clients professionnels">
              <p>Le présent article concerne exclusivement les Clients professionnels.</p>
              <p>Lorsqu’un Client professionnel résilie une mission sans faute de Flowdee avant son terme, il est redevable :</p>
              <ol className="space-y-2 pl-5 list-decimal marker:text-accent-primary marker:font-semibold">
                <li>de l’ensemble des prestations déjà réalisées ;</li>
                <li>des frais et engagements non annulables ;</li>
                <li>
                  et d’une <strong className="text-text-primary font-bold">indemnité forfaitaire de résiliation égale à 20 % du montant HT des prestations restant à exécuter</strong>.
                </li>
              </ol>
              <p>Cette indemnité vise notamment à compenser :</p>
              <List
                items={[
                  'la capacité de production réservée',
                  'la désorganisation du planning',
                  'les créneaux devenus difficilement commercialisables',
                  'et les opportunités éventuellement refusées en raison de l’engagement initial',
                ]}
              />
              <p>Les conditions particulières ou le devis peuvent prévoir une indemnité différente lorsqu’elle est justifiée par les caractéristiques de la mission.</p>
            </Article>

            <Article n={22} title="Résiliation pour manquement du Client">
              <p>Flowdee peut mettre fin à la prestation en cas de manquement suffisamment sérieux du Client, notamment :</p>
              <List
                items={[
                  'défaut de paiement',
                  'absence prolongée de collaboration',
                  'refus répété de fournir les éléments indispensables',
                  'comportement abusif ou illicite',
                  'demande de réalisation manifestement illicite',
                  'violation grave des droits de Flowdee',
                ]}
              />
              <p>Sauf urgence ou situation rendant impossible la poursuite immédiate de la relation, Flowdee adresse préalablement au Client une demande écrite lui permettant de remédier au manquement dans un délai raisonnable.</p>
              <p>En cas de résiliation, les sommes correspondant au travail déjà exécuté restent dues.</p>
              <p>Pour les Clients professionnels, l’indemnité prévue à l’article précédent peut également s’appliquer lorsque la résiliation résulte d’un manquement qui leur est imputable.</p>
            </Article>

            <Article n={23} title="Résiliation à l’initiative de Flowdee sans faute du Client">
              <p>Lorsque Flowdee met fin à une mission sans manquement du Client et hors cas de force majeure, le Client ne reste redevable que des prestations effectivement exécutées jusqu’à la date d’arrêt.</p>
              <p>Les sommes éventuellement encaissées au-delà des prestations effectivement dues sont restituées.</p>
              <p>Cette disposition ne remet pas en cause les autres droits que la loi pourrait reconnaître au Client.</p>
            </Article>

            <Article n={24} title="Conséquences de la fin du contrat">
              <p>La fin du contrat, quelle qu’en soit la cause, n’entraîne pas automatiquement :</p>
              <List
                items={[
                  'la remise des travaux non payés',
                  'la remise des fichiers sources non prévus au contrat',
                  'la cession des droits sur des travaux non réglés',
                  'la remise des explorations ou propositions non retenues',
                ]}
              />
              <p>Le Client reçoit les livrables correspondant aux prestations intégralement réglées selon les droits prévus par le contrat.</p>
            </Article>

            <Article n={25} title="Propriété intellectuelle — principe général">
              <p>Flowdee demeure titulaire des droits dont il dispose sur ses créations, méthodes et ressources.</p>
              <p>
                Le paiement d’une prestation <strong className="text-text-primary font-bold">n’entraîne pas automatiquement une cession générale de l’ensemble des droits de propriété intellectuelle de Flowdee</strong>.
              </p>
              <p>Toute cession ou licence doit être interprétée uniquement dans les limites expressément prévues par les présentes CGV, le devis ou les conditions particulières.</p>
              <p>Les droits moraux attachés aux créations de l’auteur demeurent soumis au régime légal applicable.</p>
            </Article>

            <Article n={26} title="Absence de droits avant paiement intégral">
              <p>Sauf disposition impérative contraire, les éléments transmis pendant la réalisation du projet sont fournis au Client aux seules fins :</p>
              <List items={['de consultation', 'd’évaluation', 'de validation', 'et de suivi du projet']} />
              <div className="border-l-4 border-accent-primary pl-4">
                <p className="text-text-primary/90">Les droits d’exploitation prévus au contrat ne prennent effet qu’après paiement intégral des sommes dues au titre des livrables concernés.</p>
              </div>
              <p>Avant ce paiement, le Client ne peut pas, sauf autorisation écrite de Flowdee :</p>
              <List
                items={[
                  'publier les créations',
                  'les mettre en production',
                  'les exploiter commercialement',
                  'les transmettre à un tiers à des fins d’exploitation',
                  'les reproduire au-delà des besoins de validation',
                ]}
              />
            </Article>

            <Article n={27} title="Licence accordée sur les livrables finaux">
              <p>
                Sauf cession de droits expressément prévue dans le devis, le paiement intégral de la prestation confère au Client une{' '}
                <strong className="text-text-primary font-bold">licence non exclusive d’exploitation des seuls livrables finaux expressément identifiés au contrat</strong>.
              </p>
              <p>Cette licence permet au Client, pour les besoins du projet concerné :</p>
              <List
                items={[
                  'de reproduire les livrables',
                  'de les représenter',
                  'de les intégrer à son site, application ou produit numérique',
                  'de les adapter techniquement pour leur mise en œuvre',
                  'de les utiliser dans sa communication liée au projet',
                ]}
              />
              <p>La licence est accordée :</p>
              <p>
                <strong className="text-text-primary font-bold">Destination :</strong> exploitation du projet et de l’activité du Client identifiés dans la commande.<br />
                <strong className="text-text-primary font-bold">Territoire :</strong> monde entier.<br />
                <strong className="text-text-primary font-bold">Durée :</strong> durée légale de protection des droits patrimoniaux applicables.
              </p>
              <p><strong className="text-text-primary font-bold">Supports autorisés :</strong></p>
              <List
                items={[
                  'sites internet',
                  'applications mobiles',
                  'logiciels',
                  'interfaces desktop',
                  'présentations',
                  'réseaux sociaux',
                  'documents commerciaux',
                  'supports imprimés directement liés au projet',
                ]}
              />
              <p>Le Client peut transmettre les livrables à ses développeurs, agences, hébergeurs ou autres prestataires uniquement lorsque cette transmission est nécessaire à l’exploitation de son propre projet.</p>
            </Article>

            <Article n={28} title="Exploitations exclues">
              <p>Sauf accord écrit spécifique, la licence ne permet pas au Client :</p>
              <List
                items={[
                  'de revendre les créations sous forme de templates',
                  'de commercialiser séparément les composants de Flowdee',
                  'de transformer les livrables en bibliothèque destinée à être revendue',
                  'de concéder les créations à des tiers pour des projets sans rapport avec celui commandé',
                  'de présenter les méthodes ou ressources génériques de Flowdee comme lui appartenant',
                ]}
              />
              <p>Toute exploitation dépassant le périmètre prévu peut faire l’objet d’une licence ou d’une cession supplémentaire.</p>
            </Article>

            <Article n={29} title="Cession exclusive de droits">
              <p>
                Une cession exclusive des droits patrimoniaux n’est accordée que lorsqu’elle est <strong className="text-text-primary font-bold">expressément prévue par écrit</strong>.
              </p>
              <p>Le document de cession ou le devis concerné doit préciser notamment :</p>
              <List items={['les droits concernés', 'les modes d’exploitation', 'leur destination', 'leur étendue', 'le territoire', 'la durée']} />
              <p>Une cession exclusive ou particulièrement étendue peut faire l’objet d’une rémunération spécifique distincte du prix de conception.</p>
            </Article>

            <Article n={30} title="Éléments qui restent la propriété de Flowdee">
              <p>Sauf accord écrit contraire, restent notamment la propriété de Flowdee :</p>
              <List
                items={[
                  'méthodes de travail',
                  'frameworks',
                  'systèmes',
                  'process',
                  'templates',
                  'prompts',
                  'bibliothèques',
                  'composants génériques',
                  'Design Systems préexistants',
                  'scripts',
                  'automatisations',
                  'outils',
                  'structures',
                  'documents internes',
                  'recherches internes',
                  'concepts non retenus',
                  'explorations',
                  'brouillons',
                  'wireframes non retenus',
                  'variantes rejetées',
                  'prototypes préparatoires',
                  'ressources développées avant la mission',
                  'savoir-faire',
                ]}
              />
              <p>Flowdee reste libre de réutiliser ses connaissances, méthodes, structures génériques et composants non spécifiques dans le cadre d’autres missions.</p>
            </Article>

            <Article n={31} title="Fichiers sources et fichiers de travail">
              <p>Les fichiers sources ou éditables ne sont pas automatiquement compris dans une prestation.</p>
              <p>Sont notamment concernés :</p>
              <List
                items={[
                  'fichiers Figma éditables',
                  'bibliothèques',
                  'Design Systems',
                  'fichiers de travail',
                  'historiques de versions',
                  'documents internes',
                  'composants sources',
                  'fichiers de production',
                ]}
              />
              <p>
                Ils ne sont remis au Client que lorsqu’ils sont expressément désignés comme <strong className="text-text-primary font-bold">livrables</strong> dans le devis ou l’offre.
              </p>
              <p>Lorsqu’ils sont compris dans la prestation, leur remise définitive peut être conditionnée au paiement intégral des sommes correspondantes.</p>
              <p>Pendant la mission, Flowdee peut fournir uniquement un accès de consultation ou de commentaire à ses fichiers de production.</p>
            </Article>

            <Article n={32} title="Éléments fournis par le Client">
              <p>Le Client garantit qu’il dispose des droits et autorisations nécessaires pour utiliser et transmettre à Flowdee les éléments qu’il fournit, notamment :</p>
              <List items={['textes', 'photographies', 'vidéos', 'logos', 'marques', 'polices', 'bases de données', 'illustrations', 'documents', 'contenus tiers']} />
              <p>Flowdee ne peut être tenu responsable d’une atteinte aux droits d’un tiers résultant directement d’éléments imposés ou fournis par le Client sans information sur leur caractère illicite.</p>
              <p>Le Client professionnel répond des conséquences d’une réclamation liée à des éléments qu’il a fournis lorsque cette réclamation résulte de l’absence des droits ou autorisations nécessaires.</p>
            </Article>

            <Article n={33} title="Ressources tierces">
              <p>Une prestation peut intégrer ou recommander des ressources provenant de tiers, notamment :</p>
              <List items={['polices', 'photographies', 'icônes', 'plugins', 'logiciels', 'bibliothèques', 'services SaaS']} />
              <p>Les droits attachés à ces ressources restent régis par les licences de leurs propriétaires respectifs.</p>
              <p>Sauf mention contraire, le prix de Flowdee ne comprend pas les licences tierces payantes nécessaires à l’exploitation finale.</p>
              <p>Le Client est informé de ces coûts lorsqu’ils sont identifiés au cours de la mission.</p>
            </Article>

            <Article n={34} title="Confidentialité">
              <p>Chaque partie s’engage à préserver la confidentialité des informations de l’autre partie qui :</p>
              <List items={['sont expressément identifiées comme confidentielles', 'ou présentent manifestement un caractère confidentiel']} />
              <p>Cette obligation concerne notamment :</p>
              <List
                items={[
                  'données métier',
                  'données utilisateurs',
                  'documents stratégiques',
                  'informations commerciales',
                  'accès techniques',
                  'informations financières',
                  'produits non encore publics',
                ]}
              />
              <p>Un accord de confidentialité spécifique peut compléter les présentes CGV.</p>
              <p>Les obligations résultant d’un NDA signé entre les parties prévalent sur les présentes dispositions lorsqu’elles sont plus strictes.</p>
            </Article>

            <Article n={35} title="Portfolio et références">
              <p>Pour les Clients professionnels, sauf interdiction contractuelle, NDA ou opposition écrite communiquée avant publication, Flowdee peut, après la mise à disposition publique du projet, mentionner la collaboration dans son portfolio et sa communication professionnelle.</p>
              <p>Cette présentation est limitée aux informations devenues publiques et ne doit pas révéler d’informations confidentielles.</p>
              <p>Elle peut notamment comprendre :</p>
              <List items={['nom du Client', 'logo', 'nature de la mission', 'captures d’écran publiques', 'extraits non confidentiels des livrables']} />
              <p>Pour les Clients consommateurs particuliers, toute utilisation identifiable du projet comme référence nécessite leur accord préalable lorsqu’il est requis.</p>
            </Article>

            <Article n={36} title="Obligation de moyens et absence de garantie de résultat commercial">
              <p>Flowdee réalise ses prestations avec le soin et les compétences normalement attendus dans son domaine d’activité.</p>
              <p>Sauf engagement contractuel express, Flowdee ne garantit aucun résultat économique ou commercial déterminé.</p>
              <p>Les prestations ne garantissent notamment pas :</p>
              <List
                items={[
                  'une augmentation donnée du chiffre d’affaires',
                  'un niveau précis de conversion',
                  'un nombre déterminé d’utilisateurs',
                  'un classement précis dans Google',
                  'un volume de trafic',
                  'une levée de fonds',
                  'une adoption produit',
                  'un résultat commercial déterminé',
                ]}
              />
              <p>Les recommandations reposent notamment sur les informations, contraintes et données disponibles au moment de la mission.</p>
              <p>Les décisions finales de développement, de mise en production, d’exploitation et de stratégie restent de la responsabilité du Client.</p>
            </Article>

            <Article n={37} title="Responsabilité — Clients professionnels">
              <p>Pour les Clients professionnels, sauf disposition légale impérative contraire, faute lourde ou dolosive ou atteinte corporelle, la responsabilité contractuelle de Flowdee au titre d’une mission est limitée aux dommages directs, certains et prévisibles directement imputables à un manquement prouvé de Flowdee.</p>
              <p>Sont notamment considérés comme indirects, dans les limites autorisées par la loi :</p>
              <List
                items={[
                  'perte de chiffre d’affaires',
                  'perte de marge',
                  'perte de clientèle',
                  'perte d’opportunité commerciale',
                  'perte d’image',
                  'perte indirecte de données',
                  'conséquences économiques résultant d’une décision prise par le Client',
                ]}
              />
              <p>Sauf disposition impérative contraire, le montant total des dommages et intérêts pouvant être mis à la charge de Flowdee au titre d’une mission professionnelle est plafonné au montant HT effectivement payé à Flowdee pour la prestation directement à l’origine du dommage.</p>
              <p>Cette limitation ne peut avoir pour effet de priver de sa substance une obligation essentielle de Flowdee.</p>
            </Article>

            <Article n={38} title="Responsabilité — consommateurs">
              <p>Les limitations prévues pour les Clients professionnels ne s’appliquent pas lorsqu’elles seraient incompatibles avec les dispositions impératives protégeant les consommateurs.</p>
              <p>Aucune disposition des présentes CGV n’a pour objet de supprimer ou limiter un droit à réparation reconnu impérativement au consommateur par la loi.</p>
            </Article>

            <Article n={39} title="Services développés ou exploités par des tiers">
              <p>Flowdee peut recommander ou utiliser des outils exploités par des tiers.</p>
              <p>Flowdee ne maîtrise pas les modifications, interruptions, changements tarifaires ou évolutions techniques décidés par ces fournisseurs après la livraison de la prestation.</p>
              <p>Sauf engagement spécifique de maintenance, Flowdee n’est pas responsable des évolutions ultérieures de services tiers indépendants de son intervention.</p>
            </Article>

            <Article n={40} title="Force majeure">
              <p>Aucune partie ne peut être tenue responsable d’un manquement directement provoqué par un événement présentant les caractéristiques de la force majeure au sens du droit français.</p>
              <p>La partie affectée informe l’autre partie dans un délai raisonnable.</p>
              <p>Lorsque l’empêchement est temporaire, les obligations affectées peuvent être suspendues pendant sa durée.</p>
              <p>Lorsque la poursuite du contrat devient définitivement impossible, les conséquences sont déterminées conformément aux dispositions légales applicables.</p>
            </Article>

            <Article n={41} title="Données personnelles">
              <p>
                Les traitements de données personnelles réalisés par Flowdee sont décrits dans sa Politique de confidentialité accessible sur{' '}
                <Link to="/politique-de-confidentialite" className="text-accent-primary hover:underline">
                  flowdee.fr/politique-de-confidentialite
                </Link>
                .
              </p>
            </Article>

            <Article n={42} title="Médiation de la consommation">
              <p>Le présent article concerne exclusivement les Clients consommateurs.</p>
              <p>Après avoir adressé une réclamation écrite préalable à Flowdee et en l’absence de solution satisfaisante, le consommateur peut recourir gratuitement au médiateur de la consommation dont relève Flowdee.</p>
              <div className="border-l-4 border-accent-primary/60 bg-accent-tint/30 rounded-r-xl pl-4 py-3">
                <p className="text-text-primary/90 italic">
                  Flowdee n’a pas encore adhéré à un médiateur de la consommation référencé. Cette section sera complétée avec le nom, l’adresse et le site du médiateur effectivement rattaché dès l’adhésion — conformément à la loi, aucun médiateur ne peut être indiqué avant cette étape.
                </p>
              </div>
            </Article>

            <Article n={43} title="Réclamations">
              <p>Toute réclamation peut être adressée à :</p>
              <p>
                <strong className="text-text-primary font-bold">Flowdee — Benjamin Duffau</strong><br />
                21 avenue du Maréchal Leclerc<br />
                33290 Parempuyre<br />
                France
              </p>
              <p>
                E-mail : <a href="mailto:contact@flowdee.fr" className="text-accent-primary hover:underline">contact@flowdee.fr</a>
              </p>
              <p>Les parties sont invitées à rechercher en priorité une solution amiable.</p>
            </Article>

            <Article n={44} title="Droit applicable">
              <p>Les présentes CGV et les contrats conclus avec Flowdee sont soumis au droit français.</p>
              <p>Les consommateurs conservent le bénéfice des règles impératives de protection et de compétence juridictionnelle qui leur sont applicables.</p>
              <p>Pour les Clients professionnels, les juridictions compétentes sont déterminées conformément aux règles applicables et aux éventuelles conditions particulières valablement convenues entre les parties.</p>
            </Article>

            <Article n={45} title="Indépendance des clauses">
              <p>Si une disposition des présentes CGV est déclarée nulle, inapplicable ou non opposable, les autres stipulations restent applicables lorsque le contrat peut raisonnablement subsister sans la disposition concernée.</p>
            </Article>

            <Article n={46} title="Modification des CGV">
              <p>Flowdee peut modifier les présentes CGV pour les commandes futures.</p>
              <p>La version applicable à une prestation est celle communiquée ou acceptée lors de la conclusion du contrat.</p>
              <p>Une modification ultérieure ne modifie pas rétroactivement un contrat déjà conclu sans accord des parties ou disposition légale contraire.</p>
            </Article>

            {/* Annexe */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-6">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                Annexe — Formulaire type de rétractation
              </h2>
              <div className="space-y-4 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>Ce formulaire concerne uniquement les Clients consommateurs bénéficiant d’un droit légal de rétractation.</p>
                <p>
                  Vous pouvez également exercer votre droit de rétractation directement en ligne depuis notre{' '}
                  <Link to="/se-retracter" className="text-accent-primary hover:underline">
                    formulaire de rétractation
                  </Link>
                  .
                </p>
                <p>À l’attention de :</p>
                <p>
                  <strong className="text-text-primary font-bold">Flowdee — Benjamin Duffau</strong><br />
                  Entrepreneur individuel<br />
                  21 avenue du Maréchal Leclerc<br />
                  33290 Parempuyre<br />
                  France<br />
                  E-mail : <a href="mailto:contact@flowdee.fr" className="text-accent-primary hover:underline">contact@flowdee.fr</a>
                </p>
                <p>Je vous informe par la présente de ma décision de me rétracter du contrat concernant la prestation suivante :</p>

                <div className="grid grid-cols-1 gap-5 pt-2">
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Prestation commandée</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Date de conclusion de la commande</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Référence de commande</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Nom et prénom</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Adresse</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">E-mail</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Date</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">
                      Signature (uniquement lorsque le formulaire est transmis sur papier)
                    </p>
                    <Blank />
                  </div>
                </div>
              </div>
            </article>

            {/* Note informative de fin — pas un article numéroté, comme dans le texte source */}
            <article className="bg-surface-1 p-10 rounded-[32px] border border-border-0 space-y-6">
              <h2 className="text-xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                Information importante concernant le démarrage anticipé
              </h2>
              <div className="space-y-4 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>
                  Lorsqu’un consommateur demande que Flowdee commence la prestation avant l’expiration du délai de rétractation, l’interface de commande doit recueillir séparément et explicitement cette demande.
                </p>
                <p>Exemple :</p>
                <div className="bg-surface-0 border border-border-0 rounded-2xl p-5 font-body text-[14px] text-text-primary/90 space-y-3">
                  <p>☐ Je demande expressément que Flowdee commence l’exécution de la prestation avant l’expiration du délai légal de rétractation de 14 jours.</p>
                  <p>☐ Je reconnais qu’une fois la prestation pleinement exécutée, je perdrai mon droit de rétractation dans les conditions prévues par la loi.</p>
                </div>
                <p>Ces cases ne doivent pas être précochées.</p>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </>
  );
}

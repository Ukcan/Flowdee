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
    description: 'Conditions générales de vente de Flowdee : offres, tarifs, modalités de paiement, livraison et rétractation.',
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
              <p>Les présentes Conditions Générales de Vente, ci-après « CGV », sont proposées par :</p>
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
              <p>Ci-après désigné « Flowdee ».</p>
            </Article>

            <Article n={2} title="Objet et champ d’application">
              <p>Les présentes CGV définissent les conditions dans lesquelles Flowdee fournit à ses clients des prestations liées notamment à :</p>
              <List
                items={[
                  "l'UX Design",
                  "l'UI Design",
                  "l'audit UX et conversion",
                  "l'analyse de parcours et interfaces numériques",
                  'la conception et l’optimisation de produits numériques',
                  'la recherche et aux tests utilisateurs',
                  'la conception de prototypes et interfaces',
                  "l'optimisation de l'accessibilité numérique",
                  "l'optimisation SEO liée à l'expérience utilisateur",
                  'l’accompagnement Product Design',
                  'la création, documentation ou optimisation de Design Systems',
                  'et, plus généralement, les prestations numériques décrites sur le Site, dans un devis ou dans une proposition commerciale',
                ]}
              />
              <p>
                Les prestations peuvent être fournies aussi bien à des <strong className="text-text-primary font-bold">clients professionnels</strong> qu’à des{' '}
                <strong className="text-text-primary font-bold">clients consommateurs particuliers</strong>.
              </p>
              <p>
                Le terme « Client » désigne indifféremment l’un ou l’autre lorsqu’aucune distinction n’est nécessaire.
              </p>
              <p>
                Les dispositions expressément réservées aux consommateurs ne s’appliquent qu’aux Clients ayant cette qualité au sens du Code de la consommation.
              </p>
            </Article>

            <Article n={3} title="Documents contractuels">
              <p>Le contrat peut notamment être constitué :</p>
              <List
                items={[
                  'des présentes CGV',
                  'de la page décrivant la prestation commandée',
                  'du devis ou de la proposition commerciale acceptée',
                  'du bon de commande éventuel',
                  'des éventuelles conditions particulières convenues par écrit entre Flowdee et le Client',
                ]}
              />
              <p>
                En cas de contradiction, les conditions particulières ou le devis expressément accepté prévalent sur les présentes CGV pour les éléments spécifiques à la prestation concernée.
              </p>
            </Article>

            <Article n={4} title="Caractéristiques des prestations">
              <p>
                Les caractéristiques essentielles de chaque prestation sont présentées avant la commande sur le Site, dans le devis ou dans la proposition commerciale correspondante.
              </p>
              <p>À la date des présentes, Flowdee propose notamment des prestations telles que :</p>

              <h3 className="font-heading text-[18px] text-text-primary mt-6" style={{ fontWeight: 500 }}>
                Audit UX &amp; Conversion
              </h3>
              <p>
                Analyse d’un parcours critique, d’une landing page ou d’un périmètre pouvant comprendre jusqu’à cinq écrans ou pages selon l’offre présentée sur le Site.
              </p>
              <p>Les éléments livrés peuvent comprendre notamment :</p>
              <List
                items={[
                  'problèmes UX identifiés et priorisés',
                  'recommandations actionnables',
                  'contrôles SEO UX et accessibilité prévus dans l’offre',
                  'microcopy prioritaire',
                  'correction ou proposition concernant un écran clé',
                  'rapport final priorisé',
                ]}
              />

              <h3 className="font-heading text-[18px] text-text-primary mt-6" style={{ fontWeight: 500 }}>
                Product Sprint + Tests
              </h3>
              <p>La prestation peut notamment comprendre :</p>
              <List
                items={[
                  'cadrage',
                  'user flow',
                  'wireframes',
                  'prototype interactif',
                  'tests utilisateurs',
                  'itération',
                  'interface finale',
                  'transmission des éléments destinés au développement',
                ]}
              />
              <p>Le périmètre exact est celui décrit sur le Site ou dans le devis accepté.</p>

              <h3 className="font-heading text-[18px] text-text-primary mt-6" style={{ fontWeight: 500 }}>
                Accompagnement Product Designer / Fractional Product Designer
              </h3>
              <p>
                L’accompagnement est réalisé selon le volume, la durée, les disponibilités et le périmètre définis dans le devis ou la proposition commerciale acceptée.
              </p>
              <p>Aucune prestation non expressément comprise dans l’offre ou le devis ne peut être considérée comme incluse.</p>
            </Article>

            <Article n={5} title="Prix">
              <p>Les prix applicables sont ceux présentés au Client avant la conclusion de la commande ou ceux figurant dans le devis accepté.</p>
              <p>Les prix sont exprimés en euros.</p>
              <div className="border-l-4 border-accent-primary pl-4">
                <p className="text-text-primary/90">
                  Régime de TVA : <strong className="text-text-primary font-bold">TVA non applicable — article 293 B du Code général des impôts</strong> (franchise en base de TVA).
                </p>
              </div>
              <p>Les éventuels frais supplémentaires sont indiqués au Client avant la conclusion du contrat.</p>
              <p>Toute prestation supplémentaire ou modification substantielle du périmètre peut faire l’objet d’un devis complémentaire.</p>
            </Article>

            <Article n={6} title="Commande">
              <p>La commande peut être réalisée :</p>
              <List
                items={[
                  'directement sur le Site lorsqu’une prestation est disponible à l’achat',
                  'par acceptation d’un devis',
                  'par validation écrite d’une proposition commerciale selon les modalités indiquées par Flowdee',
                ]}
              />
              <p>Avant une commande en ligne, le Client doit pouvoir prendre connaissance :</p>
              <List
                items={[
                  'des caractéristiques essentielles de la prestation',
                  'de son prix total',
                  'de son délai ou de sa date d’exécution',
                  'des présentes CGV',
                  'des informations relatives au droit de rétractation lorsqu’il s’applique',
                ]}
              />
              <p>
                Lorsque la commande est assortie d’une obligation de paiement, l’interface de commande doit indiquer sans ambiguïté que sa validation entraîne une obligation de paiement.
              </p>
              <p>Après une commande en ligne, Flowdee adresse au Client une confirmation de commande sur un support durable, notamment par courrier électronique.</p>
            </Article>

            <Article n={7} title="Paiement">
              <p>Pour les prestations directement commandées et payées sur le Site, le montant indiqué est payable selon les modalités présentées lors de la commande.</p>
              <p>Pour les prestations faisant l’objet d’un devis, les modalités de paiement, échéances et éventuels acomptes sont définis dans ce devis.</p>
              <p>Les moyens de paiement acceptés sont indiqués au moment de la commande.</p>
              <p>
                Le traitement technique du paiement est assuré par : <strong className="text-text-primary font-bold">Stripe</strong>.
              </p>
              <p>Flowdee ne facture aucun supplément au Client en raison de l’utilisation d’un moyen de paiement lorsque la législation l’interdit.</p>
            </Article>

            <Article n={8} title="Dispositions spécifiques aux Clients professionnels — retard de paiement">
              <p>
                Pour les Clients professionnels uniquement, toute somme non réglée à son échéance entraîne, de plein droit et sans rappel préalable, l’application de pénalités de retard calculées sur la base d’un taux égal à{' '}
                <strong className="text-text-primary font-bold">trois fois le taux d’intérêt légal en vigueur</strong>, sans pouvoir être inférieur au minimum légal applicable.
              </p>
              <p>
                Une indemnité forfaitaire de <strong className="text-text-primary font-bold">40 euros pour frais de recouvrement</strong> est également due de plein droit par tout Client professionnel en situation de retard de paiement.
              </p>
              <p>
                Lorsque les frais de recouvrement effectivement engagés sont supérieurs à cette indemnité, une indemnisation complémentaire peut être demandée sur justificatifs dans les conditions prévues par la loi.
              </p>
              <p>Aucun escompte n’est accordé pour paiement anticipé, sauf disposition contraire indiquée dans le devis.</p>
              <p>Ces dispositions ne s’appliquent pas aux consommateurs.</p>
            </Article>

            <Article n={9} title="Délais d’exécution">
              <p>Le délai applicable à la prestation est communiqué avant la commande sur le Site ou dans le devis.</p>
              <p>
                Pour l’offre Audit UX &amp; Conversion actuellement présentée sur le Site, le délai annoncé est de{' '}
                <strong className="text-text-primary font-bold">5 jours ouvrés</strong>, sous réserve de la réception de l’ensemble des éléments nécessaires au démarrage de la prestation.
              </p>
              <p>Pour les autres prestations, le calendrier est défini dans l’offre, le devis ou avec le Client.</p>
              <p>Tout retard dans la transmission par le Client des informations, fichiers, accès, validations ou autres éléments nécessaires peut entraîner un report proportionné du calendrier.</p>
              <p>Flowdee informe le Client lorsqu’un événement est susceptible d’avoir une incidence significative sur le délai annoncé.</p>
            </Article>

            <Article n={10} title="Collaboration du Client">
              <p>Le Client s’engage à fournir dans des délais raisonnables :</p>
              <List
                items={[
                  'les informations nécessaires à la réalisation de la prestation',
                  'les accès nécessaires',
                  'les fichiers et contenus nécessaires',
                  'les validations nécessaires',
                  'des informations exactes et licites',
                ]}
              />
              <p>Le Client garantit qu’il dispose des droits nécessaires sur les documents, marques, textes, données, visuels et autres éléments qu’il transmet à Flowdee.</p>
              <p>Flowdee ne peut être tenu responsable d’un retard ou d’une impossibilité d’exécution résultant directement d’informations manquantes, incorrectes ou transmises tardivement par le Client.</p>
            </Article>

            <Article n={11} title="Modifications du périmètre">
              <p>Les demandes qui ne relèvent pas du périmètre initial peuvent entraîner :</p>
              <List
                items={['une modification du calendrier', 'une facturation supplémentaire', 'l’établissement d’un devis complémentaire']}
              />
              <p>Flowdee en informe le Client avant d’engager les travaux supplémentaires concernés.</p>
            </Article>

            <Article n={12} title="Droit de rétractation des consommateurs">
              <p>Le présent article concerne les Clients ayant la qualité de consommateur.</p>
              <p>
                Lorsqu’un contrat de prestation de services est conclu à distance, notamment sur internet, le consommateur dispose d’un délai de{' '}
                <strong className="text-text-primary font-bold">14 jours</strong> à compter de la conclusion du contrat pour exercer son droit de rétractation sans avoir à justifier sa décision.
              </p>
              <p>Pour exercer ce droit, le consommateur peut utiliser :</p>
              <List
                items={[
                  'le formulaire type figurant en annexe des présentes CGV',
                  'ou toute autre déclaration claire exprimant sa volonté de se rétracter, notamment par e-mail',
                ]}
              />
              <p>
                La demande peut notamment être adressée à :{' '}
                <a href="mailto:contact@flowdee.fr" className="text-accent-primary hover:underline">contact@flowdee.fr</a>
              </p>
              <p>Lorsque le droit de rétractation est exercé valablement, Flowdee rembourse les sommes concernées dans les conditions et délais prévus par la législation applicable.</p>
            </Article>

            <Article n={13} title="Commencement de la prestation avant la fin du délai de rétractation">
              <p>
                Certaines prestations Flowdee, notamment l’Audit UX &amp; Conversion annoncé avec une livraison sous 5 jours ouvrés, peuvent être exécutées avant l’expiration du délai légal de rétractation de 14 jours.
              </p>
              <p>Si un consommateur souhaite que l’exécution commence avant la fin de ce délai, Flowdee recueille préalablement sa demande expresse.</p>
              <p>
                Si le consommateur se rétracte après avoir expressément demandé le commencement de l’exécution, il devra verser un montant proportionnel aux prestations effectivement fournies jusqu’à la communication de sa décision de se rétracter, conformément à la législation applicable.
              </p>
              <p>Lorsque la prestation a été pleinement exécutée avant la fin du délai de rétractation, le droit de rétractation est perdu uniquement si :</p>
              <List
                items={[
                  'son exécution a commencé avec l’accord préalable et exprès du consommateur',
                  'et le consommateur a reconnu qu’il perdrait son droit de rétractation lorsque la prestation serait pleinement exécutée',
                ]}
              />
            </Article>

            <Article n={14} title="Exercice de la rétractation">
              <p>
                Flowdee ne dispose pas d’une interface de commande en ligne propre assortie d’un mécanisme de rétractation intégré : le paiement des prestations proposées à la commande directe s’effectue via Stripe, une interface de paiement tierce.
              </p>
              <p>
                Le consommateur exerce donc son droit de rétractation par e-mail ou au moyen du formulaire type figurant en annexe, dans les conditions décrites à l’article 12.
              </p>
              <p>Après la transmission de la demande, Flowdee adresse au consommateur un accusé de réception sur un support durable, comprenant notamment la date et l’heure de la rétractation.</p>
            </Article>

            <Article n={15} title="Annulation hors droit légal de rétractation">
              <p>En dehors des cas dans lesquels un droit légal de rétractation ou de résolution s’applique, toute demande d’annulation est examinée au regard :</p>
              <List
                items={[
                  'de l’état d’avancement de la prestation',
                  'des travaux déjà réalisés',
                  'des dépenses spécifiquement engagées',
                  'des conditions particulières figurant dans le devis',
                ]}
              />
              <p>Aucune clause du présent article ne limite les droits impératifs reconnus au consommateur par la loi.</p>
            </Article>

            <Article n={16} title="Livraison des livrables">
              <p>Les livrables peuvent être transmis notamment :</p>
              <List
                items={['par courrier électronique', 'par lien sécurisé', 'via Figma', 'via un espace collaboratif', 'ou par tout autre outil convenu avec le Client']}
              />
              <p>Le format et la nature des livrables sont ceux prévus dans la prestation commandée.</p>
            </Article>

            <Article n={17} title="Propriété intellectuelle">
              <p>Sauf stipulation contraire prévue dans un devis ou un accord spécifique, Flowdee reste titulaire des droits portant sur :</p>
              <List
                items={[
                  'ses méthodes',
                  'outils',
                  'systèmes',
                  'bibliothèques',
                  'composants génériques',
                  'templates',
                  'savoir-faire',
                  'documents préexistants',
                  'éléments réutilisables indépendamment de la mission',
                ]}
              />
              <p>Les droits portant sur les livrables spécifiquement créés pour le Client sont définis dans le devis ou l’accord correspondant.</p>
              <p>Lorsqu’une cession de droits de propriété intellectuelle est prévue, son étendue, sa destination, son territoire et sa durée doivent être déterminés conformément aux règles applicables.</p>
              <p>Le paiement d’une prestation ne vaut donc pas, à lui seul, cession illimitée de l’ensemble des droits de propriété intellectuelle de Flowdee.</p>
              <p>Le Client garantit disposer des droits nécessaires sur les éléments qu’il fournit à Flowdee.</p>
            </Article>

            <Article n={18} title="Références et confidentialité">
              <p>Flowdee s’engage à traiter comme confidentielles les informations expressément identifiées comme telles ou dont le caractère confidentiel découle manifestement de leur nature.</p>
              <p>Un accord de confidentialité spécifique ou NDA peut être conclu lorsque la mission le nécessite.</p>
              <p>Flowdee ne publie pas comme étude de cas des informations confidentielles ou couvertes par un NDA.</p>
              <p>Toute utilisation publique d’une marque, d’un nom ou d’éléments identifiables appartenant au Client doit respecter les autorisations applicables.</p>
            </Article>

            <Article n={19} title="Responsabilité">
              <p>Flowdee s’engage à réaliser ses prestations avec le soin et les compétences normalement attendus d’un professionnel de son domaine.</p>
              <p>Les recommandations en UX, UI, Product Design, SEO UX, accessibilité ou conversion constituent des prestations de conception, d’analyse ou de conseil dans la limite du périmètre commandé.</p>
              <p>Sauf engagement express contraire, elles ne constituent pas une garantie :</p>
              <List
                items={[
                  'd’augmentation d’un taux de conversion',
                  'de chiffre d’affaires',
                  'de positionnement dans un moteur de recherche',
                  'de conformité juridique exhaustive',
                  'ni de résultat commercial déterminé',
                ]}
              />
              <p>Aucune disposition des présentes CGV n’a pour objet ou pour effet d’exclure ou de limiter une responsabilité lorsque cette exclusion ou limitation est interdite par la loi, notamment à l’égard d’un consommateur.</p>
            </Article>

            <Article n={20} title="Force majeure">
              <p>Aucune partie ne peut être tenue responsable d’un manquement directement causé par un événement présentant les caractéristiques de la force majeure au sens du droit français.</p>
              <p>La partie affectée informe l’autre partie dans un délai raisonnable.</p>
              <p>Lorsque l’empêchement est temporaire, l’exécution de l’obligation est suspendue pendant sa durée, sauf si le retard justifie la résolution du contrat dans les conditions prévues par la loi.</p>
            </Article>

            <Article n={21} title="Données personnelles">
              <p>
                Les données personnelles traitées dans le cadre des commandes et prestations sont traitées conformément à la Politique de confidentialité de Flowdee, accessible sur{' '}
                <Link to="/politique-de-confidentialite" className="text-accent-primary hover:underline">
                  flowdee.fr/politique-de-confidentialite
                </Link>
                .
              </p>
            </Article>

            <Article n={22} title="Médiation de la consommation">
              <p>Le présent article concerne les Clients consommateurs.</p>
              <p>
                Après avoir adressé une réclamation écrite préalable à Flowdee et en l’absence de résolution satisfaisante du litige, le consommateur peut recourir gratuitement au médiateur de la consommation dont relève Flowdee.
              </p>
              <div className="border-l-4 border-accent-primary/60 bg-accent-tint/30 rounded-r-xl pl-4 py-3">
                <p className="text-text-primary/90 italic">
                  Flowdee n’a pas encore adhéré à un médiateur de la consommation référencé. Cette section sera complétée avec le nom, l’adresse et le site du médiateur dès l’adhésion effective — conformément à la loi, aucun médiateur ne peut être indiqué avant cette étape.
                </p>
              </div>
            </Article>

            <Article n={23} title="Réclamations">
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

            <Article n={24} title="Droit applicable et règlement des litiges">
              <p>
                Les présentes CGV et les contrats conclus avec Flowdee sont soumis au <strong className="text-text-primary font-bold">droit français</strong>.
              </p>
              <p>Pour un Client consommateur, les règles impératives déterminant les juridictions compétentes restent pleinement applicables.</p>
              <p>Aucune disposition des présentes CGV ne prive un consommateur des protections impératives dont il bénéficie en vertu de la législation applicable.</p>
              <p>Pour les Clients professionnels, tout litige relève des juridictions compétentes déterminées conformément aux règles de droit commun, sauf convention valable contraire conclue entre les parties.</p>
            </Article>

            <Article n={25} title="Modification des CGV">
              <p>Flowdee peut modifier les présentes CGV pour les commandes futures.</p>
              <p>Les CGV applicables à une commande sont celles portées à la connaissance du Client et acceptées lors de la conclusion du contrat.</p>
              <p>Une modification ultérieure des CGV n’affecte pas rétroactivement un contrat déjà conclu, sauf accord des parties ou disposition légale contraire.</p>
            </Article>

            {/* Annexe */}
            <article className="bg-surface-0 p-10 rounded-[32px] border border-border-0 space-y-6">
              <h2 className="text-2xl font-heading text-text-primary tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                Annexe — Formulaire type de rétractation
              </h2>
              <div className="space-y-4 font-body text-[15px] leading-relaxed text-text-primary/80">
                <p>Le présent formulaire est destiné uniquement aux consommateurs bénéficiant d’un droit de rétractation.</p>
                <p>À l’attention de :</p>
                <p>
                  <strong className="text-text-primary font-bold">Flowdee — Benjamin Duffau</strong><br />
                  21 avenue du Maréchal Leclerc<br />
                  33290 Parempuyre<br />
                  France<br />
                  E-mail : <a href="mailto:contact@flowdee.fr" className="text-accent-primary hover:underline">contact@flowdee.fr</a>
                </p>
                <p>Je vous notifie par la présente ma rétractation du contrat portant sur la prestation suivante :</p>

                <div className="grid grid-cols-1 gap-5 pt-2">
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Prestation commandée</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Date de commande / conclusion du contrat</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Numéro ou référence de commande</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Nom et prénom du consommateur</p>
                    <Blank />
                  </div>
                  <div>
                    <p className="font-body text-[12px] uppercase tracking-[0.14em] text-text-muted mb-1.5">Adresse du consommateur</p>
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
                      Signature du consommateur (uniquement en cas de transmission du présent formulaire sur papier)
                    </p>
                    <Blank />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </>
  );
}

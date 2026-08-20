/**
 * constants/consent — source de vérité de l'enregistrement du consentement.
 *
 * Le choix était stocké tel quel : `{ essential, analytics, marketing }`.
 * Trois manques au regard des recommandations de la CNIL, qu'aucune relecture
 * de l'interface ne pouvait révéler puisqu'ils vivent dans le stockage :
 *
 *  1. AUCUNE DATE. Le consentement — comme le refus — valait donc à vie.
 *     La CNIL recommande de ne pas conserver le choix au-delà de six mois et
 *     de solliciter à nouveau au terme. Sans horodatage, c'était impossible.
 *
 *  2. AUCUNE PREUVE. Le responsable de traitement doit pouvoir démontrer que
 *     le consentement a été donné. Un booléen sans date ne le démontre pas.
 *
 *  3. AUCUNE VERSION. Si les finalités changent — un nouvel outil de mesure,
 *     une nouvelle catégorie — les choix antérieurs portent sur autre chose
 *     et doivent être redemandés. Rien ne permettait de les invalider.
 *
 * Ce module tient les trois, et devient le seul endroit où l'enregistrement
 * est écrit et relu. `CookieBanner` et `analytics` s'y adossent : un lecteur
 * qui appliquerait l'expiration pendant que l'autre l'ignore rechargerait
 * gtag sur un consentement périmé.
 */

export const CONSENT_KEY = 'flowdee-cookie-consent';

/**
 * À incrémenter dès que les finalités changent : outil de mesure ajouté ou
 * remplacé, nouvelle catégorie, changement de destinataire. Les
 * enregistrements portant une version antérieure sont ignorés et le choix est
 * redemandé — ils portaient sur un périmètre qui n'existe plus.
 */
export const CONSENT_VERSION = 1;

/** Six mois, la durée recommandée par la CNIL avant de solliciter à nouveau. */
export const CONSENT_MAX_AGE_MS = 6 * 30 * 24 * 60 * 60 * 1000;

export interface ConsentRecord {
  version: number;
  /** ISO 8601 — la preuve de la date du choix. */
  date: string;
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

export type ConsentChoice = Pick<ConsentRecord, 'analytics' | 'marketing'>;

/**
 * Relit l'enregistrement, ou `null` s'il n'y en a pas, s'il est illisible,
 * s'il porte une version périmée, ou s'il a plus de six mois.
 *
 * `null` a un sens unique et volontaire : « il faut redemander ». Les trois
 * causes se traitent de la même façon, il serait trompeur de les distinguer
 * ici — un refus expiré n'est pas un refus, c'est une absence de choix.
 */
export function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const rec = JSON.parse(raw) as Partial<ConsentRecord>;

    if (rec?.version !== CONSENT_VERSION) return null;
    if (typeof rec.date !== 'string') return null;

    const age = Date.now() - new Date(rec.date).getTime();
    if (!Number.isFinite(age) || age > CONSENT_MAX_AGE_MS) return null;

    return {
      version: CONSENT_VERSION,
      date: rec.date,
      essential: true,
      analytics: rec.analytics === true,
      marketing: rec.marketing === true,
    };
  } catch {
    // Stockage cloisonné (Safari « bloquer tous les cookies », webviews) :
    // on se comporte comme si rien n'avait été choisi, jamais comme si tout
    // avait été accepté.
    return null;
  }
}

/** Écrit le choix en l'horodatant. Retourne l'enregistrement écrit. */
export function writeConsent(choice: ConsentChoice): ConsentRecord {
  const rec: ConsentRecord = {
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
    essential: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(rec));
  } catch {
    /* stockage indisponible : le choix vaut pour la session, le bandeau
       reviendra à la prochaine visite. Préférable à un échec silencieux qui
       laisserait croire le choix enregistré. */
  }
  return rec;
}

/** Le visiteur a-t-il accepté la mesure d'audience, et ce choix est-il encore valide ? */
export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

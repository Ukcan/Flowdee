/**
 * Worker Cloudflare — sert les assets statiques du site et traite en plus
 * `/api/se-retracter` côté serveur (seule route dynamique du projet).
 *
 * `main` dans wrangler.jsonc fait de ce fichier le point d'entrée : toute
 * requête passe d'abord ici. Ce qui n'est pas `/api/se-retracter` est
 * délégué à `env.ASSETS.fetch(request)`, qui reproduit exactement le
 * comportement statique existant (fallback 404, etc.) — rien ne change
 * pour le reste du site.
 */

declare global {
  interface Env {
    RESEND_API_KEY: string;
    /** Adresse qui reçoit la notification interne. Défaut : contact@flowdee.fr. */
    WITHDRAWAL_NOTIFY_TO?: string;
  }
}

interface WithdrawalRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orderReference: string;
  submittedAt: string;
  status: 'received' | 'processed';
}

const YEAR_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans O/0, I/1 (ambigus)
const MAX_FIELD_LENGTH = 200;
const IDEMPOTENCY_TTL_SECONDS = 60 * 60 * 24; // 24h : couvre largement un double clic ou un retry réseau
const THROTTLE_TTL_SECONDS = 60 * 5; // 5 min entre deux demandes pour le même e-mail

// Expéditeur sur un sous-domaine dédié, vérifié côté Resend. La racine
// flowdee.fr porte déjà le SPF d'IONOS (`include:_spf-eu.ionos.com`) pour la
// messagerie contact@flowdee.fr ; un domaine ne peut avoir qu'un seul SPF, donc
// isoler l'envoi transactionnel ici évite d'y toucher. Les réponses des clients
// repartent vers la boîte réelle via reply_to.
const MAIL_FROM = 'Flowdee <contact@send.flowdee.fr>';
const MAIL_REPLY_TO = 'contact@flowdee.fr';

function randomCode(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (const b of bytes) out += YEAR_CODE_ALPHABET[b % YEAR_CODE_ALPHABET.length];
  return out;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function isValidEmail(value: string): boolean {
  // Volontairement simple : la vérification stricte d'adresse e-mail n'a pas
  // de définition unique, et Resend refusera de toute façon une adresse
  // invalide à l'envoi.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanField(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_FIELD_LENGTH) : '';
}

async function handleWithdrawal(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_body', message: 'Requête invalide.' }, 400);
  }

  // Honeypot : champ que seul un bot remplit. On répond un faux succès
  // plutôt qu'une erreur, pour ne pas aider un bot à affiner ses tentatives —
  // sans créer d'enregistrement réel.
  if (cleanField(body.company)) {
    return jsonResponse(
      { id: `RET-${new Date().getFullYear()}-000000`, orderReference: cleanField(body.orderReference), submittedAt: new Date().toISOString(), status: 'received' },
      200
    );
  }

  const firstName = cleanField(body.firstName);
  const lastName = cleanField(body.lastName);
  const email = cleanField(body.email);
  const orderReference = cleanField(body.orderReference);
  const idempotencyKey = cleanField(body.idempotencyKey);

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = 'Renseignez votre prénom.';
  if (!lastName) fieldErrors.lastName = 'Renseignez votre nom.';
  if (!email || !isValidEmail(email)) fieldErrors.email = 'Saisissez une adresse e-mail valide.';
  if (!orderReference) fieldErrors.orderReference = 'Renseignez votre référence de commande.';
  if (Object.keys(fieldErrors).length > 0) {
    return jsonResponse({ error: 'validation', fields: fieldErrors }, 400);
  }

  // Rejoue une demande déjà traitée avec la même clé (double clic, retry
  // réseau) au lieu d'en créer une seconde.
  if (idempotencyKey) {
    const existing = await env.WITHDRAWAL_KV.get(`idem:${idempotencyKey}`);
    if (existing) {
      const cached = JSON.parse(existing) as Pick<WithdrawalRequest, 'id' | 'orderReference' | 'submittedAt' | 'status'>;
      return jsonResponse(cached, 200);
    }
  }

  const throttleKey = `throttle:${email.toLowerCase()}`;
  if (await env.WITHDRAWAL_KV.get(throttleKey)) {
    return jsonResponse(
      { error: 'throttled', message: 'Une demande a déjà été enregistrée récemment pour cet e-mail. Contactez-nous si besoin à contact@flowdee.fr.' },
      429
    );
  }

  const year = new Date().getFullYear();
  let id = '';
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = `RET-${year}-${randomCode(6)}`;
    if (!(await env.WITHDRAWAL_KV.get(`withdrawal:${candidate}`))) {
      id = candidate;
      break;
    }
  }
  if (!id) {
    return jsonResponse({ error: 'server_error', message: "Votre demande n'a pas pu être transmise. Réessayez ou contactez contact@flowdee.fr." }, 500);
  }

  const record: WithdrawalRequest = {
    id,
    firstName,
    lastName,
    email,
    orderReference,
    submittedAt: new Date().toISOString(),
    status: 'received',
  };

  // L'enregistrement est la seule étape qui conditionne le succès renvoyé au
  // client : c'est la preuve légale de la demande. Les e-mails ci-dessous
  // sont best-effort — leur échec ne doit pas empêcher une rétractation
  // valablement reçue d'être confirmée.
  try {
    await env.WITHDRAWAL_KV.put(`withdrawal:${id}`, JSON.stringify(record));
    await env.WITHDRAWAL_KV.put(throttleKey, '1', { expirationTtl: THROTTLE_TTL_SECONDS });
  } catch (err) {
    console.error('withdrawal: échec enregistrement KV', err);
    return jsonResponse({ error: 'server_error', message: "Votre demande n'a pas pu être transmise. Réessayez ou contactez contact@flowdee.fr." }, 500);
  }

  const successBody = { id: record.id, orderReference: record.orderReference, submittedAt: record.submittedAt, status: record.status };

  if (idempotencyKey) {
    await env.WITHDRAWAL_KV
      .put(`idem:${idempotencyKey}`, JSON.stringify(successBody), { expirationTtl: IDEMPOTENCY_TTL_SECONDS })
      .catch((err) => console.error('withdrawal: échec enregistrement idempotency', err));
  }

  await Promise.allSettled([sendNotificationEmail(env, record), sendAcknowledgementEmail(env, record)]);

  return jsonResponse(successBody, 200);
}

async function sendEmail(env: Env, to: string, subject: string, text: string): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.error('withdrawal: RESEND_API_KEY manquante, e-mail non envoyé', { to, subject });
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      reply_to: MAIL_REPLY_TO,
      to: [to],
      subject,
      text,
    }),
  });
  if (!res.ok) {
    console.error('withdrawal: échec envoi e-mail Resend', res.status, await res.text().catch(() => ''));
  }
}

async function sendNotificationEmail(env: Env, r: WithdrawalRequest): Promise<void> {
  const to = env.WITHDRAWAL_NOTIFY_TO || 'contact@flowdee.fr';
  const text = `Nouvelle demande de rétractation\n\nRéférence :\n${r.id}\n\nCommande :\n${r.orderReference}\n\nClient :\n${r.firstName} ${r.lastName}\n\nE-mail :\n${r.email}\n\nReçue le :\n${r.submittedAt}\n`;
  await sendEmail(env, to, `Nouvelle demande de rétractation — ${r.orderReference}`, text);
}

async function sendAcknowledgementEmail(env: Env, r: WithdrawalRequest): Promise<void> {
  const text = `Bonjour ${r.firstName},\n\nVotre demande de rétractation concernant la commande\n${r.orderReference} a bien été reçue par Flowdee.\n\nRéférence de votre demande :\n${r.id}\n\nDate et heure de réception :\n${r.submittedAt}\n\nConservez cet e-mail comme preuve de votre demande.\n\nFlowdee\ncontact@flowdee.fr\n`;
  await sendEmail(env, r.email, 'Confirmation de votre demande de rétractation — Flowdee', text);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/se-retracter') {
      try {
        return await handleWithdrawal(request, env);
      } catch (err) {
        console.error('withdrawal: erreur inattendue', err);
        return jsonResponse({ error: 'server_error', message: "Votre demande n'a pas pu être transmise. Réessayez ou contactez contact@flowdee.fr." }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  },
};

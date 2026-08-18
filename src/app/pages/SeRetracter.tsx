import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ButtonPrimary } from '../components/Button/Primary';
import { ButtonSecondary } from '../components/Button/Secondary';
import { useSeo } from '../hooks/useSeo';

/**
 * /se-retracter — fonctionnalité interactive de rétractation en ligne.
 *
 * L'annexe CGV (formulaire type) reste le modèle légal de référence ;
 * cette page transmet la même demande à Flowdee de façon structurée,
 * horodatée et traçable (voir worker/index.ts pour le traitement serveur).
 */

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  orderReference: string;
  /** Honeypot — jamais rempli par un humain, ne s'affiche pas visuellement. */
  company: string;
}

const EMPTY_FORM: FormState = { firstName: '', lastName: '', email: '', orderReference: '', company: '' };

type Step = 'form' | 'confirm';

interface SuccessResult {
  id: string;
  orderReference: string;
  submittedAt: string;
}

function trackEvent(name: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name);
  }
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-body text-[13px] font-medium text-text-primary mb-2">
        {label}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            id,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
          })
        : children}
      {hint && (
        <p id={hintId} className="mt-1.5 font-body text-[12px] text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 font-body text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  'w-full min-h-[44px] px-4 py-2.5 rounded-[var(--radius-button)] bg-surface-1 border border-border-0 text-text-primary font-body text-[15px] placeholder:text-text-muted outline-none transition-colors focus-visible:border-accent-primary focus-visible:ring-2 focus-visible:ring-focus-ring aria-[invalid=true]:border-red-400';

export function SeRetracterPage() {
  const navigate = useNavigate();
  useSeo({
    title: 'Exercer mon droit de rétractation | Flowdee',
    description: 'Formulaire de rétractation en ligne pour les consommateurs ayant commandé une prestation Flowdee.',
    canonical: 'https://flowdee.fr/se-retracter/',
    robots: 'noindex, follow',
  });

  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<SuccessResult | null>(null);

  const firstFieldRef = useRef<HTMLInputElement>(null);
  const idempotencyKey = useRef<string>(crypto.randomUUID());
  const startedTracked = useRef(false);

  const formHeadingId = useId();

  useEffect(() => {
    if (!startedTracked.current) {
      startedTracked.current = true;
      trackEvent('withdrawal_form_started');
    }
  }, []);

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = 'Renseignez votre prénom.';
    if (!form.lastName.trim()) next.lastName = 'Renseignez votre nom.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Saisissez une adresse e-mail valide.';
    }
    if (!form.orderReference.trim()) next.orderReference = 'Renseignez votre référence de commande.';
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const order: (keyof FormState)[] = ['firstName', 'lastName', 'email', 'orderReference'];
      const firstInvalid = order.find((k) => next[k]);
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
      }
      return false;
    }
    return true;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep('confirm');
  };

  const handleModify = () => {
    setStep('form');
    setTimeout(() => firstFieldRef.current?.focus(), 0);
  };

  const handleConfirm = async () => {
    if (submitting) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/se-retracter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, idempotencyKey: idempotencyKey.current }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || data.error) {
        if (data?.error === 'validation' && data.fields) {
          setErrors(data.fields);
          setStep('form');
          setServerError(null);
        } else {
          setServerError(data?.message || "Votre demande n'a pas pu être transmise. Réessayez ou contactez contact@flowdee.fr.");
        }
        return;
      }
      setResult({ id: data.id, orderReference: data.orderReference, submittedAt: data.submittedAt });
      trackEvent('withdrawal_form_submitted');
    } catch {
      setServerError("Votre demande n'a pas pu être transmise. Réessayez ou contactez contact@flowdee.fr.");
    } finally {
      setSubmitting(false);
    }
  };

  const formattedDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <>
      {/* Fil d'Ariane */}
      <nav aria-label="Fil d’Ariane" className="max-w-[720px] mx-auto px-8 md:px-16 pt-28 md:pt-32">
        <ol className="flex items-center gap-2 font-body text-[12px] text-text-muted">
          <li>
            <Link to="/" className="hover:text-accent-primary transition-colors underline-offset-4 hover:underline">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary" aria-current="page">Se rétracter</li>
        </ol>
      </nav>

      <div className="max-w-[720px] mx-auto px-8 md:px-16 py-12 md:py-16">
        <div className="space-y-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-[-0.02em] leading-[1.1]" style={{ fontWeight: 300 }}>
            Exercer mon droit de <span className="text-accent-primary">rétractation</span>
          </h1>
          <p className="body-large">
            Utilisez ce formulaire pour nous notifier votre décision de vous rétracter d’une prestation Flowdee lorsque vous bénéficiez d’un droit légal de rétractation.
          </p>
          <p className="font-body text-[13px] text-text-muted">Vous n’avez pas à indiquer le motif de votre décision.</p>
        </div>

        {result ? (
          <div className="bg-surface-0 border border-border-0 rounded-[32px] p-8 md:p-10 space-y-6" role="status" aria-live="polite">
            <h2 className="text-2xl font-heading text-text-primary" style={{ fontWeight: 500 }}>
              Votre demande a bien été transmise
            </h2>
            <p className="body">Votre demande de rétractation a été reçue par Flowdee.</p>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div>
                <dt className="font-body text-[11px] uppercase tracking-[0.14em] text-text-muted mb-1">Référence de la demande</dt>
                <dd className="font-body text-[15px] text-text-primary font-medium">{result.id}</dd>
              </div>
              <div>
                <dt className="font-body text-[11px] uppercase tracking-[0.14em] text-text-muted mb-1">Commande</dt>
                <dd className="font-body text-[15px] text-text-primary font-medium">{result.orderReference}</dd>
              </div>
              <div>
                <dt className="font-body text-[11px] uppercase tracking-[0.14em] text-text-muted mb-1">Reçue le</dt>
                <dd className="font-body text-[15px] text-text-primary font-medium">{formattedDate(result.submittedAt)}</dd>
              </div>
            </dl>
            {/* L'envoi d'e-mail est best-effort côté worker (voir index.ts :
                seul l'enregistrement KV conditionne le succès). La référence
                reste donc affichée comme preuve, même si l'e-mail n'arrive pas. */}
            <p className="font-body text-[14px] text-text-secondary border-t border-border-0 pt-6">
              Un accusé de réception vient de vous être envoyé par e-mail. Conservez-le, ainsi que la référence
              ci-dessus, comme preuve de votre demande.
            </p>
            {/* Seule action restante sur cet écran : elle porte donc le style
                primaire. ButtonPrimary plutôt que Link stylé, pour garder
                l'effet de survol des autres CTA du site (voir Button/CTA). */}
            <div className="pt-2">
              <ButtonPrimary onClick={() => navigate('/')} size="l" className="w-full sm:w-auto px-10">
                Retour à l’accueil
              </ButtonPrimary>
            </div>
          </div>
        ) : step === 'form' ? (
          <form onSubmit={handleContinue} noValidate className="space-y-6" aria-labelledby={formHeadingId}>
            <h2 id={formHeadingId} className="sr-only">Informations sur votre commande</h2>

            <Field id="firstName" label="Prénom" error={errors.firstName}>
              <input
                ref={firstFieldRef}
                type="text"
                autoComplete="given-name"
                required
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field id="lastName" label="Nom" error={errors.lastName}>
              <input
                type="text"
                autoComplete="family-name"
                required
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field id="email" label="E-mail utilisé lors de la commande" error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field
              id="orderReference"
              label="Référence de commande"
              hint="Vous trouverez cette référence dans votre e-mail de confirmation de commande."
              error={errors.orderReference}
            >
              <input
                type="text"
                autoComplete="off"
                required
                value={form.orderReference}
                onChange={(e) => setForm((f) => ({ ...f, orderReference: e.target.value }))}
                className={inputClass}
              />
            </Field>

            {/* Honeypot — masqué visuellement, jamais atteint au clavier ni annoncé. */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="company">Entreprise</label>
              <input
                id="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              />
            </div>

            <div className="pt-2">
              <ButtonPrimary type="submit" size="l" className="w-full sm:w-auto px-10">
                Continuer
              </ButtonPrimary>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-surface-0 border border-border-0 rounded-[32px] p-8 md:p-10 space-y-5">
              <p className="font-body text-[13px] uppercase tracking-[0.14em] text-text-muted">Votre demande concerne :</p>
              <dl className="space-y-3">
                <div className="flex gap-2">
                  <dt className="font-body text-[14px] text-text-muted min-w-[140px]">Nom et prénom</dt>
                  <dd className="font-body text-[14px] text-text-primary font-medium">{form.firstName} {form.lastName}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-body text-[14px] text-text-muted min-w-[140px]">E-mail</dt>
                  <dd className="font-body text-[14px] text-text-primary font-medium">{form.email}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-body text-[14px] text-text-muted min-w-[140px]">Référence de commande</dt>
                  <dd className="font-body text-[14px] text-text-primary font-medium">{form.orderReference}</dd>
                </div>
              </dl>
              <p className="body pt-2 border-t border-border-0">Confirmez-vous votre décision de vous rétracter de cette commande ?</p>

              {serverError && (
                <p role="alert" className="font-body text-[13px] text-red-400">
                  {serverError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <ButtonPrimary onClick={handleConfirm} isLoading={submitting} disabled={submitting} size="l" className="px-10">
                  {submitting ? 'Envoi…' : 'Confirmer ma rétractation'}
                </ButtonPrimary>
                <ButtonSecondary onClick={handleModify} disabled={submitting} size="l" className="px-10">
                  Modifier
                </ButtonSecondary>
              </div>
            </div>
          </div>
        )}

        {!result && (
          <p className="font-body text-[12px] text-text-muted mt-8 leading-relaxed">
            Les informations saisies sont utilisées uniquement pour identifier votre commande et traiter votre demande de rétractation.{' '}
            <Link to="/politique-de-confidentialite/" className="text-accent-primary underline underline-offset-2">
              Politique de confidentialité
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}

export default SeRetracterPage;

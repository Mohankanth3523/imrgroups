import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, CircleCheck, LoaderCircle, MessageCircle, Phone } from 'lucide-react';
import { site } from '../../config/site';
import { publishedProjects } from '../../data/projects';
import { cn } from '../../lib/cn';
import {
  contactMethodLabels,
  enquiryTypeLabels,
  enquiryWhatsappUrl,
  hasLeadEndpoint,
  postEnquiry,
  type ContactMethod,
  type EnquiryPayload,
  type EnquiryType,
} from '../../lib/leads';
import {
  formatPhoneForMessage,
  MESSAGE_MAX,
  todayIso,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryFormValues,
} from '../../lib/validation';
import { telHref } from '../../lib/whatsapp';
import { Button } from '../shared/Button';

const NOT_SURE = 'not-sure';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'handoff'; url: string }
  | { kind: 'error'; url: string };

interface EnquiryFormProps {
  /** Pre-selects a project by slug. */
  defaultProject?: string;
  defaultType?: EnquiryType;
  /** Shown in the payload to identify where the enquiry came from. */
  source: string;
  className?: string;
}

const fieldOrder: (keyof EnquiryFormValues)[] = [
  'name',
  'phone',
  'project',
  'enquiryType',
  'visitDate',
  'message',
  'consent',
];

export function EnquiryForm({ defaultProject, defaultType = 'details', source, className }: EnquiryFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);

  const initialProject = publishedProjects.some((p) => p.slug === defaultProject) ? defaultProject! : '';
  const [values, setValues] = useState<EnquiryFormValues>({
    name: '',
    phone: '',
    project: initialProject,
    enquiryType: defaultType,
    preferredContact: 'whatsapp',
    visitDate: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  function update<K extends keyof EnquiryFormValues>(key: K, value: EnquiryFormValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first submit attempt, re-validate as the visitor corrects fields.
    if (submitted) setErrors(validateEnquiry(next));
    if (status.kind !== 'idle' && status.kind !== 'sending') setStatus({ kind: 'idle' });
  }

  function projectName(slug: string): string {
    if (slug === NOT_SURE) return 'Not sure yet — please suggest options';
    return publishedProjects.find((p) => p.slug === slug)?.name ?? slug;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validateEnquiry(values);
    setErrors(found);

    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    const payload: EnquiryPayload = {
      name: values.name.trim(),
      phone: formatPhoneForMessage(values.phone),
      project: projectName(values.project),
      enquiryType: values.enquiryType,
      preferredContact: values.preferredContact,
      visitDate: values.enquiryType === 'site-visit' && values.visitDate ? values.visitDate : undefined,
      message: values.message.trim() || undefined,
      consent: true,
      source,
    };
    const url = enquiryWhatsappUrl(payload);

    if (!hasLeadEndpoint) {
      // No backend configured: hand the enquiry over to WhatsApp, honestly.
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatus({ kind: 'handoff', url });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      await postEnquiry(payload);
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'error', url });
    }
  }

  const errorList = fieldOrder.filter((k) => errors[k]);
  const showVisitDate = values.enquiryType === 'site-visit';

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className={cn('space-y-6', className)}
      aria-describedby={id('privacy')}
    >
      {submitted && errorList.length > 0 && (
        <div role="alert" className="flex gap-3 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            {errorList.length === 1
              ? 'One field needs attention before you can send.'
              : `${errorList.length} fields need attention before you can send.`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor={id('name')} error={errors.name} errorId={id('name-error')}>
          <input
            id={id('name')}
            data-field="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? id('name-error') : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field
          label="Mobile number"
          htmlFor={id('phone')}
          error={errors.phone}
          errorId={id('phone-error')}
          hint="10-digit Indian mobile number"
          hintId={id('phone-hint')}
        >
          <input
            id={id('phone')}
            data-field="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="98765 43210"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={cn(id('phone-hint'), errors.phone && id('phone-error'))}
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>
      </div>

      <Field label="Project you are interested in" htmlFor={id('project')} error={errors.project} errorId={id('project-error')}>
        <select
          id={id('project')}
          data-field="project"
          name="project"
          value={values.project}
          onChange={(e) => update('project', e.target.value)}
          aria-invalid={Boolean(errors.project)}
          aria-describedby={errors.project ? id('project-error') : undefined}
          className={cn(inputClass(Boolean(errors.project)), 'appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2312324A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Choose a project
          </option>
          {publishedProjects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
          <option value={NOT_SURE}>Not sure yet — help me choose</option>
        </select>
      </Field>

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-navy">What would you like?</legend>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4" data-field="enquiryType" tabIndex={-1}>
          {(Object.keys(enquiryTypeLabels) as EnquiryType[]).map((t) => (
            <Choice
              key={t}
              name={id('enquiryType')}
              checked={values.enquiryType === t}
              onChange={() => update('enquiryType', t)}
              label={enquiryTypeLabels[t]}
            />
          ))}
        </div>
      </fieldset>

      <AnimatePresence initial={false}>
        {showVisitDate && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Field
              label="Preferred visit date (optional)"
              htmlFor={id('visitDate')}
              error={errors.visitDate}
              errorId={id('visitDate-error')}
              hint="We will call or message to confirm a time."
              hintId={id('visitDate-hint')}
            >
              <input
                id={id('visitDate')}
                data-field="visitDate"
                name="visitDate"
                type="date"
                min={todayIso()}
                value={values.visitDate}
                onChange={(e) => update('visitDate', e.target.value)}
                aria-invalid={Boolean(errors.visitDate)}
                aria-describedby={cn(id('visitDate-hint'), errors.visitDate && id('visitDate-error'))}
                className={cn(inputClass(Boolean(errors.visitDate)), 'sm:max-w-xs')}
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-navy">How should we reach you?</legend>
        <div className="grid grid-cols-2 gap-2 sm:max-w-sm">
          {(Object.keys(contactMethodLabels) as ContactMethod[]).map((m) => (
            <Choice
              key={m}
              name={id('preferredContact')}
              checked={values.preferredContact === m}
              onChange={() => update('preferredContact', m)}
              label={contactMethodLabels[m]}
            />
          ))}
        </div>
      </fieldset>

      <Field
        label="Message (optional)"
        htmlFor={id('message')}
        error={errors.message}
        errorId={id('message-error')}
        hint={`${values.message.length} / ${MESSAGE_MAX}`}
        hintId={id('message-hint')}
      >
        <textarea
          id={id('message')}
          data-field="message"
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX + 50}
          placeholder="Budget, preferred plot size, or questions for the team"
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={cn(id('message-hint'), errors.message && id('message-error'))}
          className={cn(inputClass(Boolean(errors.message)), 'min-h-[112px] resize-y py-3')}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-charcoal-muted">
          <input
            type="checkbox"
            data-field="consent"
            name="consent"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? id('consent-error') : undefined}
            className="mt-1 h-5 w-5 shrink-0 rounded-sm border-line accent-navy"
          />
          <span>
            I agree to be contacted by {site.name} by phone or WhatsApp about this enquiry.
          </span>
        </label>
        {errors.consent && <ErrorText id={id('consent-error')}>{errors.consent}</ErrorText>}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p id={id('privacy')} className="max-w-sm text-[0.8125rem] leading-relaxed text-charcoal-soft">
          {hasLeadEndpoint
            ? 'Your details are sent to the IMR GROUPS sales team and used only to respond to this enquiry.'
            : 'Sending opens WhatsApp with your enquiry filled in. Nothing is sent until you press send in WhatsApp, and this website does not store your details.'}
        </p>
        <Button type="submit" variant="brand" size="lg" disabled={status.kind === 'sending'} className="sm:min-w-[220px]">
          {status.kind === 'sending' ? (
            <>
              <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" /> Sending…
            </>
          ) : hasLeadEndpoint ? (
            'Send enquiry'
          ) : (
            <>
              <MessageCircle aria-hidden="true" className="h-5 w-5" /> Send via WhatsApp
            </>
          )}
        </Button>
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {status.kind === 'handoff' && (
            <StatusPanel key="handoff" tone="info">
              <p className="font-semibold text-navy">Your message is ready in WhatsApp.</p>
              <p className="mt-1">
                Press send in WhatsApp to share it with our team. If WhatsApp did not open,{' '}
                <a href={status.url} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-navy">
                  open it here
                </a>{' '}
                or call{' '}
                <a href={telHref} className="link-underline font-semibold text-navy">
                  {site.phone.display}
                </a>
                .
              </p>
            </StatusPanel>
          )}
          {status.kind === 'sent' && (
            <StatusPanel key="sent" tone="success">
              <p className="font-semibold text-navy">Enquiry sent.</p>
              <p className="mt-1">
                Thank you, {values.name.trim().split(' ')[0]}. Our team will contact you{' '}
                {values.preferredContact === 'whatsapp' ? 'on WhatsApp' : 'by phone'} at {formatPhoneForMessage(values.phone)}.
              </p>
            </StatusPanel>
          )}
          {status.kind === 'error' && (
            <StatusPanel key="error" tone="error">
              <p className="font-semibold">We could not send your enquiry.</p>
              <p className="mt-1">
                Check your connection and try again, or{' '}
                <a href={status.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                  send it on WhatsApp
                </a>{' '}
                instead. You can also call{' '}
                <a href={telHref} className="inline-flex items-center gap-1 font-semibold underline">
                  <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                  {site.phone.display}
                </a>
                .
              </p>
            </StatusPanel>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    'block min-h-[50px] w-full rounded border bg-white px-4 text-base text-charcoal shadow-[inset_0_1px_2px_rgba(18,50,74,0.04)] transition-colors placeholder:text-charcoal-soft/70',
    'focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200',
    invalid ? 'border-red-400' : 'border-line hover:border-navy/30',
  );
}

function Field(props: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={props.htmlFor} className="text-sm font-semibold text-navy">
          {props.label}
        </label>
        {props.hint && (
          <span id={props.hintId} className="text-xs text-charcoal-soft">
            {props.hint}
          </span>
        )}
      </div>
      {props.children}
      {props.error && <ErrorText id={props.errorId}>{props.error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-red-700">
      <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      {children}
    </p>
  );
}

function Choice(props: { name: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className={cn(
        'relative flex min-h-[48px] cursor-pointer items-center justify-center rounded border px-3 text-center text-sm font-medium transition-colors',
        'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sky-600',
        props.checked ? 'border-navy bg-navy text-white' : 'border-line bg-white text-charcoal hover:border-navy/40',
      )}
    >
      <input
        type="radio"
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        className="sr-only"
      />
      {props.label}
    </label>
  );
}

function StatusPanel({ tone, children }: { tone: 'info' | 'success' | 'error'; children: ReactNode }) {
  const Icon = tone === 'error' ? CircleAlert : CircleCheck;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'flex gap-3 rounded border p-4 text-[0.9375rem] leading-relaxed',
        tone === 'error' && 'border-red-200 bg-red-50 text-red-800',
        tone === 'success' && 'border-emerald-200 bg-emerald-50 text-charcoal',
        tone === 'info' && 'border-sky-200 bg-sky-50 text-charcoal',
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn('mt-0.5 h-5 w-5 shrink-0', tone === 'error' ? 'text-red-600' : tone === 'success' ? 'text-emerald-600' : 'text-sky-600')}
      />
      <div>{children}</div>
    </motion.div>
  );
}

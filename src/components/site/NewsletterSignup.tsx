import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, MailCheck } from 'lucide-react';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { newsletterSchema } from '../../utils/validation';
import type { NewsletterData } from '../../utils/validation';

const NewsletterSignup = ({ className = '', onSubscribed, dark = false }: { className?: string; onSubscribed?: () => void; dark?: boolean }) => {
  const muted = dark ? 'text-ink-muted' : 'text-body-muted';
  const strong = dark ? 'text-ink-text' : 'text-body';
  const id = useId();
  const { getRecaptchaToken } = useRecaptcha();
  const [isConfirming, setIsConfirming] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '', consent: false },
  });

  const onSubmit = async (data: NewsletterData, event?: React.BaseSyntheticEvent) => {
    setServerError('');
    const honeypot = (event?.target as HTMLFormElement | undefined)?.elements.namedItem('website') as HTMLInputElement | null;
    try {
      const recaptchaToken = await getRecaptchaToken('newsletter_subscription');
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken, website: honeypot?.value }),
      });
      if (response.ok) {
        setIsConfirming(true);
        onSubscribed?.();
        return;
      }
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      setServerError(result.error || 'Something went wrong. Please try again later.');
    } catch (error) {
      console.error('Newsletter error:', error);
      setServerError('Something went wrong. Please try again later.');
    }
  };

  if (isConfirming) {
    return (
      <div role="status" className={`flex gap-3 text-left text-sm leading-6 ${muted} ${className}`}>
        <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
        <p>
          <span className={`font-medium ${strong}`}>Almost done.</span> Check your inbox and click the link to confirm. If it isn’t there, look in spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`space-y-3 text-left ${className}`}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={`flex items-center gap-2 border-b pb-2 ${dark ? 'border-ink-line focus-within:border-ink-text' : 'border-paper-line focus-within:border-body'}`}>
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="Email address"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
          className={`h-10 min-w-0 flex-1 bg-transparent text-sm outline-none focus-visible:ring-0 ${dark ? 'text-ink-text placeholder:text-ink-muted' : 'text-body placeholder:text-body-faint'}`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex h-10 items-center gap-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${dark ? 'text-ink-text hover:text-brand-light' : 'text-body hover:text-brand'}`}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      {errors.email && <p role="alert" className="text-sm text-red-500">{errors.email.message}</p>}

      <label htmlFor={`${id}-consent`} className={`flex cursor-pointer items-start gap-3 text-xs leading-5 ${muted}`}>
        <input
          id={`${id}-consent`}
          type="checkbox"
          aria-invalid={Boolean(errors.consent)}
          {...register('consent')}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-brand"
          style={{ colorScheme: dark ? 'dark' : 'light' }}
        />
        <span>
          Email me the newsletter. Unsubscribe any time. See our{' '}
          <Link to="/privacy" className="underline underline-offset-2">privacy policy</Link>.
        </span>
      </label>
      {errors.consent && <p role="alert" className="text-sm text-red-500">{errors.consent.message}</p>}

      {serverError && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {serverError}
        </p>
      )}
    </form>
  );
};

export default NewsletterSignup;

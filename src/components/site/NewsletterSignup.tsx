import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, MailCheck } from 'lucide-react';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { newsletterSchema } from '../../utils/validation';
import type { NewsletterData } from '../../utils/validation';

const NewsletterSignup = ({ className = '' }: { className?: string }) => {
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
      <div role="status" className={`flex gap-3 text-left text-sm leading-6 text-white/80 ${className}`}>
        <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-visly-cyan" aria-hidden />
        <p>
          <span className="font-bold text-white">Almost done.</span> Check your inbox and click the link to confirm your subscription. If you're already subscribed, there's nothing more to do.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`space-y-3 text-left ${className}`}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="Email address"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
          className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0B1633]/75 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-visly-cyan focus:ring-2 focus:ring-visly-cyan/20"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-visly-cyan px-5 text-sm font-bold text-[#071423] transition hover:bg-white disabled:opacity-60"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      {errors.email && <p role="alert" className="text-sm text-red-300">{errors.email.message}</p>}

      <label htmlFor={`${id}-consent`} className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/65">
        <input
          id={`${id}-consent`}
          type="checkbox"
          aria-invalid={Boolean(errors.consent)}
          {...register('consent')}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-visly-cyan"
        />
        <span>
          Yes, email me the VislyBluq newsletter. I can unsubscribe at any time. See our{' '}
          <Link to="/privacy" className="underline hover:text-visly-cyan">Privacy Policy</Link>.
        </span>
      </label>
      {errors.consent && <p role="alert" className="text-sm text-red-300">{errors.consent.message}</p>}

      {serverError && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {serverError}
        </p>
      )}
    </form>
  );
};

export default NewsletterSignup;

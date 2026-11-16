import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL } from '../../config/contact';
import { revealDelay, useInView } from '../../hooks/useInView';

/*
 * Shared building blocks for every page. Pages start with a dark <PageIntro>, alternate light
 * <Section>s (tone "light" / "tint"), and usually end with the dark <CTASection>.
 */

export const pagePad = 'px-5 sm:px-8 lg:px-12';
export const pageMax = 'mx-auto max-w-page';

/** Fades and lifts its content into place the first time it scrolls into view. */
export const Reveal = ({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}) => {
  const [ref, inView] = useInView<HTMLElement>();
  const props = {
    className: `fade-up ${inView ? 'is-visible' : ''} ${className}`,
    style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
  };
  return as === 'li' ? (
    <li ref={ref as React.RefObject<HTMLLIElement>} {...props}>{children}</li>
  ) : (
    <div ref={ref as React.RefObject<HTMLDivElement>} {...props}>{children}</div>
  );
};

type Tone = 'light' | 'tint' | 'dark';

const toneClass: Record<Tone, string> = {
  light: 'bg-paper text-body',
  tint: 'bg-paper-tint text-body',
  dark: 'bg-ink text-ink-text',
};

export const Section = ({
  children,
  className = '',
  tone = 'light',
  ...props
}: { children: ReactNode; className?: string; tone?: Tone } & HTMLAttributes<HTMLElement>) => (
  <section {...props} className={`${pagePad} py-20 lg:py-28 ${toneClass[tone]} ${className}`}>
    <div className={pageMax}>{children}</div>
  </section>
);

/** Small uppercase label above a heading. */
export const Label = ({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) => (
  <p className={`font-mono text-[11px] uppercase tracking-label ${dark ? 'text-ink-muted' : 'text-body-faint'} ${className}`}>
    {children}
  </p>
);

/** Serif italic emphasis inside a headline. Use once per heading at most. */
export const Em = ({ children }: { children: ReactNode }) => (
  <em className="font-serif font-normal italic tracking-normal">{children}</em>
);

export const SectionHeading = ({
  label,
  title,
  intro,
  action,
  dark = false,
}: {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
}) => (
  <Reveal className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end">
    <div className="max-w-3xl">
      {label && <Label dark={dark} className="mb-5">{label}</Label>}
      <h2 className="text-3xl font-normal leading-[1.1] tracking-display sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className={`mt-5 max-w-prose text-base leading-7 ${dark ? 'text-ink-muted' : 'text-body-muted'}`}>{intro}</p>}
    </div>
    {action}
  </Reveal>
);

type ButtonVariant = 'primary' | 'secondary' | 'onDark' | 'outlineDark';

const buttonClass: Record<ButtonVariant, string> = {
  primary: 'bg-body text-white hover:bg-brand',
  secondary: 'border border-paper-line text-body hover:border-body',
  onDark: 'bg-white text-body hover:bg-brand hover:text-white',
  outlineDark: 'border border-ink-line text-ink-text hover:border-white/40',
};

export const ButtonLink = ({
  to,
  children,
  variant = 'primary',
  arrow = true,
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) => (
  <Link
    to={to}
    className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-200 ${buttonClass[variant]} ${className}`}
  >
    {children}
    {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />}
  </Link>
);

/** Inline text link with an arrow, for "see all" style actions. */
export const ArrowLink = ({ to, children, dark = false, external = false }: { to: string; children: ReactNode; dark?: boolean; external?: boolean }) => {
  const className = `group inline-flex items-center gap-1.5 text-sm font-medium ${dark ? 'text-ink-text hover:text-brand-light' : 'text-body hover:text-brand'}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = <Icon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />;
  return external ? (
    <a href={to} target="_blank" rel="noreferrer" className={className}>{children}{icon}</a>
  ) : (
    <Link to={to} className={className}>{children}{icon}</Link>
  );
};

/** Dark opening band used at the top of every inner page. */
export const PageIntro = ({
  label,
  title,
  description,
  children,
}: {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) => (
  <section className={`${pagePad} bg-ink bg-[radial-gradient(ellipse_70%_60%_at_85%_110%,rgba(31,111,221,0.13),transparent_70%)] pb-20 pt-36 text-ink-text lg:pb-28 lg:pt-48`}>
    <div className={pageMax}>
      {label && <Label dark className="hero-enter mb-8">{label}</Label>}
      <h1 style={revealDelay(1, 100)} className="hero-enter max-w-4xl text-4xl font-normal leading-[1.05] tracking-display sm:text-5xl lg:text-7xl">{title}</h1>
      {description && <p style={revealDelay(2, 100)} className="hero-enter mt-8 max-w-2xl text-lg leading-8 text-ink-muted">{description}</p>}
      {children && <div style={revealDelay(3, 100)} className="hero-enter mt-10">{children}</div>}
    </div>
  </section>
);

/** A bordered panel. Use for forms and grouped details, not as a wrapper for every block. */
export const Card = ({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`rounded-2xl border border-paper-line bg-paper ${className}`}>
    {children}
  </div>
);

export const CTASection = ({
  title = (
    <>
      Have something to build? <Em>Let’s talk<span className="-ml-[0.07em]">.</span></Em>
    </>
  ),
  description = 'Tell us what you’re working on. We reply with practical next steps, usually within one working day.',
  contactHref = '/contact',
}: {
  title?: ReactNode;
  description?: string;
  contactHref?: string;
}) => (
  <Section tone="dark" className="border-t border-ink-line bg-[radial-gradient(ellipse_60%_80%_at_100%_100%,rgba(31,111,221,0.10),transparent_70%)]">
    <Reveal className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
      <div>
        <h2 className="max-w-3xl text-4xl font-normal leading-[1.05] tracking-display sm:text-5xl lg:text-6xl">{title}</h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-ink-muted">{description}</p>
      </div>
      <div className="flex flex-col gap-6 lg:items-end">
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={contactHref} variant="onDark">Start a project</ButtonLink>
          <ButtonLink to="/services" variant="outlineDark" arrow={false}>Our services</ButtonLink>
        </div>
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-sm text-ink-muted hover:text-ink-text">{CONTACT_EMAIL}</a>
      </div>
    </Reveal>
  </Section>
);

/** One numbered section of a legal page (Privacy, Terms). */
export const LegalBlock = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-paper-line py-10 first:border-t-0 first:pt-0">
    <h2 className="text-xl font-medium tracking-[-0.01em]">{title}</h2>
    <div className="mt-4 space-y-4 text-base leading-7 text-body-muted">{children}</div>
  </section>
);

/** Visible only in dev builds, so missing content is obvious while working and invisible in production. */
export const ContentTodo = ({ note, className = '' }: { note?: string; className?: string }) =>
  import.meta.env.DEV ? (
    <span className={`inline-block rounded-md border border-dashed border-amber-500/70 bg-amber-400/10 px-2 py-1 font-mono text-[11px] font-semibold text-amber-600 ${className}`}>
      TODO: real content{note ? ` (${note})` : ''}
    </span>
  ) : null;

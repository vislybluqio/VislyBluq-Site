import { HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const pagePad = 'px-6 sm:px-8 lg:px-16';
export const pageMax = 'max-w-7xl mx-auto';

export const GlassCard = ({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={`rounded-3xl border border-white/10 bg-[#142030]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_40px_rgba(46,126,247,0.08)] backdrop-blur-xl ${className}`}
  >
    {children}
  </div>
);

export const Section = ({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLElement>) => (
  <section {...props} className={`${pagePad} py-12 lg:py-16 ${className}`}>
    <div className={pageMax}>{children}</div>
  </section>
);

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#adc6ff]/25 bg-[#142030]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#adc6ff] backdrop-blur-xl">
    <span className="h-2 w-2 rounded-full bg-[#77d8ff] shadow-[0_0_16px_rgba(119,216,255,0.8)]" />
    {children}
  </div>
);

export const PrimaryLink = ({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) => (
  <Link
    to={to}
    className={`inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-[#adc6ff] to-[#77d8ff] px-7 py-4 text-sm font-bold text-[#002e69] shadow-[0_0_28px_rgba(119,216,255,0.25)] transition hover:-translate-y-0.5 ${className}`}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </Link>
);

export const SecondaryLink = ({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) => (
  <Link
    to={to}
    className={`inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-[#d7e3f9] transition hover:border-[#77d8ff]/40 hover:bg-white/10 ${className}`}
  >
    {children}
  </Link>
);

export const PageIntro = ({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode }) => (
  <section className={`${pagePad} relative overflow-hidden pt-28 pb-10 lg:pt-36 lg:pb-12`}>
    <div className="absolute right-0 top-20 -z-10 h-[460px] w-[460px] rounded-full bg-[#adc6ff]/10 blur-[100px]" />
    <div className={`${pageMax} max-w-5xl`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-[#d7e3f9] sm:text-5xl lg:text-7xl">
        {title}
      </h1>
      {description && <p className="mt-5 max-w-3xl text-base leading-7 text-[#c2c6d6] sm:mt-7 sm:text-lg sm:leading-8">{description}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

export const MetricStrip = ({ metrics }: { metrics: Array<{ label: string; value: string }> }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {metrics.map((metric) => (
      <GlassCard key={metric.label} className="p-6 text-center">
        <div className="text-3xl font-bold text-[#adc6ff]">{metric.value}</div>
        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c2c6d6]">{metric.label}</div>
      </GlassCard>
    ))}
  </div>
);

export const CTASection = ({
  title = 'Have a product or data problem to solve?',
  description = "Tell us what you're building. We'll reply with practical next steps, usually within one working day.",
}: {
  title?: string;
  description?: string;
}) => (
  <Section>
    <GlassCard className="relative overflow-hidden rounded-[3rem] p-8 text-center md:p-12 lg:p-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(173,198,255,0.14),transparent_60%)]" />
      <h2 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight text-[#d7e3f9] md:text-6xl">{title}</h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#c2c6d6]">{description}</p>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <PrimaryLink to="/contact">Book a Consultation</PrimaryLink>
        <SecondaryLink to="/projects">View Our Work</SecondaryLink>
      </div>
    </GlassCard>
  </Section>
);

/** Visible only in dev builds, so missing content is obvious while working and invisible in production. */
export const ContentTodo = ({ note, className = '' }: { note?: string; className?: string }) =>
  import.meta.env.DEV ? (
    <span className={`inline-block rounded-md border border-dashed border-amber-400/70 bg-amber-400/10 px-2 py-1 font-mono text-[11px] font-semibold text-amber-300 ${className}`}>
      TODO: real content{note ? ` (${note})` : ''}
    </span>
  ) : null;

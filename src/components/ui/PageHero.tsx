import { ReactNode } from 'react';
import Container from './Container';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  compact?: boolean;
}

const PageHero = ({ eyebrow, title, subtitle, children, compact = false }: PageHeroProps) => (
  <section className={`relative bg-visly-dark overflow-hidden ${compact ? 'py-12 lg:py-16' : 'py-16 lg:py-20'}`}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-visly-navy/50 transform skew-x-12 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-visly-blue/10 rounded-full blur-3xl" />
    </div>
    <Container className="relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        {eyebrow && (
          <p className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-visly-cyan mb-4 px-3 py-1 rounded-full bg-visly-blue/10 border border-visly-blue/20">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </Container>
  </section>
);

export default PageHero;

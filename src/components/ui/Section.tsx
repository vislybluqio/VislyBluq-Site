import { ReactNode } from 'react';
import Container from './Container';

type SectionBg = 'white' | 'gray' | 'dark' | 'navy';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: SectionBg;
  id?: string;
  narrow?: boolean;
}

const bgClasses: Record<SectionBg, string> = {
  white: 'bg-white',
  gray: 'bg-visly-gray',
  dark: 'bg-visly-dark text-white',
  navy: 'bg-visly-navy text-white',
};

const Section = ({ children, className = '', bg = 'white', id, narrow = false }: SectionProps) => (
  <section id={id} className={`py-16 lg:py-20 ${bgClasses[bg]} ${className}`}>
    <Container narrow={narrow}>{children}</Container>
  </section>
);

export default Section;

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { founders } from '../../data/team';
import { Section } from '../site/Enterprise';

const WhoYoullWorkWith = () => {
  if (founders.length === 0) return null;

  return (
    <Section className="bg-visly-light text-visly-navy">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-blue">Who you'll work with</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-visly-navy md:text-5xl">Meet the founders.</h2>
          <Link to="/team" className="mt-8 inline-flex items-center gap-2 font-bold text-visly-blue hover:text-visly-navy">
            Meet the full team <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:gap-6">
          {founders.map((person) => (
            <li key={person.name}>
              <Link to="/team" className="group block">
                <img
                  src={person.image}
                  alt={person.name}
                  className="aspect-square w-full rounded-xl object-cover sm:rounded-2xl object-top shadow-[0_18px_40px_rgba(11,22,51,0.18)]"
                  loading="lazy"
                />
                <p className="mt-3 break-words text-sm font-bold leading-5 text-visly-navy group-hover:text-visly-blue sm:mt-4 sm:text-lg">{person.name}</p>
                <p className="mt-1 text-xs leading-4 text-visly-navy/70 sm:text-sm sm:leading-5">{person.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default WhoYoullWorkWith;

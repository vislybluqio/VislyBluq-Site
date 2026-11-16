import { ButtonLink, Em, pageMax, pagePad } from '../components/site/Enterprise';
import HomeSections from '../components/home/HomeSections';
import { LagosClock, RotatingPhrase } from '../components/home/HeroDetails';
import CubeField from '../components/home/CubeField';
import { revealDelay } from '../hooks/useInView';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'VislyBluq — Technology Consulting, Apps, Data & AI Solutions', description: 'Technology consulting, web and mobile apps, data engineering and practical AI, for startups and growing businesses.', path: '/' });

// The italic phrase in the hero cycles through these. Keep each one true to the services offered.
const heroPhrases = ['digital products.', 'data platforms.', 'AI tools.', 'internal systems.'];

// A faint dot grid behind the hero, like notebook paper.
const dotGrid = {
  backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1.3px)',
  backgroundSize: '22px 22px',
};

const Home = () => (
  <div>
    {/* Hero: notebook-paper dots, the headline, and a small block field that is sketched, then built. */}
    <section className={`grain relative ${pagePad} bg-ink pb-20 pt-36 text-ink-text lg:pb-28 lg:pt-48`}>
      <div className="pointer-events-none absolute inset-0" style={dotGrid} aria-hidden />
      <div className={`${pageMax} relative`}>
        <div className="hero-enter mb-10 flex items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-label text-ink-muted lg:mb-20">
          <p>Technology consulting</p>
          <LagosClock />
        </div>

        <div className="relative">
          <h1 className="max-w-4xl text-5xl font-normal leading-[1.06] tracking-display sm:text-6xl lg:text-[5rem] lg:leading-[1.06]">
            <span className="hero-enter inline" style={revealDelay(1, 100)}>We consult, design and build</span>{' '}
            <span className="hero-enter inline-block" style={revealDelay(1, 400)}>
              <Em><RotatingPhrase phrases={heroPhrases} /></Em>
            </span>
          </h1>
          {/* Wide screens only, beside the headline, so the headline is never crowded. */}
          <div className="absolute -top-24 right-0 hidden h-[300px] w-[320px] xl:block">
            <CubeField sketch grid={6} ambient={false} hoverStrength={0} keystone />
          </div>
        </div>

        <div className="hero-enter mt-14 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-end lg:justify-between" style={revealDelay(1, 600)}>
          <p className="max-w-xl text-lg leading-8 text-ink-muted">
            Technology consulting, web and mobile apps, data engineering and practical AI, for startups and growing businesses.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/contact" variant="onDark">Start a project</ButtonLink>
            <ButtonLink to="/services" variant="outlineDark" arrow={false}>Our services</ButtonLink>
          </div>
        </div>
      </div>
    </section>
    <HomeSections />
  </div>
);

export default Home;

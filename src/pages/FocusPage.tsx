import { Link, useParams } from 'react-router-dom';
import DeepPage from '../components/site/DeepPage';
import { GlassCard, Section } from '../components/site/Enterprise';
import { focusPage } from '../config/focus';

const FocusPage = () => {
  const { slug = '' } = useParams();

  if (slug !== focusPage.slug) {
    return (
      <Section className="pt-32">
        <GlassCard className="p-10 text-center">
          <h1 className="text-3xl font-bold">Page not found</h1>
          <Link to="/" className="mt-5 inline-flex text-[#adc6ff]">Back to home</Link>
        </GlassCard>
      </Section>
    );
  }

  return <DeepPage page={focusPage} />;
};

export default FocusPage;

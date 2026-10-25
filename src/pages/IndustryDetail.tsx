import { Link, useParams } from 'react-router-dom';
import { CTASection, ContentTodo, GlassCard, PageIntro, Section } from '../components/site/Enterprise';
import { RelatedInsights, RelatedProjects, RelatedServices } from '../components/site/Related';
import { getIndustry } from '../data/industries';
import { insightsForServiceIds, projectsByIds, serviceLinksForIds } from '../data/related';

const IndustryDetail = () => {
  const { industryId = '' } = useParams();
  const industry = getIndustry(industryId);

  if (!industry) {
    return (
      <Section className="pt-32">
        <GlassCard className="p-10 text-center">
          <h1 className="text-3xl font-bold">Industry not found</h1>
          <Link to="/services" className="mt-5 inline-flex text-[#adc6ff]">Back to services</Link>
        </GlassCard>
      </Section>
    );
  }

  return (
    <div>
      <PageIntro eyebrow="Industry" title={<>{industry.title}</>} description={industry.description}>
        {!industry.description && import.meta.env.DEV ? <ContentTodo note="industry description" /> : undefined}
      </PageIntro>
      <RelatedServices services={serviceLinksForIds(industry.serviceIds)} className="pt-0" />
      <RelatedProjects projects={projectsByIds(industry.projectIds)} className="bg-[#030f1e]/45" />
      <RelatedInsights insights={insightsForServiceIds(industry.serviceIds, 3)} />
      <CTASection />
    </div>
  );
};

export default IndustryDetail;

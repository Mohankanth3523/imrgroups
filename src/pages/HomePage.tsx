import { Hero, HeroHighlights } from '../components/home/Hero';
import { Approach, FinalCta, HomeFaq, LocationFocus, ProjectDiscovery, WhyChoose } from '../components/home/Sections';
import { pageMeta } from '../data/pages';
import { useSeo } from '../hooks/useSeo';
import { SITE_URL } from '../lib/env';
import { organizationJsonLd } from '../lib/seoTags';

const orgJsonLd = organizationJsonLd(SITE_URL);

export function HomePage() {
  useSeo(pageMeta.home, orgJsonLd);
  return (
    <>
      <Hero />
      <HeroHighlights />
      <ProjectDiscovery />
      <WhyChoose />
      <LocationFocus />
      <Approach />
      <HomeFaq />
      <FinalCta />
    </>
  );
}

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FinalCta } from '../components/home/Sections';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { Button } from '../components/shared/Button';
import { PageHero } from '../components/shared/PageHero';
import { pageMeta } from '../data/pages';
import { projectAreas, projectCategories, publishedProjects } from '../data/projects';
import { useSeo } from '../hooks/useSeo';
import { cn } from '../lib/cn';

const ALL = 'all';

export default function ProjectsPage() {
  useSeo(pageMeta.projects);
  const [params, setParams] = useSearchParams();
  const category = params.get('type') ?? ALL;
  const area = params.get('area') ?? ALL;

  const filtered = useMemo(
    () =>
      publishedProjects.filter(
        (p) => (category === ALL || p.category === category) && (area === ALL || p.location.area === area),
      ),
    [category, area],
  );

  function setFilter(key: 'type' | 'area', value: string) {
    const next = new URLSearchParams(params);
    if (value === ALL) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const filtersActive = category !== ALL || area !== ALL;

  return (
    <>
      <PageHero
        title="Our projects"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Our Projects' }]}
        intro="Residential plots and homes in and around Hosur. Every listing shows the location, sizes, stated prices and approvals we have on record — ask our team to confirm current details."
      />

      <section aria-label="Project list" className="section pt-12 md:pt-14">
        <div className="container-site">
          <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-6 md:flex-row md:gap-10">
              {projectCategories.length > 1 && (
                <FilterGroup
                  label="Property type"
                  options={projectCategories}
                  value={category}
                  onChange={(v) => setFilter('type', v)}
                />
              )}
              {projectAreas.length > 1 && (
                <FilterGroup label="Location" options={projectAreas} value={area} onChange={(v) => setFilter('area', v)} />
              )}
            </div>
            <p className="text-sm text-charcoal-muted" aria-live="polite">
              Showing {filtered.length} of {publishedProjects.length} projects
            </p>
          </div>

          <div className="mt-10">
            {filtered.length > 0 ? (
              <ProjectGrid projects={filtered} headingLevel="h2" />
            ) : (
              <div className="rounded-md border border-dashed border-line px-6 py-16 text-center">
                <p className="font-serif text-2xl text-navy">No projects match these filters.</p>
                <p className="mt-2 text-charcoal-muted">Clear the filters to see every project.</p>
              </div>
            )}
            {filtersActive && (
              <div className="mt-8 text-center">
                <Button variant="secondary" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
                  Show all projects
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function FilterGroup(props: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const all = [ALL, ...props.options];
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-semibold text-navy">{props.label}</legend>
      <div className="flex flex-wrap gap-2">
        {all.map((opt) => {
          const active = props.value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => props.onChange(opt)}
              className={cn(
                'min-h-[40px] rounded-full border px-4 text-sm font-medium transition-colors',
                active ? 'border-navy bg-navy text-white' : 'border-line bg-white text-charcoal hover:border-navy/40',
              )}
            >
              {opt === ALL ? 'All' : opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

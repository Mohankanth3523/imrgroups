/**
 * Editable marketing copy that is not tied to a single project.
 * These are service commitments and messaging, not verified achievements.
 */

export interface Commitment {
  title: string;
  body: string;
  icon: 'clipboard' | 'footprints' | 'ruler' | 'phone' | 'map';
}

export const commitments: Commitment[] = [
  {
    title: 'Clear project information',
    body: 'Location, plot sizes, stated prices and approvals for each project in one place, so you can compare before you call.',
    icon: 'clipboard',
  },
  {
    title: 'See the land in person',
    body: 'We arrange site visits so you can walk the plot, the road and the surroundings before you decide.',
    icon: 'footprints',
  },
  {
    title: 'Help choosing a plot',
    body: 'Tell us your budget, preferred size and purpose. We will point you to the options that fit.',
    icon: 'ruler',
  },
  {
    title: 'Talk directly to the sales team',
    body: 'Call or message on WhatsApp and speak with the people who handle bookings and visits.',
    icon: 'phone',
  },
  {
    title: 'Focused on Hosur',
    body: 'Our projects are in and around Hosur — from the town centre to the Kelamangalam corridor.',
    icon: 'map',
  },
];

export interface ApproachStep {
  title: string;
  body: string;
}

export const approachSteps: ApproachStep[] = [
  {
    title: 'Explore projects',
    body: 'Browse the locations, plot sizes and stated prices on this site.',
  },
  {
    title: 'Request property details',
    body: 'Ask for plot-wise pricing, availability and the location pin on WhatsApp or by phone.',
  },
  {
    title: 'Discuss your requirements',
    body: 'Share your budget, timeline and what you plan to build. We will shortlist suitable options.',
  },
  {
    title: 'Arrange a site visit',
    body: 'Pick a date that works for you and see the property in person.',
  },
  {
    title: 'Review before you decide',
    body: 'Go through the property and the applicable documents, with your own legal adviser if you wish, before you commit.',
  },
];

/**
 * Company profile placeholders. Leave undefined until confirmed —
 * the About page renders each item only when it is set.
 */
export const companyProfile = {
  /** e.g. 2015 */
  foundedYear: undefined as number | undefined,
  /** A short, factual company story supplied by IMR GROUPS. */
  story: undefined as string | undefined,
  /** Registered office address once confirmed. */
  registeredOffice: undefined as string | undefined,
  /** Promoter / agent registration numbers once supplied. */
  registrations: [] as { label: string; value: string }[],
};

/**
 * General homepage FAQs. Answers only restate what the site already says
 * (project locations come straight from the project data).
 */
export function homeFaqs(projects: { name: string; location: { short: string } }[]): { question: string; answer: string }[] {
  return [
    {
      question: 'Where are IMR GROUPS projects located?',
      answer: `Our current projects are in and around Hosur: ${projects
        .map((p) => `${p.name} (${p.location.short})`)
        .join(', ')}. Ask us on WhatsApp for the exact location pin of any project.`,
    },
    {
      question: 'How do I book a site visit?',
      answer:
        'Use the "Book a Site Visit" form, message us on WhatsApp or call the sales team. Tell us the project and a date that suits you, and we will confirm the visit and share directions.',
    },
    {
      question: 'Are the prices on this website final?',
      answer:
        'Prices are shown as stated in IMR GROUPS project material and can change. Please confirm the current price, and what it includes, with the sales team before deciding.',
    },
    {
      question: 'Which approvals do the projects have?',
      answer:
        'Approvals differ by project and are listed on each project page as stated in project material. Ask for the approval reference numbers and review the documents, ideally with your legal adviser, before you buy.',
    },
    {
      question: 'Can I get help choosing between projects?',
      answer:
        'Yes. Share your budget, preferred plot size and purpose, and the team will suggest the options that fit before you visit.',
    },
  ];
}

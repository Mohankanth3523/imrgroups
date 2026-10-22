import { site } from '../config/site';
import type { Project } from '../types/project';

export interface Faq {
  question: string;
  answer: string;
}

/**
 * FAQs are generated from the project's own data so they never state
 * anything the catalogue does not. Questions without data are skipped.
 */
export function projectFaqs(project: Project): Faq[] {
  const faqs: Faq[] = [];

  faqs.push({
    question: `Where is ${project.name} located?`,
    answer: `${project.location.full}. Ask the sales team on WhatsApp for the exact location pin before your visit.`,
  });

  const priceParts: string[] = [];
  if (project.startingPrice) {
    priceParts.push(`Prices are stated from ${project.startingPrice}${project.priceUnit ? ` ${project.priceUnit}` : ''}.`);
  }
  if (project.priceOptions?.length) {
    priceParts.push(
      `Stated prices: ${project.priceOptions.map((o) => `${o.label} at ${o.value}`).join('; ')}.`,
    );
  }
  if (project.ratePerSqFt) priceParts.push(`The stated rate is ${project.ratePerSqFt}.`);
  if (priceParts.length) {
    faqs.push({
      question: 'What is the price?',
      answer: `${priceParts.join(' ')} Prices can change, so please confirm the current price and what it includes with the sales team.`,
    });
  }

  if (project.plotSizeRange) {
    faqs.push({
      question: 'What plot sizes are available?',
      answer: `Plots are offered from ${project.plotSizeRange}. Availability of specific sizes changes over time — ask the team which plots are open now.`,
    });
  }

  if (project.approvalLabels?.length) {
    faqs.push({
      question: 'Which approvals does the project have?',
      answer: `IMR GROUPS project material states ${project.approvalLabels.join(', ')} approval. Please ask for the approval reference numbers and review the documents, ideally with your legal adviser, before you buy.`,
    });
  }

  faqs.push({
    question: 'How do I book a site visit?',
    answer: `Use the site visit form on this page, message us on WhatsApp, or call ${site.phone.display}. The team will confirm a date and share directions.`,
  });

  faqs.push({
    question: 'What documents should I check before buying?',
    answer:
      'Ask for the title and ownership documents, the approved layout and approval references, and the sale terms. We recommend reviewing them with an independent legal adviser.',
  });

  return faqs;
}

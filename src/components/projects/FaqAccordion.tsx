import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Faq } from '../../lib/projectFaqs';
import { cn } from '../../lib/cn';

/** Accessible accordion: buttons with aria-expanded controlling labelled regions. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question}>
            <h3 className="font-sans text-base font-semibold text-navy md:text-[1.0625rem]">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left hover:text-navy-600"
              >
                <span className="min-w-0 flex-1">{item.question}</span>
                <Plus
                  aria-hidden="true"
                  className={cn(
                    'h-5 w-5 shrink-0 text-sky-600 transition-transform duration-300',
                    open && 'rotate-45',
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 pr-10 leading-relaxed text-charcoal-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

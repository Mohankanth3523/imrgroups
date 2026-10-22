import { motion } from 'framer-motion';
import type { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  headingLevel?: 'h2' | 'h3';
}

/** Two-column project grid with one gentle staggered reveal. */
export function ProjectGrid({ projects, headingLevel }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
      {projects.map((project, i) => (
        <motion.li
          key={project.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectCard project={project} headingLevel={headingLevel} />
        </motion.li>
      ))}
    </ul>
  );
}

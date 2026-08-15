import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Eye } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

/**
 * @deprecated Use CaseStudyCard from './Card/CaseStudy' instead
 * Legacy wrapper for backwards compatibility
 */

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, color, tags }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl shadow-md bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl border border-white/20 dark:border-neutral-700/50">
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`} />
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop`}
            alt={`${title} project preview`}
            className="w-full h-48 object-cover"
          />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              className="bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
              aria-label={`View ${title} project`}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Project
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white group-hover:text-[#7d5fff] transition-colors">
            {title}
          </h3>
          
          <p className="font-['Satoshi'] text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-['Satoshi'] text-xs px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center group/btn text-[#7d5fff] hover:text-white hover:bg-[#7d5fff] transition-all duration-200"
            aria-label={`Learn more about ${title}`}
          >
            Learn More
            <ExternalLink className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
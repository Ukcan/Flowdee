import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@phosphor-icons/react';

/**
 * Card/Feature Component
 * Nomenclature Figma: Card/Feature
 * Skin: CY-FOCUS (Dark Graphite + Orange Accents)
 */

export interface FeatureCardProps {
  icon?: Icon;
  iconElement?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  color?: string; // Kept for prop compat, but overridden by skin unless specific
  style?: 'default' | 'interactive' | 'compact';
  theme?: 'light' | 'dark'; // Ignored, always dark/CY-FOCUS
  onClick?: () => void;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  iconElement,
  title,
  description,
  children,
  color, // We'll ignore the default purple if not provided explicitly, or map it to orange
  style = 'default',
  theme,
  onClick,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ scale: style === 'interactive' ? 1.02 : 1.01 }}
      whileTap={{ scale: style === 'interactive' ? 0.98 : 1 }}
      onClick={onClick}
      className={`group h-full ${onClick ? 'cursor-pointer' : ''}`}
      data-component="card-feature"
      data-style={style}
    >
      <div className={`
        h-full card-surface backdrop-blur-md overflow-hidden relative
        ${style === 'compact' ? 'p-5' : 'p-8'} 
        ${className}
      `}>
        {/* Subtle grid decor behind content */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMGgwdjHguIDF2MCIgZmlsbD0iI0ZGRiIgZmlsbC1vcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]" />

        {/* Header with icon */}
        <div className={`flex items-start space-x-4 ${children || description ? 'mb-6' : ''}`}>
          {(Icon || iconElement) && (
            <div className={`
              shrink-0 flex items-center justify-center rounded-lg transition-colors duration-300
              ${style === 'compact' ? 'w-8 h-8' : 'w-10 h-10'}
              bg-accent-bg text-accent-primary group-hover:bg-accent-primary group-hover:text-text-inverse
            `}>
              {Icon ? (
                <Icon className={style === 'compact' ? 'w-4 h-4' : 'w-5 h-5'} />
              ) : (
                iconElement
              )}
            </div>
          )}
          
          <div className="flex-1">
            <h3 className={`font-heading font-medium text-text-primary leading-tight ${
              style === 'compact' ? 'text-lg' : 'text-xl'
            }`}>
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className={`font-body text-text-secondary leading-relaxed ${
            style === 'compact' ? 'text-sm' : 'text-[15px]'
          } ${children ? 'mb-6' : ''}`}>
            {description}
          </p>
        )}

        {/* Custom children content */}
        {children}
        
        {/* Hover Highlight (Subtle orange glow at bottom) */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

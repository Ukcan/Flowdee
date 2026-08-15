import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

/**
 * Card/Friction Component
 * Nomenclature Figma: Card/Friction
 * Usage: Pour afficher les problèmes/frictions que vous résolvez
 */

export interface FrictionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  theme?: 'light' | 'dark';
}

export const FrictionCard: React.FC<FrictionCardProps> = ({
  icon: Icon,
  title,
  description,
  color = 'from-red-500 to-orange-500',
  theme
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
      data-component="card-friction"
      data-theme={theme}
    >
      <div className="liquid-glass-card h-full p-8 flex flex-col items-start gap-4 transition-all duration-300 hover:shadow-xl">
        {/* Icon Container */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Decorative element */}
        <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${color} opacity-60 group-hover:w-full transition-all duration-500`} />
      </div>
    </motion.div>
  );
};

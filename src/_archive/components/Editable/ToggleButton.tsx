import React from 'react';
import { useEditableContent } from '../../contexts/EditableContentContext';
import { Pencil, X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function EditableToggleButton() {
  const { isEditMode, toggleEditMode, resetAll } = useEditableContent();

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isEditMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={resetAll}
            className="
              flex items-center gap-2 px-4 py-2
              bg-red-500/90 text-white
              backdrop-blur-md rounded-full
              border border-red-400/30 shadow-lg
              hover:bg-red-600 hover:shadow-xl
              hover:scale-[1.02] transition-all duration-200
              min-h-[44px] min-w-[44px]
              focus-ring
              font-body text-[12px] font-medium uppercase tracking-[0.1em]
            "
            aria-label="Reset all edits to defaults"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset tout</span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleEditMode}
        className={`
          flex items-center gap-2 px-5 py-3
          backdrop-blur-md rounded-full
          border shadow-lg
          hover:shadow-xl hover:scale-[1.05]
          transition-all duration-200
          min-h-[44px] min-w-[44px]
          focus-ring
          font-body text-[12px] font-medium uppercase tracking-[0.1em]
          ${
            isEditMode
              ? 'bg-accent-primary text-white border-accent-primary/30'
              : 'bg-surface-0 text-text-primary border-border-0 hover:border-accent-primary/40'
          }
        `}
        aria-label={isEditMode ? 'Quit edit mode' : 'Enter edit mode'}
        aria-pressed={isEditMode}
        whileTap={{ scale: 0.95 }}
      >
        {isEditMode ? <X size={16} /> : <Pencil size={16} />}
        <span className="hidden sm:inline">
          {isEditMode ? 'Quitter' : 'Modifier'}
        </span>
      </motion.button>
    </div>
  );
}

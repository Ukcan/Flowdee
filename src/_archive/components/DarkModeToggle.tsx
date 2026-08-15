import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-14 h-7 bg-surface-1 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={darkMode}
    >
      <motion.div
        className="flex items-center justify-center w-5 h-5 bg-surface-0 rounded-full shadow-md"
        animate={{
          x: darkMode ? 26 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          animate={{ rotate: darkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? (
            <Moon className="w-3 h-3 text-accent-primary" />
          ) : (
            <Sun className="w-3 h-3 text-accent-primary" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};
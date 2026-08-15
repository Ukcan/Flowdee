import React from 'react';
import { motion } from 'motion/react';
import { Video, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';

export const GoogleMeetCard: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl shadow-md bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl border border-white/20 dark:border-neutral-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#3dd66d] to-[#5ae072] rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white">
              Google Meet
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-[#3dd66d] rounded-full animate-pulse"></div>
            <span className="font-['Satoshi'] text-xs text-[#3dd66d]">Live</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-['Satoshi'] font-medium text-[#343030] dark:text-white mb-1">
            Design System Review
          </h4>
          <p className="font-['Satoshi'] text-sm text-gray-600 dark:text-gray-300 mb-3">
            Weekly sync with the design team
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span className="font-['Satoshi']">2:00 PM - 3:00 PM</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span className="font-['Satoshi']">5 attendees</span>
            </div>
          </div>
        </div>

        {/* Participant Avatars */}
        <div className="flex items-center mb-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center"
              >
                <span className="text-xs font-bold text-white">{String.fromCharCode(64 + i)}</span>
              </div>
            ))}
            <div className="w-6 h-6 bg-gray-200 dark:bg-neutral-700 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center">
              <span className="font-['Satoshi'] text-xs text-gray-600 dark:text-gray-400">+1</span>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-[#3dd66d] hover:bg-[#2bc653] text-white font-['Satoshi'] rounded-lg transition-all duration-200 group/btn min-h-[44px]"
          aria-label="Join the Google Meet call"
        >
          <Video className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          Join Meeting
        </Button>
      </div>
    </motion.div>
  );
};
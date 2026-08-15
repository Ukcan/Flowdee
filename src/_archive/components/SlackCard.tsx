import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Hash, Users, Bell } from 'lucide-react';

export const SlackCard: React.FC = () => {
  const channels = [
    { name: 'design-team', unread: 3, isActive: true },
    { name: 'project-alpha', unread: 0, isActive: false },
    { name: 'general', unread: 12, isActive: false }
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl shadow-md bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl border border-white/20 dark:border-neutral-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#cc336f] to-[#ff6b9d] rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white">
              Slack
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <Bell className="w-4 h-4 text-[#cc336f]" />
            <span className="font-['Satoshi'] text-xs bg-[#cc336f] text-white px-2 py-1 rounded-full">15</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <h4 className="font-['Satoshi'] text-sm font-medium text-gray-600 dark:text-gray-400">
            Active Channels
          </h4>
          
          {channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                channel.isActive 
                  ? 'bg-[#cc336f]/10 border border-[#cc336f]/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Hash className="w-3 h-3 text-gray-500" />
                <span className={`font-['Satoshi'] text-sm ${
                  channel.isActive 
                    ? 'text-[#cc336f] font-medium' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {channel.name}
                </span>
              </div>
              
              {channel.unread > 0 && (
                <span className="font-['Satoshi'] text-xs bg-[#cc336f] text-white px-2 py-1 rounded-full min-w-[20px] text-center">
                  {channel.unread}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Latest Message Preview */}
        <div className="border-t border-gray-200 dark:border-neutral-700 pt-3">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#7d5fff] to-[#9f7eff] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline space-x-2">
                <span className="font-['Satoshi'] text-sm font-medium text-[#343030] dark:text-white">Alex</span>
                <span className="font-['Satoshi'] text-xs text-gray-500">2m ago</span>
              </div>
              <p className="font-['Satoshi'] text-sm text-gray-600 dark:text-gray-300 truncate">
                The new design system components look great! 🎨
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
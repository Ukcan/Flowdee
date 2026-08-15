import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users } from 'lucide-react';

export const CalendarCard: React.FC = () => {
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.toLocaleDateString('en', { month: 'long' });
  
  const upcomingEvents = [
    { time: '9:00 AM', title: 'Design Review', attendees: 3 },
    { time: '2:00 PM', title: 'Client Presentation', attendees: 5 },
    { time: '4:30 PM', title: 'Team Standup', attendees: 8 }
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
            <div className="w-8 h-8 bg-gradient-to-r from-[#EDD2AF] to-[#FAF5ED] rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white">
              Calendar
            </h3>
          </div>
          <div className="text-right">
            <div className="font-['Poppins'] text-2xl font-bold text-[#EDD2AF]">{currentDate}</div>
            <div className="font-['Satoshi'] text-xs text-gray-600 dark:text-gray-400">{currentMonth}</div>
          </div>
        </div>

        {/* Mini Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`day-${index}`} className="font-['Satoshi'] text-xs text-gray-500 dark:text-gray-400 py-1">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const dayNum = i - 6; // Assuming month starts on Sunday
            const isToday = dayNum === currentDate;
            const isValidDay = dayNum > 0 && dayNum <= 31;
            
            return (
              <div
                key={i}
                className={`font-['Satoshi'] text-xs py-1 ${
                  isToday 
                    ? 'bg-[#EDD2AF] text-white rounded-full' 
                    : isValidDay 
                      ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full cursor-pointer' 
                      : 'text-gray-300 dark:text-gray-600'
                }`}
              >
                {isValidDay ? dayNum : ''}
              </div>
            );
          })}
        </div>

        {/* Upcoming Events */}
        <div className="space-y-2">
          <h4 className="font-['Satoshi'] text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Today's Events
          </h4>
          {upcomingEvents.slice(0, 2).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-1 text-[#EDD2AF] min-w-[60px]">
                <Clock className="w-3 h-3" />
                <span className="font-['Satoshi'] text-xs">{event.time}</span>
              </div>
              <div className="flex-1">
                <div className="font-['Satoshi'] text-sm text-gray-700 dark:text-gray-300">{event.title}</div>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <Users className="w-3 h-3" />
                <span className="font-['Satoshi'] text-xs">{event.attendees}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
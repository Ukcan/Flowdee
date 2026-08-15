import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

export const NewsfeedCard: React.FC = () => {
  const posts = [
    {
      id: 1,
      author: 'Design Weekly',
      time: '2h ago',
      content: 'New trends in micro-interactions: How subtle animations can improve user engagement by 40%',
      likes: 42,
      comments: 8,
      trending: true
    },
    {
      id: 2,
      author: 'UX Research Hub',
      time: '4h ago',
      content: 'Case study: How we redesigned the checkout flow and increased conversion by 23%',
      likes: 67,
      comments: 15,
      trending: false
    }
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl shadow-md bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl border border-white/20 dark:border-neutral-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#fff787] to-[#ffeb3b] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-gray-700" />
            </div>
            <h3 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white">
              Design Feed
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#fff787] hover:text-gray-700 hover:bg-[#fff787]/20"
            aria-label="View all feed items"
          >
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 dark:border-neutral-700 last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-neutral-600 dark:to-neutral-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {post.author.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-['Satoshi'] text-sm font-medium text-[#343030] dark:text-white">
                      {post.author}
                    </span>
                    <span className="font-['Satoshi'] text-xs text-gray-500">
                      {post.time}
                    </span>
                    {post.trending && (
                      <span className="font-['Satoshi'] text-xs bg-[#fff787] text-gray-700 px-2 py-1 rounded-full">
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <p className="font-['Satoshi'] text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      className="flex items-center space-x-1 text-gray-500 hover:text-[#cc336f] transition-colors group/btn"
                      aria-label={`Like post by ${post.author}`}
                    >
                      <Heart className="w-4 h-4 group-hover/btn:fill-current" />
                      <span className="font-['Satoshi'] text-xs">{post.likes}</span>
                    </button>
                    
                    <button 
                      className="flex items-center space-x-1 text-gray-500 hover:text-[#EDD2AF] transition-colors"
                      aria-label={`Comment on post by ${post.author}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-['Satoshi'] text-xs">{post.comments}</span>
                    </button>
                    
                    <button 
                      className="flex items-center space-x-1 text-gray-500 hover:text-[#3dd66d] transition-colors group/btn"
                      aria-label={`Share post by ${post.author}`}
                    >
                      <Share2 className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      className="flex items-center space-x-1 text-gray-500 hover:text-[#7d5fff] transition-colors ml-auto"
                      aria-label={`Bookmark post by ${post.author}`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
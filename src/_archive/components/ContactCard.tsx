import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

export const ContactCard: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl shadow-md bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl border border-white/20 dark:border-neutral-700/50">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-[#7d5fff] to-[#9f7eff] rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white">
            Get In Touch
          </h3>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <CheckCircle className="w-12 h-12 text-[#3dd66d] mb-4" />
            <h4 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white mb-2">
              Message Sent!
            </h4>
            <p className="font-['Satoshi'] text-sm text-gray-600 dark:text-gray-300">
              Thanks for reaching out. I'll get back to you soon!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label 
                htmlFor="name" 
                className="font-['Satoshi'] text-sm font-medium text-[#343030] dark:text-white"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 font-['Satoshi'] bg-white/50 dark:bg-neutral-800/50 border-gray-200 dark:border-neutral-700 focus:border-[#7d5fff] dark:focus:border-[#7d5fff] transition-colors"
                placeholder="Your name"
                required
                aria-describedby="name-help"
              />
            </div>

            <div>
              <Label 
                htmlFor="email" 
                className="font-['Satoshi'] text-sm font-medium text-[#343030] dark:text-white"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 font-['Satoshi'] bg-white/50 dark:bg-neutral-800/50 border-gray-200 dark:border-neutral-700 focus:border-[#7d5fff] dark:focus:border-[#7d5fff] transition-colors"
                placeholder="your@email.com"
                required
                aria-describedby="email-help"
              />
            </div>

            <div>
              <Label 
                htmlFor="message" 
                className="font-['Satoshi'] text-sm font-medium text-[#343030] dark:text-white"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 font-['Satoshi'] bg-white/50 dark:bg-neutral-800/50 border-gray-200 dark:border-neutral-700 focus:border-[#7d5fff] dark:focus:border-[#7d5fff] transition-colors resize-none"
                placeholder="Tell me about your project..."
                rows={3}
                required
                aria-describedby="message-help"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7d5fff] to-[#9f7eff] hover:from-[#6b47ff] hover:to-[#8a6bff] text-white font-['Satoshi'] rounded-lg transition-all duration-300 group/btn min-h-[44px]"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
              Send Message
            </Button>
          </form>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
          <p className="font-['Satoshi'] text-xs text-gray-600 dark:text-gray-400 text-center">
            Or reach me directly at{' '}
            <a 
              href="mailto:contact@flowdee.fr"
              className="text-[#7d5fff] hover:underline focus:outline-none focus:ring-2 focus:ring-[#7d5fff] rounded"
            >
              contact@flowdee.fr
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
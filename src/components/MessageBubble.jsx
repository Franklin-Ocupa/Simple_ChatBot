import React from 'react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 w-full max-w-[80%]`}
    >
      <div
        className={`px-4 py-2 rounded-2xl whitespace-pre-wrap break-words shadow-lg animate-popIn
          ${
            isBot
              ? 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
          }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
};

export default MessageBubble;

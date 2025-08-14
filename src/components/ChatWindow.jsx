import React, { useEffect, useRef } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, darkMode }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col p-3 space-y-3 h-full overflow-y-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-end gap-2 ${
            msg.sender === 'bot' ? 'justify-start' : 'justify-end'
          }`}
        >
          {msg.sender === 'bot' && (
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
              <FaRobot size={14} />
            </div>
          )}
          <MessageBubble message={msg} />
          {msg.sender === 'user' && (
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-500 text-white shadow-md">
              <FaUser size={14} />
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;

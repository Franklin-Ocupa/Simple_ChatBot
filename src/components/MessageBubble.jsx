import React from "react";

const MessageBubble = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3 animate-fade-slide`}
    >
      <div
        className={`px-5 py-3 rounded-lg max-w-xs whitespace-pre-wrap break-words
          ${
            isBot
              ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              : "bg-blue-600 text-white"
          }
          shadow-md
        `}
        style={{ animationDuration: "0.5s" }}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;

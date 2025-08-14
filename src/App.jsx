import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ChatWindow from "./components/ChatWindow";
import Footer from "./components/Footer";
import { getBotResponse } from "./botLogic";
import { FiMessageCircle } from "react-icons/fi";

const App = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm SmartBot 🤖. Ask me something!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const ding = new Audio("/ding.mp3");

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { text, sender: "user", id: Date.now() + "_user" };
    const botReply = {
      text: getBotResponse(text),
      sender: "bot",
      id: Date.now() + "_bot",
    };
    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
    ding.play();
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between font-Syne Mono transition-colors duration-700
      ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900"
      }`}
    >
      <main className="flex flex-col items-center w-full flex-grow px-4 py-6">
        <div
          className="flex flex-col w-full max-w-md
            bg-white dark:bg-gray-900
            text-gray-800 dark:text-white
            p-6 rounded-xl shadow-xl
            transition duration-700"
        >
          {/* Header and toggle */}
          <div className="flex justify-between items-center mb-4">
            <div
              className="flex items-center gap-2 select-none"
              style={{ fontFamily: "'Syne Mono', monospace" }}
            >
              <FiMessageCircle
                className="text-2xl text-blue-600 dark:text-blue-400 transition-transform duration-300 hover:scale-110"
                title="Chat Icon"
              />
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
                SmartBot
              </h1>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              className="text-2xl p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <FaSun color="#FDB813" />
              ) : (
                <FaMoon color="#4B5563" />
              )}
            </button>
          </div>

          {/* Chat window */}
          <div className="flex-grow overflow-hidden">
            <ChatWindow messages={messages} />
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="mt-4 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="submit"
              className={`rounded-md px-6 py-2 text-white font-semibold
                transition duration-300
                ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700"
                    : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700"
                }
                animate-send-pulse
                `}
            >
              Send
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;

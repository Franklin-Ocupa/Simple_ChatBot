import { useState, useEffect } from "react";
import {
  FaComments,
  FaGithub,
  FaTimes,
  FaRobot,
  FaMoon,
  FaSun,
  FaCircle,
} from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";
import ChatWindow from "./components/ChatWindow";
import { getBotResponse } from "./botLogic";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm SmartBot 🤖. Ask me something!",
      sender: "bot",
      id: "init_bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const botDing = new Audio("/ding.mp3");

  useEffect(() => {
    if (messages.length > 1) {
      const last = messages[messages.length - 1];
      if (last.sender === "bot" && last.id !== "init_bot") {
        botDing.play().catch(() => {});
      }
    }
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { text, sender: "user", id: Date.now() + "_user" };
    const botMsg = {
      text: getBotResponse(text),
      sender: "bot",
      id: Date.now() + "_bot",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center motion-bg ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="floating-circles">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>

      {!isOpen && (
        <div className="absolute top-1/4 sm:top-1/3 w-full flex justify-center px-6 z-10 pointer-events-none">
          <div
            className="rounded-3xl px-10 py-8 max-w-xl text-center shadow-xl animate-bounceSlow 
            bg-black/10 backdrop-blur-md border border-white/30"
            style={{ color: "white" }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-wide drop-shadow-lg">
              Hello from <span className="text-yellow-300">SmartBot!</span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-semibold">
              Ready to chat and get answers? Let’s go!
            </p>

            {/* GitHub footer inside the same card */}
            {/* Footer inside the same card */}
            <div className="mt-6 pt-4 border-t border-white/30 flex justify-center items-center space-x-2 text-white text-lg pointer-events-auto">
              <FaGithub className="text-2xl" />
              <span className=" text-bold">
                Made by{" "}
                <a
                  href="https://github.com/SRCarlo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                 SRCarlo
                </a>
              </span>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <>
          <div className="fixed bottom-24 right-6 sm:bottom-20 sm:right-20 flex items-center gap-2 animate-bounceSlow z-10">
            <div className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 rounded-full p-2 shadow-lg">
              <FaRobot size={24} className="text-black" />
            </div>
            <div className="bg-white text-black font-bold px-3 py-2 rounded-lg shadow-md text-sm sm:text-base border border-gray-300 cartoon-text">
              Hey! Click me to chat
            </div>
            <FiArrowDownRight className="text-white text-2xl animate-pulse" />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white p-4 rounded-full shadow-lg hover:scale-105 transition z-10 ring-2 ring-indigo-700"
          >
            <FaComments size={24} />
          </button>
        </>
      )}

      {isOpen && (
        <div
          className={`fixed bottom-6 sm:bottom-10 right-6 sm:right-10 w-11/12 sm:w-80 h-[70vh] sm:h-[500px] rounded-xl shadow-2xl flex flex-col overflow-hidden z-20
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
          <div
            className={`p-3 flex justify-between items-center
              ${
                darkMode
                  ? "bg-gradient-to-r from-purple-900 to-indigo-900"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              }`}
          >
            <div className="font-bold flex items-center gap-2">
              <FaRobot className="text-yellow-300" />
              SmartBot
              <FaCircle
                className="text-green-400 text-xs animate-pulse"
                title="Online"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30"
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30"
                title="Close Chat"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="flex-grow h-0">
            <ChatWindow messages={messages} darkMode={darkMode} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className={`flex items-center gap-2 p-2 border-t
              ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-300"
              }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={`flex-grow px-3 py-2 rounded-full outline-none
                ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;

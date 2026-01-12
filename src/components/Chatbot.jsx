import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Shahriar's AI assistant. Ask me anything about his skills, projects, or experience!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Normalize text for better matching (handles typos)
  const normalizeText = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  };

  // Fuzzy matching helper
  const fuzzyMatch = (input, keywords) => {
    const normalized = normalizeText(input);
    return keywords.some((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      return (
        normalized.includes(normalizedKeyword) ||
        normalizedKeyword.includes(normalized)
      );
    });
  };

  // Predefined responses based on keywords with typo tolerance
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Secret Easter Egg - Jangu
    if (fuzzyMatch(msg, ["jangu", "i am jangu", "im jangu"])) {
      return "Hey thesis mate, welcome! 🎉 Great to see you here! How can I help you today?";
    }

    // Secret Easter Egg - Seyam/Siam
    if (fuzzyMatch(msg, ["seyam", "siam", "i am seyam", "i am siam", "im seyam", "im siam"])) {
      return "Hey! Give me 1120 taka! 💸😂";
    }

    // Skills
    if (fuzzyMatch(msg, ["skill", "skills", "tech", "technology", "stack"])) {
      return "Shahriar is skilled in React, JavaScript, HTML, CSS, Tailwind CSS, Firebase, Node.js, MongoDB, and more! He's also learning full-stack development. Want to know about specific technologies?";
    }

    // Projects
    if (fuzzyMatch(msg, ["project", "projects", "work", "portfolio"])) {
      return "Shahriar has built several projects:\n\n🛒 GadgetHeaven - E-commerce platform with React\n🐾 PetAdoption (Peddy) - Pet adoption web app\n📚 BookVibe - Book reading list manager\n\nWhich one would you like to know more about?";
    }

    // GadgetHeaven
    if (fuzzyMatch(msg, ["gadget", "gadgetheaven", "ecommerce", "shop"])) {
      return "🛒 GadgetHeaven - A responsive React e-commerce platform with cart management, wishlist, and Firebase authentication.\n\n🔗 Live: https://gadget-heaven-eight.vercel.app/\n💻 GitHub: https://github.com/Shahriarshihab5/Gadget-Heaven\n\nTech: React, Tailwind CSS, Firebase, Context API, LocalStorage";
    }

    // PetAdoption/Peddy
    if (fuzzyMatch(msg, ["peddy", "pet", "adoption", "petadoption"])) {
      return "🐾 PetAdoption (Peddy) - A responsive pet adoption web app with interactive modals, filtering, and price sorting.\n\n🔗 Live: https://peddy-pet-adoptionnsite.surge.sh/\n💻 GitHub: https://github.com/Shahriarshihab5/CSE416-Web-Engineering-Lab-Project\n\nTech: HTML5, Tailwind CSS, JavaScript (ES6+), Node.js, MongoDB";
    }

    // BookVibe
    if (fuzzyMatch(msg, ["bookvibe", "book", "vibe", "reading", "books"])) {
      return "📚 BookVibe - A responsive book listing app with read-list management, sorting, and toast notifications.\n\n🔗 Live: https://book-vibee8.netlify.app/\n💻 GitHub: https://github.com/Shahriarshihab5/Bookvibe\n\nTech: React, Tailwind CSS, Firebase, React Router, Local Storage";
    }

    // Education
    if (fuzzyMatch(msg, ["education", "university", "study", "college", "cgpa"])) {
      return "Shahriar is a CSE student at Daffodil International University with a CGPA of 3.56. He has strong foundations in Data Structures, Algorithms, OOP, and System Design.";
    }

    // Contact
    if (fuzzyMatch(msg, ["contact", "email", "reach", "phone", "call"])) {
      return "You can reach Shahriar at:\n📧 shahriarshihab1123@gmail.com\n📱 +880 1737712021\n\nOr scroll down to the Contact section to send a message!";
    }

    // GitHub
    if (fuzzyMatch(msg, ["github", "code", "repo", "repository"])) {
      return "Check out Shahriar's GitHub: https://github.com/Shahriarshihab5\n\nHe has multiple projects showcasing his React, JavaScript, and full-stack skills!";
    }

    // Experience
    if (fuzzyMatch(msg, ["experience", "work", "job"])) {
      return "Shahriar is currently building his portfolio through academic and personal projects. He's passionate about front-end development and actively learning backend technologies to become a full-stack developer.";
    }

    // Resume
    if (fuzzyMatch(msg, ["resume", "cv", "download"])) {
      return "You can download Shahriar's resume from the navbar at the top or from the hero section. It contains all his skills, projects, and education details!";
    }

    // Greeting
    if (fuzzyMatch(msg, ["hi", "hello", "hey", "helo", "hii"])) {
      return "Hello! 👋 How can I help you learn more about Shahriar today?";
    }

    // Thanks
    if (fuzzyMatch(msg, ["thank", "thanks", "thankyou"])) {
      return "You're welcome! Feel free to ask anything else about Shahriar's work! 😊";
    }

    // Default
    return "I can help you with information about Shahriar's skills, projects, education, or contact details. What would you like to know?";
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button with Animations */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed z-50 w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center border-4 border-white animate-pulse-glow bottom-24 md:bottom-8 right-8"
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <X size={28} className="text-white" />
        ) : (
          <MessageCircle size={28} className="text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-32 md:bottom-28 right-8 z-50 w-96 h-[500px] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#2a2a2a] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=AI&backgroundColor=ff4c29"
                  alt="AI Assistant"
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">Shahriar's AI Assistant</h3>
                <p className="text-white/80 text-xs">Always online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse"}`}>
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src="https://api.dicebear.com/7.x/bottts/svg?seed=AI&backgroundColor=ff4c29"
                          alt="AI"
                          className="w-full h-full"
                        />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.isBot
                          ? "bg-[#2a2a2a] text-gray-200"
                          : "bg-primary text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=AI&backgroundColor=ff4c29"
                      alt="AI"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#2a2a2a]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[#0d0d0d] text-white px-4 py-2 rounded-lg border border-[#2a2a2a] focus:outline-none focus:border-primary transition-colors"
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white p-2 rounded-lg hover:shadow-[0_0_15px_rgba(255,76,41,0.5)] transition-all"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

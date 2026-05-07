import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Shahriar's AI assistant. Ask me about his Data Intelligence projects, IEEE Research, or technical skills!",
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

  const normalizeText = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  };

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

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // --- Secret Easter Eggs ---
    if (fuzzyMatch(msg, ["jangu", "i am jangu", "im jangu"])) {
      return "Hey thesis mate, welcome! 🎉 Great to see you here! How's the data modeling going today?";
    }
    if (fuzzyMatch(msg, ["seyam", "siam", "i am seyam", "i am siam", "im seyam", "im siam"])) {
      return "Hey! I'm busy with DAX formulas right now, but give me 1120 taka and I'll talk! 💸😂";
    }

    // --- Career Focus & Skills ---
    if (fuzzyMatch(msg, ["skill", "tech", "stack", "know", "tools"])) {
      return "Shahriar is an expert in Data Intelligence. His stack includes:\n\n📊 Power BI (DAX & Modeling)\n📉 Advanced Excel (Power Pivot)\n🗄️ SQL (Data Extraction)\n🐍 Python (Pandas/NumPy)\n⚛️ React.js (Frontend Foundation)\n\nHe specializes in turning complex datasets into actionable insights[cite: 6, 7].";
    }

    // --- Research ---
    if (fuzzyMatch(msg, ["research", "publication", "ieee", "paper", "medical", "cuet"])) {
      return "Shahriar is a Published Researcher (IEEE, Scopus-indexed) [cite: 9, 44].\n\nHis lead work, 'Comparative Study of CNN-Based Transfer Learning Models for Osteoporosis Detection,' was accepted at the IEEE QPAIN Conference[cite: 43]. He presented this work at CUET, focusing on Explainable AI in healthcare[cite: 46].";
    }

    // --- Data Projects ---
    if (fuzzyMatch(msg, ["data project", "dashboard", "power bi", "excel project"])) {
      return "Shahriar has built professional BI tools:\n\n🌦️ Weather Intelligence Dashboard (Power BI + API Integration) [cite: 12]\n👥 HR Analytics Dashboard (941 records, 13.8% attrition analysis) [cite: 16]\n💰 Sales & Revenue Forecasting (Excel Power Pivot & What-If Analysis)[cite: 18, 21].";
    }

    // --- Engineering Projects ---
    if (fuzzyMatch(msg, ["web project", "software", "react project", "engineering"])) {
      return "With a solid CSE foundation, he built:\n\n🏥 AI Osteoarthritis Detector (Deep Learning + React)\n🛒 Shopify Inspired Platform (Next.js & MongoDB)\n🐾 Peddy (Pet Adoption App)\n\nHe uses his software engineering skills to build more interactive data tools.";
    }

    // --- Education ---
    if (fuzzyMatch(msg, ["education", "university", "cgpa", "diu"])) {
      return "Shahriar is a CSE Graduate from Daffodil International University with a strong CGPA of 3.55[cite: 23, 25]. He has rigorous foundations in Database Management, Statistics, and System Design[cite: 26].";
    }

    // --- Activities & Leadership ---
    if (fuzzyMatch(msg, ["activity", "cricket", "leadership", "vp", "volunteer"])) {
      return "Beyond the screen, Shahriar is a leader:\n\n🏏 Champion Cricketer (DIU Sports Week 2025)\n👔 Vice President of Rajshahi Students Association (Led 300+ students) [cite: 49, 50]\n📋 Protocol Officer (DIU Job Utsob 2025)[cite: 52].";
    }

    // --- Contact & Location ---
    if (fuzzyMatch(msg, ["contact", "email", "location", "address", "phone"])) {
      return "You can reach Shahriar at syedshahriarahmed0@gmail.com[cite: 2].\n\n📍 Present: Uttara, Dhaka\n🏡 Hometown: Rajshahi.";
    }

    // --- Greetings & Thanks ---
    if (fuzzyMatch(msg, ["hi", "hello", "hey", "hii"])) {
      return "Hello! 👋 I'm Shahriar's BI assistant. Need insights on his Data Analysis projects or IEEE research?";
    }
    if (fuzzyMatch(msg, ["thank", "thanks"])) {
      return "You're welcome! Data never sleeps, and neither does my assistance! 😊";
    }

    return "I can tell you about Shahriar's Data Analytics skills, IEEE Research, Power BI dashboards, or his leadership as a Cricket Champion. What interests you?";
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
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="fixed z-50 w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center border-4 border-white bottom-24 md:bottom-8 right-8"
      >
        {isOpen ? <X size={28} className="text-white" /> : <MessageCircle size={28} className="text-white" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-32 md:bottom-28 right-8 z-50 w-96 h-[550px] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#2a2a2a] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Shahriar&backgroundColor=ff4c29" alt="AI Assistant" className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Data Intelligence Assistant</h3>
                <p className="text-white/80 text-xs">Insights ready</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`flex gap-2 max-w-[85%] ${message.isBot ? "" : "flex-row-reverse"}`}>
                    <div className={`p-3 rounded-xl ${message.isBot ? "bg-[#2a2a2a] text-gray-200" : "bg-primary text-white shadow-lg"}`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="bg-[#2a2a2a] p-3 rounded-lg flex gap-1">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.div key={d} className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#2a2a2a] bg-[#1a1a1a]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about my SQL or BI skills..."
                  className="flex-1 bg-[#0d0d0d] text-white px-4 py-2 rounded-lg border border-[#2a2a2a] focus:outline-none focus:border-primary transition-all text-sm"
                />
                <button onClick={handleSend} className="bg-primary text-white p-2 rounded-lg hover:shadow-primary/50 shadow-lg transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
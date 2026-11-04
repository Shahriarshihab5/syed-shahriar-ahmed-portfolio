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
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-lg shadow-primary/40 ring-4 ring-dark/70 md:bottom-8 md:right-8 md:h-16 md:w-16"
      >
        {isOpen ? (
          <X size={26} className="text-white" />
        ) : (
          <MessageCircle size={26} className="text-white" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-32 right-4 z-50 flex h-[70vh] max-h-[550px] w-[calc(100vw-2rem)] max-w-96 flex-col overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-2xl shadow-black/60 backdrop-blur-xl md:bottom-28 md:right-8"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary p-4">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-1 ring-white/30">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Shahriar&backgroundColor=8b5cf6" alt="AI Assistant" className="h-full w-full" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-white">Data Intelligence Assistant</h3>
                <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Insights ready
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`flex max-w-[85%] gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}>
                    <div className={`rounded-xl p-3 ${message.isBot ? "border border-line bg-surface-2 text-light/90" : "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"}`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="flex gap-1 rounded-lg border border-line bg-surface-2 p-3">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.div key={d} className="h-1.5 w-1.5 rounded-full bg-muted" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-line bg-surface/80 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about my SQL or BI skills..."
                  className="flex-1 rounded-lg border border-line bg-dark/60 px-4 py-2 text-sm text-light placeholder:text-muted/60 transition-all focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button onClick={handleSend} aria-label="Send message" className="rounded-lg bg-primary p-2 text-white shadow-lg transition-all hover:shadow-primary/50">
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
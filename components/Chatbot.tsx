"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Loader2, CheckCircle } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: React.ReactNode;
  options?: string[];
  isTyping?: boolean;
};

let messageIdCounter = 1000;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverToggleHovered, setIsHoverToggleHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! Welcome to Sankalp Constructions. How can I help you today?",
      options: ["Browse Apartments", "Browse Villas", "Browse Commercial", "Contact Us"],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchFilteredProjects = async (type: string, filter?: string) => {
    let url = `${API_BASE_URL}/api/chatbot/projects?type=${type.toLowerCase()}`;

    if (type.toLowerCase() === "apartment" && filter) {
      url += `&bhk=${encodeURIComponent(filter)}`;
    } else if (filter) {
      const rangeMap: Record<string, string> = {
        "Under 1.5 CR - 2.0 CR": "1.5-2.0",
        "Under 2.0 CR - 2.5 CR": "2.0-2.5",
        "Under 2.5 CR - 3.0 CR": "2.5-3.0",
        "Under 1.5 CR - 2.5 CR": "1.5-2.5",
        "Under 2.5 CR - 3.5 CR": "2.5-3.5",
        "Under 3.5 CR - 5.0 CR": "3.5-5.0",
        "Under 5.0 CR - 10.0 CR": "5.0-10.0",
      };
      if (rangeMap[filter]) url += `&priceRange=${rangeMap[filter]}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return data.projects || [];
  };

  const fetchAvailableBHKs = async () => {
    const res = await fetch(`${API_BASE_URL}/api/chatbot/projects?type=apartment&getConfigs=true`);
    const data = await res.json();
    return data.configurations || ["2 BHK", "3 BHK", "4 BHK"];
  };

  const addTyping = () => {
    const id = String(messageIdCounter++);
    setMessages(prev => [...prev, { id, sender: "bot", text: "", isTyping: true }]);
    return id;
  };

  const removeTyping = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const goToMainMenu = () => {
    const botMsg: Message = {
      id: String(messageIdCounter++),
      sender: "bot",
      text: "What would you like to explore?",
      options: ["Browse Apartments", "Browse Villas", "Browse Commercial", "Contact Us"],
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>, context: string) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      source: `Chatbot - ${context}`,
      status: "New",
    };

    try {
      await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setMessages(prev => [...prev, {
        id: String(messageIdCounter++),
        sender: "bot",
        text: (
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <CheckCircle size={16} />
            <span>Thank you! Our team will contact you soon for site visit.</span>
          </div>
        ),
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = async (option: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: String(messageIdCounter++), sender: "user", text: option }]);

    const typingId = addTyping();

    setTimeout(async () => {
      let botMsg: Message;

      // Navigation Options
      if (option === "Back to Main Menu" || option === "Browse More Projects") {
        removeTyping(typingId);
        goToMainMenu();
        return;
      }

      // Browse Categories
      if (option === "Browse Apartments") {
        const bhkOptions = await fetchAvailableBHKs();
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: "Which configuration would you like?",
          options: [...bhkOptions, "Back to Main Menu"]
        };
      } 
      else if (option === "Browse Villas") {
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: "Choose your budget range for Villas:",
          options: ["Under 1.5 CR - 2.0 CR", "Under 2.0 CR - 2.5 CR", "Under 2.5 CR - 3.0 CR", "Back to Main Menu"]
        };
      } 
      else if (option === "Browse Commercial") {
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: "Choose your budget range for Commercial:",
          options: ["Under 1.5 CR - 2.5 CR", "Under 2.5 CR - 3.5 CR", "Under 3.5 CR - 5.0 CR", "Under 5.0 CR - 10.0 CR", "Back to Main Menu"]
        };
      } 
      // BHK Selection
      else if (option.includes("BHK") || option.includes("Studio") || option.includes("Penthouse")) {
        const projects = await fetchFilteredProjects("apartment", option);
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: projects.length > 0 ? `Here are our ${option} projects:` : `No ${option} projects available currently.`,
          options: projects.length > 0 ? projects.map((p: any) => p.title) : ["Back to Main Menu"]
        };
      } 
      // Price Range Selection
      else if (option.includes("CR")) {
        const type = option.toLowerCase().includes("villa") ? "villa" : "commercial";
        const projects = await fetchFilteredProjects(type, option);

        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: projects.length > 0 ? "Here are matching projects in your budget:" : "No projects found in this range.",
          options: projects.length > 0 ? projects.map((p: any) => p.title) : ["Back to Main Menu"]
        };
      } 
      // Project Selected
      else if (option !== "Contact Us" && option !== "Book Site Visit") {
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: `You selected **${option}**.`,
          options: ["Book Site Visit", "Browse More Projects", "Back to Main Menu"]
        };
      } 
      // Lead Form
      else if (option === "Book Site Visit" || option === "Contact Us") {
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: (
            <div className="bg-gray-50 rounded-xl p-5 border">
              <p className="font-bold text-[#711113] mb-4">Please share your details</p>
              <form onSubmit={(e) => handleLeadSubmit(e, option)} className="space-y-3">
                <input name="name" required placeholder="Full Name" className="w-full p-3 border rounded-lg text-sm" disabled={isSubmitting} />
                <input name="phone" required placeholder="Phone Number" type="tel" className="w-full p-3 border rounded-lg text-sm" disabled={isSubmitting} />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#29B1D2] hover:bg-[#711113] text-white py-3 rounded-lg font-bold text-sm"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Book Site Visit"}
                </button>
              </form>
            </div>
          )
        };
      } 
      else {
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: "How else can I help you?",
          options: ["Browse Apartments", "Browse Villas", "Browse Commercial", "Contact Us"]
        };
      }

      removeTyping(typingId);
      setMessages(prev => [...prev, botMsg]);
    }, 700);
  };

  // Typing Indicator Component
  const TypingIndicator = () => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#711113]/10 flex items-center justify-center">
        <Bot size={16} className="text-[#711113]" />
      </div>
      <div className="bg-white border px-4 py-3 rounded-2xl flex items-center gap-1.5">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
        <span className="text-xs text-gray-500">Thinking...</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Toggle */}
      <div className="fixed bottom-4 right-3 md:bottom-6 md:right-6 z-[150]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHoverToggleHovered(true)}
            onMouseLeave={() => setIsHoverToggleHovered(false)}
            className="w-11 h-11 md:w-14 md:h-14 bg-[#1E1E1E] text-[#F5C33C] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-all"
          >
            <Bot className="w-5 h-5 md:w-7 md:h-7" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-[4.5rem] right-2 z-[160] w-[calc(100vw-1rem)] max-w-[360px] sm:w-[380px] md:bottom-[5.5rem] md:right-6 bg-white rounded-3xl shadow-2xl overflow-hidden border flex flex-col"
            style={{ maxHeight: "620px", height: "70vh" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-[#4a0b0d] p-3 md:p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot size={24} className="text-[#F5C33C]" />
                <div>
                  <h4 className="font-bold">Sankalp Assistant</h4>
                  <p className="text-xs text-green-400">● Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={22} /></button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-3 md:p-5 space-y-4 md:space-y-6 bg-gray-50 chat-scroll">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.isTyping ? (
                    <TypingIndicator />
                  ) : (
                    <div className={`max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""} flex gap-3`}>
                      {msg.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-[#711113]/10 flex-shrink-0 mt-1 flex items-center justify-center">
                          <Bot size={16} className="text-[#711113]" />
                        </div>
                      )}
                      <div>
                        <div className={`p-4 rounded-2xl text-[14.5px] leading-relaxed ${msg.sender === "user" ? "bg-[#1E1E1E] text-white" : "bg-white border"}`}>
                          {msg.text}
                        </div>
                        {msg.options && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {msg.options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handleOptionClick(opt)}
                                className="text-xs border border-[#711113]/30 hover:bg-[#711113] hover:text-white px-4 py-2.5 rounded-full transition-all"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
             <div className="p-4 border-t bg-white text-center text-xs text-gray-500">
              Select an option above to continue
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
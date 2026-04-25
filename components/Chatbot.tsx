"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useProjects } from "@/context/ProjectContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: React.ReactNode;
  options?: string[];
};

let messageIdCounter = 1000;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverToggleHovered, setIsHoverToggleHovered] = useState(false);
  const { projects, loading } = useProjects();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! Welcome to Sankalp Constructions. How can I help you today?",
      options: ["Find projects", "View amenities", "Check unit details", "Contact form"],
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      source: "Chatbot",
      status: "New"
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessages(prev => [...prev, {
          id: String(messageIdCounter++) + "_thanks",
          sender: "bot",
          text: (
            <div className="flex items-center gap-2 text-green-600 font-bold">
              <CheckCircle size={16} />
              <span>Thank you! Our sales team will get in touch shortly.</span>
            </div>
          )
        }]);
      }
    } catch (error) {
      console.error("Error submitting lead from chatbot:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = (option: string) => {
    const userMsg: Message = { id: String(messageIdCounter++), sender: "user", text: option };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let botMsg: Message;
      const selectedProject = projects.find(p => p.title === option);
      
      if (selectedProject) {
        botMsg = {
          id: String(messageIdCounter++),
          sender: "bot",
          text: (
            <div className="space-y-3">
              <p><strong>{selectedProject.title}</strong> is one of our premium <strong>{selectedProject.status}</strong> developments.</p>
              <Link 
                href={`/projects/${selectedProject._id}`} 
                className="inline-flex items-center gap-2 text-[#711113] font-bold text-xs uppercase tracking-widest hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View Project Details <ArrowRight size={12} />
              </Link>
            </div>
          ),
          options: ["Find projects", "Contact form", "Back to start"]
        };
      } else {
        switch (option) {
          case "Find projects":
            botMsg = {
              id: String(messageIdCounter++),
              sender: "bot",
              text: projects.length > 0 
                ? "We have several premium developments ongoing. Which one would you like to explore?" 
                : "We are currently planning some exciting new projects. Stay tuned!",
              options: projects.length > 0 ? projects.map(p => p.title).slice(0, 5).concat(["Back to start"]) : ["Back to start"],
            };
            break;
          case "View amenities":
            botMsg = {
              id: String(messageIdCounter++),
              sender: "bot",
              text: "Our projects feature 5-star amenities like infinity pools, ultra-modern gyms, 24/7 security, and lush gardens.",
              options: ["Contact form", "Back to start"],
            };
            break;
          case "Check unit details":
            botMsg = {
              id: String(messageIdCounter++),
              sender: "bot",
              text: "We offer 2, 3, 4, and 5 BHK premium apartments and villas starting from 1,150 sq.ft. Would you like a detailed floor plan?",
              options: ["Contact form", "Back to start"],
            };
            break;
          case "Contact form":
            botMsg = {
              id: String(messageIdCounter++),
              sender: "bot",
              text: (
                <div className="bg-gray-50 rounded p-4 border border-gray-200 shadow-inner w-full mt-2">
                  <p className="font-bold text-[#711113] mb-2 uppercase text-xs">Fill to Connect</p>
                  <form onSubmit={handleLeadSubmit} className="flex flex-col gap-2 relative z-[9999]">
                    <input name="name" required placeholder="Name" className="p-2 border rounded text-sm w-full" disabled={isSubmitting} />
                    <input name="phone" required placeholder="Phone" type="tel" className="p-2 border rounded text-sm w-full" disabled={isSubmitting} />
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-[#29B1D2] text-white p-2 rounded font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-[#711113] transition-colors"
                    >
                      {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : "Submit"}
                    </button>
                  </form>
                </div>
              ),
            };
            break;
          case "Back to start":
          case "Restart Chat":
          default:
            botMsg = {
              id: String(messageIdCounter++),
              sender: "bot",
              text: "What else can I help you with today?",
              options: ["Find projects", "View amenities", "Check unit details", "Contact form"],
            };
            break;
        }
      }
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle */}
      <div className="fixed bottom-6 right-6 z-[150]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHoverToggleHovered(true)}
            onMouseLeave={() => setIsHoverToggleHovered(false)}
            className="group relative flex items-center justify-center bg-[#1E1E1E] text-[#F5C33C] rounded-full shadow-2xl border border-white/10 hover:shadow-xl hover:scale-105 transition-all overflow-visible w-14 h-14"
          >
            <AnimatePresence>
              {isHoverToggleHovered && (
                <motion.div
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 10, opacity: 0 }}
                  className="absolute right-[120%] top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap hidden md:block border border-gray-100 pointer-events-none"
                >
                  <span className="font-bold uppercase tracking-wider text-xs">Ask Assistant</span>
                </motion.div>
              )}
            </AnimatePresence>
            <Bot size={28} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-[5.5rem] right-6 z-[160] w-80 sm:w-[380px] bg-white/95 backdrop-blur-3xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-200/60 flex flex-col"
            style={{ maxHeight: "650px", height: "75vh" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-[#4a0b0d] p-5 flex justify-between items-center text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                  <Bot size={22} className="text-[#F5C33C]" />
                </div>
                <div>
                  <h4 className="font-extrabold uppercase tracking-widest text-[11px] text-white/90 mb-0.5">Sankalp Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <p className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Online & Ready</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors relative z-10">
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 bg-gradient-to-b from-gray-50/50 to-white">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-[#711113]/10 flex items-center justify-center shrink-0 mr-3 mt-1">
                        <Bot size={14} className="text-[#711113]" />
                      </div>
                    )}
                    
                    <div className={`flex flex-col gap-3 items-start`}>
                      <div className={`p-4 rounded-2xl shadow-sm text-[14px] leading-relaxed relative ${
                        msg.sender === "user" 
                          ? "bg-[#1E1E1E] text-white rounded-tr-sm shadow-[0_4px_15px_rgba(0,0,0,0.1)]" 
                          : "bg-white border text-gray-700 rounded-tl-sm border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                      }`}>
                        {msg.text}
                      </div>
                      
                      {msg.options && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(opt)}
                              className="bg-white border border-[#711113]/20 text-[#711113] text-[11px] px-4 py-2 rounded-full hover:bg-[#711113] hover:text-white hover:border-[#711113] hover:shadow-lg transition-all transform hover:-translate-y-0.5 uppercase font-bold tracking-wider"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
               <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full flex items-center px-4 py-2.5 opacity-60 cursor-not-allowed">
                 <input disabled placeholder="Select options above..." className="flex-1 text-[13px] bg-transparent outline-none disabled:bg-transparent" />
               </div>
               <div className="w-10 h-10 rounded-full bg-[#1E1E1E] opacity-50 flex items-center justify-center shrink-0">
                 <Send size={16} className="text-white ml-0.5" />
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

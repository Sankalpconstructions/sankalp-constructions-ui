"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, FileText } from "lucide-react";
import { submitLead } from "@/lib/leads";

interface Props {
  projectTitle?: string;
  overviewImg?: string;
  floorPlansCount?: number;
  configurations?: any[];
}

type Tab = "master" | "floor";

const variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
  }),
};

export default function FloorPlansSection({ projectTitle, overviewImg, floorPlansCount = 0, configurations = [] }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("master");
  const [direction, setDirection] = useState<number>(1);
  const [showFloorForm, setShowFloorForm] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setDirection(tab === "floor" ? 1 : -1);
    setActiveTab(tab);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        ...formData,
        project: projectTitle || "General",
        message: `Requested to view ${floorPlansCount} Floor Plans for ${projectTitle}`
      });
      
      setHasUnlocked(true);
      setTimeout(() => {
        setShowFloorForm(false);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // If no floor plans and no master plan, don't show
  if (floorPlansCount === 0 && !overviewImg) return null;

  return (
    <section id="floorplans" className="py-10 md:py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="uppercase tracking-[0.25em] text-[10px] md:text-xs text-[#711113] font-bold mb-3 block">
            Plans
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Project Plans
          </h2>
          <div className="w-12 h-1 bg-[#711113] mx-auto rounded-full mb-4" />
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Explore the master plan and detailed unit floor plans for{" "}
            {projectTitle || "this project"}.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-flex items-center bg-white border border-gray-200 rounded-xl md:rounded-2xl p-1 md:p-1.5 shadow-sm">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-y-1 md:inset-y-1.5 rounded-lg md:rounded-xl bg-[#711113] shadow-md"
              style={{
                left: activeTab === "master" ? "4px" : "50%",
                right: activeTab === "master" ? "50%" : "4px",
              }}
            />
            {(
              [
                { key: "master", label: "Master Plan" },
                { key: "floor", label: "Floor Plans" },
              ] as { key: Tab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`relative z-10 px-4 md:px-8 py-2 md:py-3 text-[10px] md:text-sm font-bold uppercase tracking-widest rounded-lg md:rounded-xl transition-colors duration-300 min-w-[120px] md:min-w-[140px] ${
                  activeTab === tab.key ? "text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative overflow-hidden min-h-[340px]">
          <AnimatePresence mode="popLayout" custom={direction}>
            {activeTab === "master" ? (
              <motion.div
                key="master"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden p-4 md:p-8">
                  {overviewImg ? (
                    <img
                      src={overviewImg}
                      alt="Master Plan"
                      className="w-full max-h-[520px] object-contain rounded-xl bg-gray-50"
                    />
                  ) : (
                    <div className="py-20 text-center text-gray-400">
                      <p className="text-xs font-black uppercase tracking-widest">Master Plan arriving soon</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="floor"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {!hasUnlocked && (
                  <div className="flex justify-center mb-10">
                    <button
                      onClick={() => setShowFloorForm(true)}
                      className="flex items-center gap-2 bg-[#711113] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#520c0d] transition-all shadow-xl shadow-[#711113]/20 active:scale-95"
                    >
                      <Lock size={13} /> Unlock {floorPlansCount} Floor Plans
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(configurations.length > 0 ? configurations : [1, 2, 3]).map((item, idx) => (
                    <div key={idx} className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                      {!hasUnlocked && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px] z-20 flex flex-col items-center justify-center">
                          <Lock size={30} className="text-[#F5C33C] mb-3" />
                          <p className="text-white text-[10px] font-black uppercase tracking-widest text-center px-6">
                            Fill form to view plan
                          </p>
                        </div>
                      )}
                      <div className={hasUnlocked ? "" : "filter blur-[6px] grayscale"}>
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                          <span className="font-extrabold text-[#711113] text-lg">{item.configuration || "Unit Plan"}</span>
                          <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-[#711113]/10 text-[#711113] px-3 py-1 rounded-full">
                            <FileText size={12} /> {item.carpetArea || "TBA"}
                          </span>
                        </div>
                        <div className="p-4">
                          <img src={overviewImg || "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600"} alt="Plan Preview" className="w-full aspect-video object-cover rounded-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Unlock Modal */}
      <AnimatePresence>
        {showFloorForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFloorForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[111] px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative pointer-events-auto"
              >
                <button
                  onClick={() => setShowFloorForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#711113] hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="w-12 h-12 bg-[#711113]/10 rounded-xl flex items-center justify-center text-[#711113] mb-5">
                  <Lock size={22} />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Unlock Floor Plans</h3>
                <p className="text-gray-500 text-sm mb-6">Enter your details to instantly unlock all {floorPlansCount} floor plans for {projectTitle}.</p>

                {hasUnlocked ? (
                  <div className="text-center py-6">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="text-5xl mb-4"
                    >
                      🔓
                    </motion.div>
                    <p className="text-green-700 font-bold uppercase tracking-widest text-xs">Access Granted! Unlocking now...</p>
                  </div>
                ) : (
                  <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                       <input 
                        required 
                        type="text" 
                        placeholder="e.g. John Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#711113] transition-all" 
                      />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                       <input 
                        required 
                        type="tel" 
                        placeholder="+91 99999 99999" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#711113] transition-all" 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-4 py-4 bg-[#711113] text-white font-bold uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-[#711113]/20 hover:bg-[#520c0d] transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? "Unlocking..." : "View Floor Plans"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

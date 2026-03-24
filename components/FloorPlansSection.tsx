"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, FileText } from "lucide-react";

interface Props {
  projectTitle?: string;
  overviewImg?: string;
}

type Tab = "master" | "floor";

const FLOOR_PLANS = [
  { id: 1, type: "2 BHK", area: "1,150 sq.ft.", img: "https://images.unsplash.com/photo-1628192078696-6e47c1b8f106?w=600" },
  { id: 2, type: "3 BHK", area: "1,550 sq.ft.", img: "https://images.unsplash.com/photo-1596495577610-8b14e3049fb5?w=600" },
  { id: 3, type: "4 BHK", area: "2,200 sq.ft.", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600" },
];

// Direction-aware slide variants
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

export default function FloorPlansSection({ projectTitle, overviewImg }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("master");
  const [direction, setDirection] = useState<number>(1); // +1 = going right, -1 = going left
  const [showFloorForm, setShowFloorForm] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setDirection(tab === "floor" ? 1 : -1);
    setActiveTab(tab);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setHasUnlocked(true);
      setShowFloorForm(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <section id="floorplans" className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="uppercase tracking-[0.25em] text-xs text-[#711113] font-bold mb-3 block">
            Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Project Plans
          </h2>
          <div className="w-12 h-1 bg-[#711113] mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore the master plan and detailed unit floor plans for{" "}
            {projectTitle || "this project"}.
          </p>
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex items-center bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
            {/* Sliding pill indicator */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-y-1.5 rounded-xl bg-[#711113] shadow-md"
              style={{
                left: activeTab === "master" ? "6px" : "50%",
                right: activeTab === "master" ? "50%" : "6px",
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
                className={`relative z-10 px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-colors duration-300 min-w-[140px] ${
                  activeTab === tab.key
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content with slide animation ── */}
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
                  <img
                    src={
                      overviewImg ||
                      "https://images.unsplash.com/photo-1628192078696-6e47c1b8f106?w=1200"
                    }
                    alt="Master Plan"
                    className="w-full max-h-[520px] object-contain rounded-xl bg-gray-50"
                  />
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
                {/* Unlock button when locked */}
                {!hasUnlocked && (
                  <div className="flex justify-end mb-5">
                    <button
                      onClick={() => setShowFloorForm(true)}
                      className="flex items-center gap-2 bg-[#711113] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-[#520c0d] transition-colors shadow-md"
                    >
                      <Lock size={13} /> Unlock Floor Plans
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FLOOR_PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm"
                    >
                      {/* Locked overlay */}
                      {!hasUnlocked && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] z-20 flex flex-col items-center justify-center">
                          <Lock size={30} className="text-[#F5C33C] mb-3" />
                          <p className="text-white text-xs font-bold text-center px-6">
                            Fill in a quick form to view this floor plan
                          </p>
                        </div>
                      )}

                      {/* Card content (blurred when locked) */}
                      <div className={hasUnlocked ? "" : "filter blur-[3px] grayscale"}>
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                          <span className="font-extrabold text-[#711113] text-lg">
                            {plan.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-bold bg-[#711113]/10 text-[#711113] px-3 py-1 rounded-full">
                            <FileText size={12} /> {plan.area}
                          </span>
                        </div>
                        <div className="p-4">
                          <img
                            src={plan.img}
                            alt={plan.type}
                            className="w-full aspect-video object-cover rounded-xl"
                          />
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

      {/* ── Floor Plan Unlock Modal ── */}
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
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Unlock Floor Plans
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Enter your details to instantly view all floor plans for{" "}
                  {projectTitle}.
                </p>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-3">🔓</div>
                    <p className="text-green-700 font-bold">
                      Access granted! Loading plans…
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#711113]"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#711113]"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#711113]"
                    />
                    <button
                      type="submit"
                      className="mt-2 py-4 bg-[#711113] text-white font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-[#520c0d] transition-colors"
                    >
                      View Floor Plans
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

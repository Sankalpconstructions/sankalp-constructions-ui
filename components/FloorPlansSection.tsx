import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

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
  const validConfigs = (configurations || []).filter(
    c => c && (c.configuration?.trim() || c.carpetArea?.trim() || c.superBuiltUpArea?.trim() || c.udsSqYards?.trim())
  );
  const [activeTab, setActiveTab] = useState<Tab>("master");
  const [direction, setDirection] = useState<number>(1);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setDirection(tab === "floor" ? 1 : -1);
    setActiveTab(tab);
  };

  // If no floor plans and no configs, don't show
  if (floorPlansCount === 0 && validConfigs.length === 0) return null;

  return (
    <section id="floorplans" className="py-10 md:py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            Project Plans
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Explore the master plan and detailed unit floor plans for{" "}
            {projectTitle || "this project"}.
          </p>
        </div>

        {/* Tab Bar */}
        {validConfigs.length > 0 && (
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
                  className={`relative z-10 px-4 md:px-8 py-2 md:py-3 text-[10px] md:text-sm font-bold uppercase tracking-widest rounded-lg md:rounded-xl transition-colors duration-300 min-w-[120px] md:min-w-[140px] ${activeTab === tab.key ? "text-white" : "text-gray-500 hover:text-gray-800"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

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
                <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden p-4 md:p-8">
                  <div>
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
                </div>
              </motion.div>
            ) : activeTab === "floor" && validConfigs.length > 0 ? (
              <motion.div
                key="floor"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {validConfigs.map((item, idx) => (
                    <div key={idx} className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                      <div>
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
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

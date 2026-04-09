import { useStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, MousePointer2, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

// Re-branding to Mechanical Keyboard Business Format
const parts = [
  { id: "plate", name: "Base Plate" },
  { id: "keysBase", name: "Keycaps" },
  { id: "keysAccent", name: "Type-C Connector" },
  { id: "cable", name: "Connectivity Cable" },
  { id: "details", name: "Internal Switches (Teardown)" },
];

const colors = [
  "#ffffff", // Arctic White
  "#111827", // Obsidian Black
  "#ff1a1a", // Cherry Red
  "#00f0ff", // Cyber Teal
  "#39ff14", // Matrix Green
  "#ffea00", // Warning Yellow
  "#9d4edd", // Retro Purple
  "#1e3a8a", // Deep Navy
];

export default function ConfiguratorUI() {
  const store = useStore();
  const exploded = store.exploded;
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(false)}
            style={{
              position: "absolute",
              right: "4vw",
              top: "5vh",
              zIndex: 20,
              background: "#111827",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Open Configurator"
          >
            <SlidersHorizontal size={26} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              position: "absolute",
              right: "4vw",
              top: "5vh",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              padding: "32px",
              borderRadius: "24px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
              zIndex: 10,
              width: "310px",
              maxHeight: "90vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div
              style={{
                marginBottom: "32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    letterSpacing: "-1.5px",
                    marginBottom: "4px",
                    color: "#111827",
                  }}
                >
                  CHROMA.X
                </h2>
                <p
                  style={{
                    color: "#4b5563",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Mechanical Customizer
                </p>
              </div>
              <div
                style={{ display: "flex", gap: "16px", alignItems: "center" }}
              >
                <Keyboard size={30} color="#111827" strokeWidth={1.5} />
                <button
                  onClick={() => setIsMinimized(true)}
                  style={{
                    background: "rgba(0,0,0,0.05)",
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#4b5563",
                    transition: "all 0.2s",
                  }}
                  title="Minimize Panel"
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.1)";
                    e.currentTarget.style.color = "#111827";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                    e.currentTarget.style.color = "#4b5563";
                  }}
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {parts.map((part, idx) => {
                const currentColor = store[
                  part.id as keyof typeof store
                ] as string;
                return (
                  <motion.div
                    key={part.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                  >
                    <label
                      style={{
                        display: "block",
                        marginBottom: "12px",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        fontWeight: 800,
                        color: "#6b7280",
                      }}
                    >
                      {part.name}
                    </label>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => store.setColor(part.id, color)}
                          title={color}
                          style={{
                            backgroundColor: color,
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            border:
                              currentColor === color
                                ? "3px solid #111827"
                                : "2px solid transparent",
                            boxShadow:
                              currentColor === color
                                ? "0 0 12px rgba(0,0,0,0.1)"
                                : "inset 0 2px 4px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            transition:
                              "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                            transform:
                              currentColor === color
                                ? "scale(1.15)"
                                : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Exploded View Toggle Switch */}
            <motion.button
              onClick={() => store.toggleExploded()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: "40px",
                width: "100%",
                padding: "20px",
                backgroundColor: exploded ? "#ff1a1a" : "#111827",
                color: "white",
                border: "none",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "2px",
                cursor: "pointer",
                boxShadow: exploded
                  ? "0 10px 30px rgba(255, 26, 26, 0.4)"
                  : "0 10px 25px rgba(17, 24, 39, 0.3)",
                transition: "background-color 0.4s, box-shadow 0.4s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <MousePointer2
                size={20}
                className={exploded ? "spin-fast" : ""}
              />
              {exploded ? "ASSEMBLE KEYBOARD" : "TEARDOWN KEYBOARD"}
            </motion.button>

            {/* CSS internal hack */}
            <style>{`
              @keyframes spin { 100% { transform: rotate(360deg); } }
              .spin-fast { animation: spin 1s linear infinite; }
              
              /* Hiding scrollbar logic for neat UI */
              ::-webkit-scrollbar { width: 4px; }
              ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

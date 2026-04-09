import ConfiguratorUI from "./components/ConfiguratorUI";
import LightingAndEnvironment from "./components/LightingAndEnvironment";
import ProductModel from "./components/ProductModel";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
  return (
    <div
      className="app-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* 3D Canvas di bawah - memenuhi layar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <LightingAndEnvironment>
          <ProductModel />
        </LightingAndEnvironment>
      </div>

      {/* Tipografi Raksasa - Header Asimetris Kiri */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          left: "4vw",
          top: "5vh",
          zIndex: 10,
          pointerEvents: "none", // Agar mouse tidak terhalang teks saat mengendalikan rotasi kanvas
        }}
      >
        <h1
          style={{
            fontSize: "clamp(40px, 5vw, 64px)", // Responsive text size
            fontWeight: 900,
            letterSpacing: "-2px",
            margin: 0,
            lineHeight: 0.9,
            color: "#111827",
          }}
        >
          MECHANICAL
          <br />
          KEYBOARD.
        </h1>
        <div
          style={{
            height: "4px",
            width: "60px",
            backgroundColor: "#111827",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        />
        <p
          style={{
            fontSize: "16px",
            color: "#4b5563",
            fontWeight: 500,
            maxWidth: "300px",
            lineHeight: 1.6,
          }}
        >
          A commercial-grade 3D product showcase demonstrating state-driven
          materials and interactive exploded-view architectures. <br />
          <br />
          🖱️ Drag ﹒ ⟳ Rotate ﹒ ↕ Zoom
        </p>
      </motion.div>

      {/* Floating UI Configurator di kanan atas */}
      <ConfiguratorUI />
    </div>
  );
}

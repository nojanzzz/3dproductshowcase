import ConfiguratorUI from "./components/ConfiguratorUI";
import LightingAndEnvironment from "./components/LightingAndEnvironment";
import ProductModel from "./components/ProductModel";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
  return (
    <div className="app-container">
      {/* 3D Canvas di bawah - memenuhi layar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <LightingAndEnvironment>
          <ProductModel />
        </LightingAndEnvironment>
      </div>

      {/* Tipografi Raksasa - Reactive Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="header-container"
      >
        <h1 className="header-title">
          MECHANICAL
          <br />
          KEYBOARD.
        </h1>
        <div className="header-divider" />
        <p className="header-description">
          A commercial-grade 3D product showcase demonstrating state-driven
          materials and interactive exploded-view architectures.
          <br />
          <br />
          🖱️ Drag ﹒ ⟳ Rotate ﹒ ↕ Zoom
        </p>
      </motion.div>

      {/* Floating UI Configurator di kanan atas */}
      <ConfiguratorUI />
    </div>
  );
}

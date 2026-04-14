# 🚀 CHROMA.X – Interactive 3D Product Experience

![Project Status](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Three.js](https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-State-brown?style=for-the-badge) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-blue?style=for-the-badge)

<p align="center">
  <img src="assets/3dproductdemo.gif" alt="CHROMA.X Demo" width="100%">
</p>

**CHROMA.X** is a high-performance, commercial-grade **3D Product Configurator** designed for premium digital showcases. Built with modern web technologies, it bridges the gap between traditional e-commerce and immersive brand experiences, allowing users to interact with products in a high-fidelity 3D environment directly within their browser.

---

## 💎 The Business Value

In today's digital landscape, static images are no longer enough. CHROMA.X provides a competitive edge by offering:

1.  **Immersive Product Storytelling:** Move beyond 2D photos. Let customers feel the "heft" and "texture" of your product through real-time 3D interaction.
2.  **Increased Conversion Rates:** Interactive customization increases user "dwell time" and builds a psychological sense of ownership before the purchase.
3.  **Transparency & Education:** The "Exploded View" (Teardown) logic demonstrates manufacturing quality and internal engineering, building deep trust with high-end consumers.
4.  **Cost-Effective Scalability:** One 3D model replaces thousands of render permutations. Update colors, materials, or components instantly without new photoshoots.

---

## 🌟 Core Features

- **Real-time Material Configuration:** Instantly swap colors and finishes (matte, metallic, gloss) across multiple product components.
- **Exploded View (Teardown) Logic:** A sophisticated interpolation system that "breaks apart" the product to reveal its internal anatomy.
- **Spatial 3D Labeling:** Dynamic annotations that follow product parts in 3D space, providing technical specifications and context.
- **Cinematic Lighting:** Utilizing HDR environments and contact shadows to create a "studio-quality" look that feels premium and realistic.
- **Responsive Design:** Fully optimized for high-end desktop and mobile browsers.

---

## 🎮 User Guide

Interact with the showcase using the following controls:

- **Rotate:** Left-click and drag to spin the product.
- **Zoom:** Use the scroll wheel to get a closer look at fine details.
- **Pan:** Right-click and drag to move the camera across the scene.
- **Customize:** Use the floating **Configurator Panel** on the right to change colors for the Frame, Keys, Cable, and internal components.
- **Reveal Anatomy:** Click the **"TEARDOWN"** button to trigger the exploded view animation and reveal component labels.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React + TypeScript (Vite)
- **3D Engine:** Three.js
- **Bridge:** React Three Fiber (R3F)
- **Utilities:** React Three Drei (Controls, Shadows, Environment)
- **State Management:** Zustand (Global configuration state)
- **Animation:** Framer Motion (UI) & Maath (3D Vector Interpolation)

---

## 🚀 Getting Started

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nojanzzz/3d-product-configurator.git
    cd 3d-product-configurator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

## 🔧 Developer Customization Guide

This project is built to be a **reusable template**. While the default model is a Mechanical Keyboard, you can swap it for any product (Shoes, Watches, Electronics, Furniture).

### How to Swap the 3D Model:

1.  **Prepare your Model:**
    - Export your model as a `.glb` or `.gltf` file.
    - Place the file in the `/public` folder.
    - _Recommended:_ Use [GLTF Report](https://gltf.report/) to optimize and check your node names.

2.  **Update the Loader:**
    - Open `src/components/ProductModel.tsx`.
    - Update the `useGLTF` path and the `preload` path at the bottom of the file to point to your new file:
      ```tsx
      const { nodes, materials } = useGLTF("/your_new_model.glb");
      ```

3.  **Map your Components:**
    - The `ProductModel` component uses a wrapper called `KeyboardModule` (which you can rename to `ProductModule`).
    - Pass the specific `geometry` from your new `nodes` and the `material` from your `materials` to individual module components.
    - Set custom `explodedPosition` coordinates for each part to define how it moves when "Teardown" is active.

4.  **Customize UI Labels:**
    - Adjust the `name` prop in each module to update the 3D labels.
    - Update the `ConfiguratorUI.tsx` color pickers to match the material names in your new model.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🧑‍💻 Author

**Naufal Auzan R**
Computer Engineering, Vocational School IPB University
[Portfolio](https://port-jan.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/naufalauzanr/)

---

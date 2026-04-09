import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store";
import { Float, Html, Center, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
    defaultMaterial_1: THREE.Mesh;
    defaultMaterial_2: THREE.Mesh;
    defaultMaterial_3: THREE.Mesh;
    defaultMaterial_4: THREE.Mesh;
    defaultMaterial_5: THREE.Mesh;
  };
  materials: {
    ["03___Default"]: THREE.MeshStandardMaterial;
    ["09___Default"]: THREE.MeshStandardMaterial;
    ["02___Default"]: THREE.MeshStandardMaterial;
    ["08___Default"]: THREE.MeshStandardMaterial;
    ["07___Default"]: THREE.MeshStandardMaterial;
    ["01___Default"]: THREE.MeshStandardMaterial;
  };
};

function KeyboardModule({
  targetColor,
  originalPosition,
  explodedPosition,
  name,
  isExploded,
  geometry,
  baseMaterial,
  keepTexture,
  labelOffset = [0, 0, 0],
  ...props
}: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    const mat = baseMaterial.clone();

    if (!keepTexture) {
      mat.map = null;
      mat.color.set("#ffffff");
    }

    mat.roughness = 0.25;
    mat.metalness = 0.6;
    mat.needsUpdate = true;
    return mat;
  }, [baseMaterial, keepTexture]);

  useFrame((_state, delta) => {
    easing.dampC(material.color, targetColor, 0.2, delta);
    if (meshRef.current) {
      const targetPos = isExploded ? explodedPosition : originalPosition;
      easing.damp3(meshRef.current.position, targetPos, 0.3, delta);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={originalPosition}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
      {...props}
    >
      {name && (
        <Html
          position={labelOffset}
          distanceFactor={6}
          style={{
            opacity: isExploded ? 1 : 0,
            transition: "all 0.4s ease",
            transform: `translate3d(0, 0, 0) scale(${isExploded ? 1 : 0.8})`,
            pointerEvents: "none",
            zIndex: isExploded ? 100 : -1,
          }}
        >
          <div
            style={{
              background: "rgba(17, 24, 39, 0.85)",
              backdropFilter: "blur(8px)",
              color: "white",
              padding: "4px 12px",
              borderRadius: "4px",
              borderLeft: "3px solid #ff1a1a",
              fontSize: "11px",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "1px",
              fontWeight: 700,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              marginTop: "-30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default function ProductModel(props: any) {
  const { nodes, materials } = useGLTF(
    "/mechanical_keyboard.glb",
  ) as GLTFResult;
  const store = useStore();
  const exploded = store.exploded;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <Center position={[0, -0.4, 0]}>
        <group {...props} dispose={null} scale={[3, 3, 3]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              {/* Bottom Case - Nameless so Label is Hidden entirely */}
              <KeyboardModule
                name="" // Label HTML sengaja dimatikan
                geometry={nodes.defaultMaterial.geometry}
                baseMaterial={materials["03___Default"]}
                targetColor={store.frame}
                originalPosition={[0, 0, 0]}
                explodedPosition={[0, -0.3, 0.4]}
                isExploded={exploded}
              />

              <KeyboardModule
                name="Keycaps"
                geometry={nodes.defaultMaterial_4.geometry} // Node 4: Alpha & Modifier Keys
                baseMaterial={materials["07___Default"]}
                targetColor={store.keysBase}
                originalPosition={[0, 0, 0]}
                explodedPosition={[0, 0.5, -0.2]} // Melayang atas
                isExploded={exploded}
                keepTexture={true}
              />

              <KeyboardModule
                name="Base Plate"
                geometry={nodes.defaultMaterial_3.geometry} // Node 3: Stabilizer/Base Plate
                baseMaterial={materials["08___Default"]}
                targetColor={store.plate}
                originalPosition={[0, 0, 0]}
                explodedPosition={[0, 0.1, -0.4]}
                isExploded={exploded}
              />

              <KeyboardModule
                name="Type-C Connector"
                geometry={nodes.defaultMaterial_1.geometry}
                baseMaterial={materials["09___Default"]}
                targetColor={store.keysAccent}
                originalPosition={[0, 0, 0]}
                explodedPosition={[0.4, 0.4, -0.2]}
                isExploded={exploded}
                labelOffset={[0.49, -0.1, -0.4]} // Ekstra jauh ke kiri
              />

              <KeyboardModule
                name="Connectivity Cable"
                geometry={nodes.defaultMaterial_2.geometry}
                baseMaterial={materials["02___Default"]}
                targetColor={store.cable}
                originalPosition={[0, 0, 0]}
                explodedPosition={[0.6, 0.2, 0.1]}
                isExploded={exploded}
                labelOffset={[0.2, 0, -0.4]} // Sangat jauh ke kiri dan depan
              />

              <KeyboardModule
                name="Mechanical Switches"
                geometry={nodes.defaultMaterial_5.geometry} // Node 5: Switch Box
                baseMaterial={materials["01___Default"]}
                targetColor={store.details}
                originalPosition={[0, 0, 0]}
                explodedPosition={[-0.4, 0.2, 0]}
                isExploded={exploded}
              />
            </group>
          </group>
        </group>
      </Center>
    </Float>
  );
}

useGLTF.preload("/mechanical_keyboard.glb");

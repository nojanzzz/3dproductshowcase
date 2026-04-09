import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

export default function LightingAndEnvironment({ children }: { children: React.ReactNode }) {
  return (
    <Canvas shadows camera={{ position: [0, 1, 7], fov: 42 }} gl={{ antialias: true, preserveDrawingBuffer: true }}>
      <color attach="background" args={['#f3f4f6']} />
      
      {/* Efek Fog (Kabut) untuk menciptakan ilusi studio yang tak terbatas (Infinity Curve) */}
      <fog attach="fog" args={['#f3f4f6', 5, 15]} />

      {/* Pencahayaan Studio Mewah */}
      <ambientLight intensity={0.5} />
      <spotLight intensity={1.5} angle={0.3} penumbra={1} position={[10, 15, 10]} castShadow />
      
      <Suspense fallback={null}>
        {/* Model 3D */}
        {children}
        
        {/* The WOW Factor: Contact Shadows
            Beralih dari cermin bayangan penuh (yang membuat layar kotor/ramai saat kabel berterbangan)
            Menjadi bayangan pendar ambient (Soft Ambient Occlusion) layaknya produk di Studio Apple. 
        */}
        <ContactShadows 
          position={[0, -0.9, 0]} 
          opacity={0.65} 
          scale={20} 
          blur={2.5} 
          far={10} 
          color="#000000" 
        />

        <Environment preset="city" />
      </Suspense>

      <OrbitControls 
        makeDefault 
        enablePan={false}
        enableZoom={true} 
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2} // Mengunci sudut agar lantai tidak tembus pandang
        minDistance={3}
        maxDistance={12}
      />
    </Canvas>
  )
}

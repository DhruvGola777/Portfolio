import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, TorusKnot, Icosahedron, Environment, MeshDistortMaterial, PerformanceMonitor } from '@react-three/drei';

const Bubble = ({ isMobile, scaleMult }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const scrollY = window.scrollY;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + scrollY * 0.001;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + scrollY * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={isMobile ? [1, 32, 32] : [1, 64, 64]} scale={2.5 * scaleMult}>
        <MeshDistortMaterial
          color="#111111"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />
      </Sphere>
    </Float>
  );
};

const GlassShapes = ({ isMobile, scaleMult }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      // Continuous rotation + scroll-based rotation
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2 + scrollY * 0.003;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + scrollY * 0.002;
      
      // Slight vertical parallax effect
      groupRef.current.position.y = scrollY * -0.002;
    }
  });

  // Glowing highly visible material
  const materialProps = {
    color: '#3b82f6',
    emissive: '#3b82f6',
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8,
  };

  return (
    <group ref={groupRef} scale={scaleMult}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        {/* Placed behind the monolith so it gets refracted */}
        <TorusKnot position={[-4, 1.5, -3]} args={isMobile ? [0.5, 0.15, 64, 16] : [0.5, 0.15, 128, 32]}>
          <meshStandardMaterial {...materialProps} />
        </TorusKnot>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        {/* Placed in front */}
        <Icosahedron position={[3, -1.5, 2]} args={[0.8, 0]}>
          <meshStandardMaterial {...materialProps} />
        </Icosahedron>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={3}>
        {/* Placed far behind the monolith for heavy distortion */}
        <Sphere position={[0, -2.5, -4]} args={isMobile ? [0.5, 32, 32] : [0.5, 64, 64]}>
          <meshStandardMaterial {...materialProps} color="#ffffff" emissive="#ffffff" />
        </Sphere>
      </Float>
    </group>
  );
};

const ThreeScene = () => {
  const [dpr, setDpr] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [scaleMult, setScaleMult] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 768) {
        setScaleMult(0.55); // Smaller for mobile
      } else if (width < 1024) {
        setScaleMult(0.75); // Medium for tablet
      } else {
        setScaleMult(1); // Full size for desktop
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-background">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={isMobile ? 1 : dpr}>
        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} color="#ffffff" intensity={2} />
        <directionalLight position={[-10, -10, -5]} color="#3b82f6" intensity={1} />
        
        <Bubble isMobile={isMobile} scaleMult={scaleMult} />
        <GlassShapes isMobile={isMobile} scaleMult={scaleMult} />
        
        <OrbitControls enableZoom={false} autoRotate={!isMobile} autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;

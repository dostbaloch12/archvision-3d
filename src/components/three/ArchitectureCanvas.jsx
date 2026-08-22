'use client'

import { Component, Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'
import ArchitectureModel from './ArchitectureModel'

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return null
    }

    return this.props.children
  }
}

function ReadySignal({ onReady }) {
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    if (!onReady || !gl) {
      return undefined
    }

    const id = window.setTimeout(() => onReady(), 150)
    return () => window.clearTimeout(id)
  }, [gl, onReady])

  return null
}

export default function ArchitectureCanvas({
  active = true,
  autoRotate = true,
  enableZoom = false,
  enableRotate = true,
  cameraPosition = [6.8, 3.35, 6.8],
  onReady,
}) {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.25]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: cameraPosition, fov: 32, near: 0.1, far: 60 }}
      className="h-full w-full touch-none"
      onCreated={({ gl }) => {
        gl.setClearColor('#F4F3F0', 1)
      }}
    >
      <color attach="background" args={['#F4F3F0']} />
      <fog attach="fog" args={['#F4F3F0', 16, 34]} />

      <ambientLight intensity={1.25} color="#171717" />
      <hemisphereLight intensity={1.1} color="#E4F0DC" groundColor="#171717" />

      <directionalLight position={[8, 12, 6]} intensity={2.6} color="#FBFFF0" />
      <directionalLight position={[-8, 6, -6]} intensity={1.2} color="#CFE6D8" />
      <directionalLight position={[0, 4, 10]} intensity={0.85} color="#FFFFFF" />
      <directionalLight position={[-3, 7, -9]} intensity={1.2} color="#171717" />

      <spotLight
        position={[3, 9, 4]}
        angle={0.55}
        penumbra={0.9}
        intensity={1.6}
        color="#FBFAF7"
        distance={24}
      />

      <CanvasErrorBoundary>
        <Suspense fallback={null}>
          <ArchitectureModel />
          <ReadySignal onReady={onReady} />
        </Suspense>
      </CanvasErrorBoundary>

      <Grid
        position={[0, -1.2, 0]}
        args={[18, 18]}
        cellSize={0.6}
        cellThickness={0.35}
        cellColor="#D9D6CF"
        sectionSize={3}
        sectionThickness={0.8}
        sectionColor="#171717"
        fadeDistance={20}
        fadeStrength={1.2}
        infiniteGrid
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        enableZoom={enableZoom}
        enableRotate={enableRotate}
        autoRotate={active && autoRotate}
        autoRotateSpeed={0.32}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.02}
        minDistance={5}
        maxDistance={16}
        target={[0, 0.55, 0]}
      />
    </Canvas>
  )
}

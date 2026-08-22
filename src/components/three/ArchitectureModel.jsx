'use client'

const CONCRETE = '#F1F4EA'
const CONCRETE_ALT = '#DFE5D2'
const CHARCOAL = '#D9D6CF'
const STONE = '#9FB3A4'
const METAL = '#6E8A7B'
const HEDGE = '#171717'
const WATER = '#108A61'

const WINDOW_GLOWS = [
  { position: [-1.15, 1.02, 1.22], args: [0.52, 0.92, 0.02] },
  { position: [-0.45, 1.02, 1.22], args: [0.52, 0.92, 0.02] },
  { position: [0.25, 1.02, 1.22], args: [0.52, 0.92, 0.02] },
  { position: [0.15, 2.38, 1.08], args: [0.62, 0.62, 0.02] },
  { position: [0.95, 2.38, 1.08], args: [0.62, 0.62, 0.02] },
  { position: [2.62, 0.78, 0.15], args: [0.02, 0.58, 0.7] },
  { position: [2.62, 0.78, 0.95], args: [0.02, 0.58, 0.5] },
  { position: [-1.72, 1.35, -0.62], args: [0.28, 0.38, 0.02] },
  { position: [-1.72, 1.9, -0.62], args: [0.28, 0.38, 0.02] },
  { position: [-1.72, 2.45, -0.62], args: [0.28, 0.38, 0.02] },
]

const FINS = [-1.55, -1.28, -0.08, 0.2, 0.48]

const HEDGES = [
  { position: [-2.35, 0.38, 1.45], args: [0.42, 0.48, 0.55] },
  { position: [-2.35, 0.38, 0.75], args: [0.42, 0.48, 0.55] },
  { position: [-2.35, 0.28, 0.05], args: [0.42, 0.28, 0.5] },
  { position: [2.45, 0.3, 1.55], args: [0.5, 0.32, 0.4] },
  { position: [-1.9, 0.32, -1.7], args: [0.7, 0.36, 0.35] },
  { position: [0.2, 0.26, -1.75], args: [0.9, 0.24, 0.28] },
]

function Mass({ position, args, color = CONCRETE, roughness = 0.72, metalness = 0.04 }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  )
}

function Glow({ position, args }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color="#F3F6D8"
        emissive="#171717"
        emissiveIntensity={0.7}
        roughness={0.3}
      />
    </mesh>
  )
}

export default function ArchitectureModel() {
  return (
    <group position={[0, -1.18, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[6.2, 6.2, 0.06, 72]} />
        <meshStandardMaterial color="#062B1F" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[5.55, 5.68, 72]} />
        <meshStandardMaterial
          color="#171717"
          emissive="#171717"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>

      <Mass position={[0, 0.09, 0]} args={[5.5, 0.18, 4.3]} color={STONE} roughness={0.85} />

      <Mass position={[-0.2, 0.22, 1.55]} args={[1.5, 0.08, 0.55]} color={METAL} roughness={0.45} metalness={0.35} />
      <Mass position={[-0.2, 0.16, 1.85]} args={[1.3, 0.06, 0.38]} color={METAL} roughness={0.45} metalness={0.35} />
      <Mass position={[-0.2, 0.11, 2.1]} args={[1.1, 0.05, 0.28]} color={STONE} />

      <Mass position={[-0.45, 1.05, -0.12]} args={[3.35, 1.72, 2.65]} color={CONCRETE} />

      <Mass position={[-0.45, 0.62, 1.22]} args={[1.15, 0.85, 0.14]} color={CHARCOAL} />

      <mesh position={[-0.45, 1.08, 1.21]}>
        <boxGeometry args={[2.85, 1.42, 0.035]} />
        <meshStandardMaterial
          color="#A9D8C4"
          metalness={0.25}
          roughness={0.05}
          transparent
          opacity={0.4}
        />
      </mesh>

      {FINS.map((x) => (
        <Mass
          key={`fin-${x}`}
          position={[x, 1.08, 1.2]}
          args={[0.055, 1.58, 0.1]}
          color={CHARCOAL}
          roughness={0.35}
          metalness={0.5}
        />
      ))}

      <Mass position={[0.55, 2.38, 0.02]} args={[2.45, 1.18, 2.2]} color={CONCRETE_ALT} />

      <Mass
        position={[0.55, 3.02, 0.02]}
        args={[2.85, 0.08, 2.6]}
        color={CHARCOAL}
        roughness={0.5}
        metalness={0.3}
      />

      <Mass
        position={[-0.45, 1.94, -0.05]}
        args={[3.7, 0.07, 2.95]}
        color={CHARCOAL}
        roughness={0.5}
        metalness={0.3}
      />

      <Mass position={[0.55, 2.0, 1.05]} args={[1.7, 0.06, 0.7]} color={METAL} roughness={0.4} metalness={0.35} />
      <Mass position={[0.55, 2.12, 1.36]} args={[1.7, 0.22, 0.03]} color={CHARCOAL} roughness={0.35} metalness={0.45} />

      <Mass position={[1.95, 0.74, 0.35]} args={[1.7, 1.1, 2.15]} color={CONCRETE_ALT} />

      <mesh position={[2.81, 0.8, 0.35]}>
        <boxGeometry args={[0.03, 0.78, 1.75]} />
        <meshStandardMaterial
          color="#B6E0CD"
          metalness={0.3}
          roughness={0.05}
          transparent
          opacity={0.38}
        />
      </mesh>

      <Mass position={[-1.72, 1.72, -0.95]} args={[0.48, 3.08, 0.48]} color={STONE} roughness={0.8} />
      <Mass
        position={[-1.72, 3.3, -0.95]}
        args={[0.58, 0.08, 0.58]}
        color={CHARCOAL}
        roughness={0.45}
        metalness={0.35}
      />

      <Mass position={[1.15, 0.72, -1.15]} args={[0.09, 1.12, 0.09]} color={METAL} roughness={0.3} metalness={0.6} />
      <Mass position={[1.85, 0.72, -1.15]} args={[0.09, 1.12, 0.09]} color={METAL} roughness={0.3} metalness={0.6} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.55, 0.2, 1.55]} receiveShadow>
        <planeGeometry args={[2.15, 1.05]} />
        <meshStandardMaterial color={WATER} metalness={0.6} roughness={0.06} />
      </mesh>
      <Mass position={[1.55, 0.22, 1.05]} args={[2.2, 0.06, 0.05]} color={STONE} />
      <Mass position={[1.55, 0.22, 2.05]} args={[2.2, 0.06, 0.05]} color={STONE} />
      <Mass position={[0.47, 0.22, 1.55]} args={[0.05, 0.06, 1.05]} color={STONE} />
      <Mass position={[2.63, 0.22, 1.55]} args={[0.05, 0.06, 1.05]} color={STONE} />

      {HEDGES.map((hedge) => (
        <Mass
          key={`hedge-${hedge.position.join('-')}`}
          position={hedge.position}
          args={hedge.args}
          color={HEDGE}
          roughness={0.95}
          metalness={0}
        />
      ))}

      {WINDOW_GLOWS.map((win) => (
        <Glow key={`glow-${win.position.join('-')}`} position={win.position} args={win.args} />
      ))}
    </group>
  )
}

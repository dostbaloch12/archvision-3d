'use client'

import { useMemo, useRef } from 'react'
import { Center, useGLTF } from '@react-three/drei'

export default function BlenderModel({ src = '/models/building.glb', scale = 1.15 }) {
  const group = useRef(null)
  const { scene } = useGLTF(src)

  const model = useMemo(() => {
    const cloned = scene.clone(true)
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return cloned
  }, [scene])

  return (
    <group ref={group} position={[0, -1.18, 0]}>
      <Center top>
        <primitive object={model} scale={scale} />
      </Center>
    </group>
  )
}

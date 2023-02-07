import * as THREE from 'three'
import { ReactNode, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { LayerMaterial, Depth, Noise } from 'lamina'
import React from 'react'

export default function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
      <Inner />
    </Canvas>
  )
}

function Inner() {
  return (
    <>
      <Bg />
      <Suspense fallback={null}>
        <Caption>{`THE\nGARAEV\nSPACE.`}</Caption>
        <Rig />
      </Suspense>
    </>
  )
}

function Caption({ children }: { children: ReactNode }) {
  const { width } = useThree((state) => state.viewport)
  return (
    <Text
      position={[0, 0, -5]}
      lineHeight={0.8}
      font="/Ki-Medium.ttf"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle">
      {children}
    </Text>
  )
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
  })
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide} attachArray={undefined} attachObject={undefined} attachFns={undefined}>
        <Depth
          colorB="#332FD0"
          colorA="#9254C8"
          alpha={1}
          mode="normal"
          near={130}
          far={200}
          origin={new THREE.Vector3(100, 100, -100)}
          attachArray={undefined}
          attachObject={undefined}
          attachFns={undefined}
        />
        <Noise
          mapping="local"
          type="white"
          scale={1000}
          colorA="white"
          colorB="black"
          mode="subtract"
          alpha={0.05}
          attachArray={undefined}
          attachObject={undefined}
          attachFns={undefined}
        />
      </LayerMaterial>
    </mesh>
  )
}

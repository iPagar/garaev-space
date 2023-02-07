import * as THREE from 'three'
import { ReactNode, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { LayerMaterial, Depth, Noise } from 'lamina'
import React from 'react'
import { useWindowSize } from 'react-use'

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
        <CirlceLabels>
          <CirlceLabels.Label>CMS</CirlceLabels.Label>
          <CirlceLabels.Label>Chat Bots</CirlceLabels.Label>
          <CirlceLabels.Label>Web Apps</CirlceLabels.Label>
          <CirlceLabels.Label>Mobile Apps</CirlceLabels.Label>
          <CirlceLabels.Label>Web Sites</CirlceLabels.Label>
          <CirlceLabels.Label>Code Review</CirlceLabels.Label>
          <CirlceLabels.Label>Consulting</CirlceLabels.Label>
          <CirlceLabels.Label>Testing</CirlceLabels.Label>
        </CirlceLabels>
        <Rig />
      </Suspense>
    </>
  )
}

const CirlceLabelsContext = React.createContext({})

function CirlceLabels({ children }: { children: ReactNode }) {
  const { width } = useWindowSize()
  const childrenArray = React.Children.toArray(children)

  const coefByWidth = width > 600 ? 1 : 0.5

  // make label be in circle
  return (
    <CirlceLabelsContext.Provider value={{}}>
      <group>
        {childrenArray.map((child, i) => {
          const angle = (i / childrenArray.length) * Math.PI * 2
          const x = Math.cos(angle) * 2 * coefByWidth
          const y = Math.sin(angle) * 2 * coefByWidth
          return (
            <group key={i} position={[x, y, 0]}>
              {child}
            </group>
          )
        })}
      </group>
    </CirlceLabelsContext.Provider>
  )
}

CirlceLabels.Label = function Label({ children }: { children: string }) {
  const context = React.useContext(CirlceLabelsContext)

  if (!context) throw new Error('Label must be used inside CirlceLabels')

  return (
    <group>
      <Text
        position={[0, 0, -5]}
        lineHeight={0.8}
        font="/Ki-Medium.ttf"
        fontSize={0.09}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle">
        {children}
      </Text>
    </group>
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
          colorA={new THREE.Color('#332FD0')}
          colorB={new THREE.Color('#817fe6')}
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

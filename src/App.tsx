import * as THREE from 'three'
import { ReactNode, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { LayerMaterial, Depth, Noise } from 'lamina'
import React from 'react'
import { useWindowSize } from 'react-use'
import { motion } from 'framer-motion-3d'

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
        <СircleLabels>
          <СircleLabels.Label>CMS</СircleLabels.Label>
          <СircleLabels.Label>Chat Bots</СircleLabels.Label>
          <СircleLabels.Label>Web Apps</СircleLabels.Label>
          <СircleLabels.Label>Mobile Apps</СircleLabels.Label>
          <СircleLabels.Label>Web Sites</СircleLabels.Label>
          <СircleLabels.Label>Code Review</СircleLabels.Label>
          <СircleLabels.Label>Consulting</СircleLabels.Label>
          <СircleLabels.Label>Testing</СircleLabels.Label>
        </СircleLabels>
        <Rig />
        <RigByTime />
      </Suspense>
    </>
  )
}

const СircleLabelsContext = React.createContext({})

function СircleLabels({ children }: { children: ReactNode }) {
  const { width, height } = useWindowSize()
  const childrenArray = React.Children.toArray(children)

  // Адаптируем размер круга в зависимости от размера экрана, уменьшая или увеличивая его радиус.
  // Используем меньшую из ширины или высоты экрана для расчета, чтобы убедиться, что круг влезет в экран.
  const screenSize = Math.min(width, height)
  const circleSize = screenSize / 400 // Динамический размер круга

  // make label be in circle
  return (
    <СircleLabelsContext.Provider value={{}}>
      <group>
        {childrenArray.map((child, i) => {
          const angle = (i / childrenArray.length) * Math.PI * 2
          // Применяем динамический размер круга для расчета позиций меток
          const x = Math.sin(angle) * circleSize
          const y = Math.cos(angle) * circleSize

          return (
            <group key={i} position={[x, y, 0]}>
              {child}
            </group>
          )
        })}
      </group>
    </СircleLabelsContext.Provider>
  )
}

СircleLabels.Label = function Label({ children }: { children: string }) {
  const [hovered, setHovered] = React.useState(false)
  const context = React.useContext(СircleLabelsContext)
  const { width } = useWindowSize()

  if (!context) throw new Error('Label must be used inside СircleLabels')

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const textRef = React.useRef<THREE.Mesh>(null)
  const coef = width / 1920

  // underline when hovered
  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()

        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()

        setHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()

        // add query param
        const url = new URL(window.location.href)
        url.searchParams.set('service', children)
        window.history.pushState({}, '', url.toString())
      }}>
      <Text
        ref={textRef}
        position={[0, 0, -5]}
        lineHeight={0.8}
        font="/Ki-Medium.ttf"
        fontSize={0.2 * coef}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle">
        {children}
      </Text>
      <group position={[0, -0.07, -5]}>
        <mesh scale={[(textRef.current?.geometry.boundingBox?.max.x || 0) * 2, 0.01, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <motion.meshStandardMaterial initial="hidden" animate={hovered ? 'visible' : 'hidden'} variants={variants} />
        </mesh>
      </group>
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

function RigByTime({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.getElapsedTime()
    state.camera.position.lerp(v.set(Math.sin(t) * 0.001, Math.cos(t) * 0.001, 10), 0.05)
  })
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
  })
}

function Bg() {
  return (
    <motion.mesh scale={100}>
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
    </motion.mesh>
  )
}

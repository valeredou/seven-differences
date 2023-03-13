import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, SoftShadows, useHelper } from '@react-three/drei'
import { AxesHelper, DirectionalLightHelper } from 'three'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped

  return (
    <Canvas {...props} shadows>
      <Lights />
      {/* <SoftShadows
        enabled
        size={{ value: 35, min: 0, max: 100, step: 0.1 }}
        focus={{ value: 0.5, min: 0, max: 2, step: 0.1 }}
        samples={6}
      /> */}
      {children}
      {/* <axesHelper args={[5]} /> */}
      <Preload all />
      <OrbitControls />
    </Canvas>
  )
}

const Lights = (props) => {
  const light = useRef()
  //useHelper(light, THREE.DirectionalLightHelper, 'cyan')
  return (
    <group>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.5} ref={light} castShadow shadow-mapSize={1024} position={[1, 1, 1]} />
    </group>
  )
}

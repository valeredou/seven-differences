import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Plane, Preload, Sky, SoftShadows, useHelper } from '@react-three/drei'
import { AxesHelper, DirectionalLightHelper, Fog } from 'three'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped

  return (
    <Canvas {...props} shadows camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1, 4] }}>
      <Lights />
      <Environment preset='city' />
      <Plane receiveShadow castShadow position={[0, -0.2, 0]} args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color='white' />
      </Plane>
      <fog attach='fog' color='#1d3557' near={5} far={15} />
      {children}
      {/* <axesHelper args={[5]} /> */}
      <Preload all />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.1} minDistance={1} maxDistance={10} />
    </Canvas>
  )
}

const Lights = (props) => {
  const light = useRef()
  //useHelper(light, THREE.DirectionalLightHelper, 'cyan')
  return (
    <group>
      <directionalLight intensity={1} ref={light} castShadow shadow-mapSize={1024} position={[1, 1, 1]} />
    </group>
  )
}

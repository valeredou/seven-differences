import { Canvas } from '@react-three/fiber'
import { Backdrop, OrbitControls, Plane, Preload, Sky, SoftShadows, Stage, useHelper } from '@react-three/drei'
import { AxesHelper, DirectionalLightHelper, Fog } from 'three'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { colors } from '../helpers'
import { Perf } from 'r3f-perf'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  const [dpr, setDpr] = useState(1.5)
  return (
    <Canvas {...props} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1, 4] }}>
      {/* <Lights /> */}
      <Perf position='top-left' />

      <color attach='background' args={['#0f2043']} />
      <Backdrop receiveShadow floor={2} position={[0, -0.5, -3]} scale={[50, 10, 4]}>
        <meshStandardMaterial color={colors.primary} />
      </Backdrop>
      <Stage adjustCamera intensity={0.6} shadows>
        {/* <Plane receiveShadow castShadow position={[0, -0.2, 0]} args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color='white' />
        
        </Plane> */}
        {/* <fog attach='fog' color='#1d3557' near={5} far={15} /> */}
        {children}
      </Stage>
      <OrbitControls
        makeDefault
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minDistance={1}
        maxDistance={1}
        minZoom={1}
      />
      {/* <axesHelper args={[5]} /> */}
      <Preload all />
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

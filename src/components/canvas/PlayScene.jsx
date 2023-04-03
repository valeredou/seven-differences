import Farm from '@/components/canvas/Farm'
import Scene from '@/components/canvas/Scene'
import Navbar from '@/components/navbar'
import { levelState } from '@/stores/levelStore'
import {
  Bounds,
  Center,
  ContactShadows,
  Html,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  TransformControls,
  View,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Outline, Selection, Select } from '@react-three/postprocessing'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AdditiveBlending, NormalBlending } from 'three'
import { useSnapshot } from 'valtio'
import Shoe from './Shoe'

const Box = (props) => {
  const ref = useRef()
  const [hovered, hover] = useState(null)
  console.log(hovered)

  return (
    <Select enabled={hovered}>
      <mesh ref={ref} {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <boxGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>
    </Select>
  )
}

const PlayScene = (props) => {
  const [hovered, onHover] = useState(null)
  const selected = hovered ? [hovered] : undefined

  console.log(selected)

  const levelStore = useSnapshot(levelState)

  const ObjectToDisplay = levelStore.levels[levelStore.currentLevel].component
  const objectName = levelStore.levels[levelStore.currentLevel].name

  const outlineRef = useRef()

  return (
    <>
      <View track={props.mainView}>
        <color attach='background' args={['#f7f7ff']} />
        <Lights />
        <PerspectiveCamera makeDefault position={[1.5, 0, 3]} />
        <Selection>
          <EffectComposer multisampling={8} autoClear={false} renderPriority={2}>
            <Outline visibleEdgeColor='white' blur edgeStrength={100} width={500} xRay={false} />
          </EffectComposer>
          <Bounds fit clip observe damping={6} margin={0.8}>
            <Shoe name='Shoe1' />
          </Bounds>
        </Selection>
        {/* <Box /> */}
        <ContactShadows position={[0, -0.8, 0]} opacity={0.4} blur={1} far={0.8} />
        <OrbitControls makeDefault />
      </View>
      <View index={2} track={props.referenceView}>
        <color attach='background' args={['#d6edf3']} />
        <Center top left>
          <Html>
            <div>REFERENCE</div>
          </Html>
        </Center>
        <PerspectiveCamera makeDefault position={[1.5, 0, 5]} />
        <Lights />
        <OrbitControls makeDefault />
        <Shoe name='Shoe2' />
        <ContactShadows position={[0, -1, 0]} blur={1} opacity={0.2} />
      </View>
    </>
  )
}

export default PlayScene

function Lights() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} />
      <pointLight position={[-10, -10, -10]} color='blue' />
    </>
  )
}

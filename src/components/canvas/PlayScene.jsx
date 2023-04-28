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
  PresentationControls,
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
import { colors } from '../helpers'
import Shoe from './Shoe'
import { gameState } from '@/stores/gameStore'
import confetti from 'canvas-confetti'

const PlayScene = (props) => {
  const [hovered, onHover] = useState(null)
  const selected = hovered ? [hovered] : undefined

  const levelStore = useSnapshot(levelState)

  const ObjectToDisplay = levelStore.levels[levelStore.currentLevel].component
  const objectName = levelStore.levels[levelStore.currentLevel].name

  const game = useSnapshot(gameState)
  const level = useSnapshot(levelState)

  useEffect(() => {
    console.log(game.points)
    if (game.points !== 0) {
      confetti()
    }
  }, [game.points])

  return (
    <>
      <View track={props.mainView}>
        <color attach='background' args={[colors.white]} />
        <Lights />
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <Selection>
          <EffectComposer multisampling={8} autoClear={false} renderPriority={2}>
            <Outline visibleEdgeColor='white' blur edgeStrength={100} width={500} xRay={false} />
          </EffectComposer>
          <Bounds fit clip observe damping={6} margin={1}>
            {/* <PresentationControls global speed={2} zoom={0.8}> */}
            <ObjectToDisplay name={objectName + '1'} />
            {/* </PresentationControls> */}
          </Bounds>
        </Selection>
        {/* <Box /> */}
        <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={10} />
        {/* <axesHelper /> */}
        <ContactShadows position={[0, -0.8, 0]} opacity={0.4} blur={1} far={0.8} />
      </View>
      <View index={2} track={props.referenceView}>
        <color attach='background' args={['#d2e5ff']} />
        <PerspectiveCamera makeDefault position={[1.5, 0, 5]} />
        <Center top left>
          <Html>
            <div>REFERENCE</div>
          </Html>
        </Center>
        <Lights />
        <OrbitControls />
        <ObjectToDisplay name={objectName + '2'} reduced />
        <ContactShadows position={[0, -1, 0]} blur={1} opacity={0.2} />
      </View>
    </>
  )
}

export default PlayScene

function Lights() {
  return (
    <>
      <pointLight position={[20, 30, 10]} />
      {/* <pointLight position={[-10, -10, -10]} color='blue' /> */}
      <ambientLight intensity={1} />
    </>
  )
}

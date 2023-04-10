import React, { Suspense, useRef, useState } from 'react'
import { Box, Html, Plane, useCursor, useGLTF, useProgress } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { clickObject, gameState, updateCameraPosition } from '@/stores/gameStore'
import { useSnapshot } from 'valtio'
import { Loader } from '../loader'

const FarmScene = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/farm.gltf')
  const [hovered, hover] = useState(null)

  const gameStore = useSnapshot(gameState)

  useCursor(hovered) //changes the cursor when hover state is trigered on a mesh

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (props.name == 'Farm1') {
      updateCameraPosition(state.camera.position)
      if (gameStore.rotation) {
        group.current.rotation.y += delta * 0.1 //use delta to avoid difference between high framerate pc
      }
    } else {
      if (gameStore.syncCameraPosition === true) {
        state.camera.position.lerp(gameStore.cameraPosition, 0.1)
        state.camera.updateProjectionMatrix()
      }
      if (gameStore.rotation) {
        group.current.rotation.y += delta * 0.1
      }
    }
  })

  const clickElement = (element) => {
    clickObject(element)
  }

  return (
    <group ref={group} {...props} dispose={null} position={[0, 0, 0]}>
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.Circle.geometry}
        material={materials['default']}
        position={[0.47, 0, -0.61]}
        scale={3.76}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WindMill001.geometry}
        material={nodes.WindMill001.material}
        position={[1.26, 1.9, 0.17]}
        scale={0.48}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[-0.17, 1.05, 0.32]}
        scale={0.03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WindMill.geometry}
        material={nodes.WindMill.material}
        position={[1.26, 1.56, 0.08]}
        scale={0.48}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Well.geometry}
        material={nodes.Well.material}
        position={[2.08, 0.23, -0.06]}
        scale={[0.14, 0.13, 0.14]}
      />

      {!props.reduced && (
        <Select enabled={hovered == 'fence'}>
          <mesh
            onClick={() => {
              clickElement('fence')
            }}
            castShadow
            receiveShadow
            onPointerOver={() => hover('fence')}
            onPointerOut={() => hover('')}
            geometry={nodes.Fence_White013.geometry}
            material={nodes.Fence_White013.material}
            position={[1.4, -0.01, -2.47]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.1}
          />
        </Select>
      )}

      {!props.reduced && (
        <Select enabled={hovered == 'boxes'}>
          <mesh
            onClick={() => {
              clickElement('boxes')
            }}
            castShadow
            receiveShadow
            onPointerOver={() => {
              hover('boxes')
            }}
            onPointerOut={() => {
              hover('')
            }}
            geometry={nodes.Wooden_Box.geometry}
            material={nodes.Wooden_Box.material}
            position={[0.19, 0.05, 0.21]}
            scale={0.4}
          />
        </Select>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Trees.geometry}
        material={nodes.Trees.material}
        position={[0.37, 0.15, -1.36]}
        scale={62.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Barn_01.geometry}
        material={nodes.Barn_01.material}
        position={[-0.18, 0.41, -0.18]}
        scale={1.15}
      />
    </group>
  )
}

export default function Farm(props) {
  return (
    <Suspense fallback={<Loader />}>
      <FarmScene {...props} />
    </Suspense>
  )
}

useGLTF.preload('/models/farm.gltf')

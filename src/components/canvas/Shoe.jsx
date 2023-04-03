import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Box, Html, Plane, useCursor, useGLTF, useProgress } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { clickObject, gameState, updateCameraPosition } from '@/stores/gameStore'
import { proxy, useSnapshot } from 'valtio'
import { Loader } from '../loader'

const state = proxy({
  current: null,
  items: {
    laces: '#ffffff',
    mesh: '#ffffff',
    caps: '#ffffff',
    inner: '#ffffff',
    sole: '#ffffff',
    stripes: '#ffffff',
    band: '#ffffff',
    patch: '#ffffff',
  },
})

const ShoeScene = (props) => {
  const group = useRef()
  const lacesRef = useRef()
  const { nodes, materials } = useGLTF('/models/shoe/shoe-draco.glb')
  const [hovered, hover] = useState(null)

  const gameStore = useSnapshot(gameState)
  const snap = useSnapshot(state)

  useCursor(hovered) //changes the cursor when hover state is trigered on a mesh

  useFrame((state, delta) => {
    //SYNCING
    if (props.name == 'Shoe1') {
      updateCameraPosition(state.camera.position)
    } else {
      if (gameStore.syncCameraPosition === true) {
        state.camera.position.lerp(gameStore.cameraPosition, 0.2)
        state.camera.updateProjectionMatrix()
      }
    }

    //ROTATION
    if (gameStore.rotation) {
      group.current.rotation.y += 0.2 * delta
    }
  })

  const clickElement = (element) => {
    clickObject(element)
  }

  return (
    <group ref={group} {...props} dispose={null} position={[0, 0, 0]}>
      {!props.reduced && (
        <Select enabled={hovered == 'laces' ? true : false}>
          <mesh
            receiveShadow
            castShadow
            ref={lacesRef}
            onClick={() => {
              clickElement('laces')
            }}
            onPointerOver={() => {
              hover('laces')
            }}
            onPointerOut={() => hover('')}
            geometry={nodes.shoe.geometry}
            material={materials.laces}
            material-color={snap.items.laces}
          />
        </Select>
      )}
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={snap.items.mesh}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={snap.items.caps}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={snap.items.inner}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={snap.items.sole}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={snap.items.stripes}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={snap.items.band}
      />
      {!props.reduced && (
        <Select enabled={hovered == 'patch'}>
          <mesh
            receiveShadow
            castShadow
            onClick={() => {
              clickElement('patch')
            }}
            onPointerOver={() => hover('patch')}
            onPointerOut={() => hover('')}
            geometry={nodes.shoe_7.geometry}
            material={materials.patch}
            material-color={snap.items.patch}
          />
        </Select>
      )}
    </group>
  )
}

export default function Shoe(props) {
  return (
    <Suspense fallback={<Loader />}>
      <ShoeScene {...props} />
    </Suspense>
  )
}

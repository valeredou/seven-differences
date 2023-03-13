import React, { Suspense, useRef, useState } from 'react'
import { Box, Html, Plane, useCursor, useGLTF, useProgress } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const FarmScene = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/farm.gltf')
  const [hovered, hover] = useState(null)

  useCursor(hovered) //changes the cursor when hover state is trigered on a mesh

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.1
  })

  return (
    <group ref={group} {...props} dispose={null} position={[0, 0, 0]} rotation={[Math.PI / 8, 0, 0]}>
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
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor='white' edgeStrength={1000} width={1000} />
        </EffectComposer>
        <FarmScene {...props} />
      </Selection>
    </Suspense>
  )
}

useGLTF.preload('/models/farm.gltf')

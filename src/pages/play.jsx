import Farm from '@/components/canvas/Farm'
import Scene from '@/components/canvas/Scene'
import Navbar from '@/components/navbar'
import { levelState } from '@/stores/levelStore'
import {
  Bounds,
  ContactShadows,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  TransformControls,
  View,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import React, { createRef, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSnapshot } from 'valtio'

//refs for View
const mainView = createRef()
const referenceView = createRef()

const PlayScene = dynamic(() => import('@/components/canvas/PlayScene'), { ssr: false })

const Play = () => {
  const containerRef = useRef()

  return (
    <div className='play-container' ref={containerRef}>
      <Navbar></Navbar>

      <div className='main-view' ref={mainView} />
      <div
        className='reference-view'
        ref={referenceView}
        onPointerOver={() => {
          referenceView.current.style.width = '50vw'
          referenceView.current.style.height = '35vw'
        }}
        onPointerOut={() => {
          referenceView.current.style.width = '25vw'
          referenceView.current.style.height = '25vw'
        }}
      />

      {/* <ObjectToDisplay reduced name={objectName + '2'} /> */}

      {/* <Scene className='scene'>
        <ObjectToDisplay name={objectName + '1'} />
      </Scene>
      <div className='separation'></div>
      <Scene className='scene'>
        <ObjectToDisplay reduced name={objectName + '2'} />
      </Scene> */}
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Play.canvas = (props) => <PlayScene mainView={mainView} referenceView={referenceView} />

export default Play

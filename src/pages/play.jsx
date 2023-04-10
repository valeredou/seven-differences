import Navbar from '@/components/navbar'

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import React, { createRef, useEffect, useRef } from 'react'

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
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Play.canvas = (props) => <PlayScene mainView={mainView} referenceView={referenceView} />

export default Play

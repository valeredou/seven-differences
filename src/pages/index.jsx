import Dropdown from '@/components/dropdown'
import Navbar from '@/components/navbar'

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

//refs for View
const mainView = createRef()
const referenceView = createRef()

const PlayScene = dynamic(() => import('@/components/canvas/PlayScene'), { ssr: false })

const Play = () => {
  const containerRef = useRef()

  const [referenceOpen, setReferenceOpen] = useState(false)

  useEffect(() => {
    console.log(referenceView.current.style)
  }, [])

  return (
    <div className='play-container' ref={containerRef}>
      {/* <Navbar></Navbar> */}

      <Dropdown />

      <div className='main-view' ref={mainView} />
      <div
        className={`reference-view `}
        ref={referenceView}
        // onPointerOver={() => {
        //   if (!isMobile) {
        //     referenceView.current.style.width = '50vw'
        //     referenceView.current.style.height = '35vw'
        //   }
        // }}
        // onPointerOut={() => {
        //   if (!isMobile) {
        //     referenceView.current.style.width = '25vw'
        //     referenceView.current.style.height = '25vw'
        //   }
        // }}
        onClick={() => {
          if (isMobile) {
            let tempRef = !referenceOpen
            if (tempRef) {
              referenceView.current.style.width = '75vw'
              referenceView.current.style.height = '50vh'
            } else {
              referenceView.current.style.width = '25vw'
              referenceView.current.style.height = '15vh'
            }
            setReferenceOpen(!referenceOpen)
          }
        }}
      />
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Play.canvas = (props) => <PlayScene mainView={mainView} referenceView={referenceView} />

export default Play

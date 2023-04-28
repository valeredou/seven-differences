import Dropdown from '@/components/dropdown'
import Navbar from '@/components/navbar'
import Timer from '@/components/timer'
import { gameState } from '@/stores/gameStore'
import { levelState } from '@/stores/levelStore'

import { Canvas } from '@react-three/fiber'
import { useAnimate } from 'framer-motion'
import dynamic from 'next/dynamic'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useSnapshot } from 'valtio'
import { TourProvider, useTour } from '@reactour/tour'
import { Observables } from '@reactour/utils'
import { timerStore } from '@/stores/timerStore'

//refs for View
const mainView = createRef()
const referenceView = createRef()

const PlayScene = dynamic(() => import('@/components/canvas/PlayScene'), { ssr: false })

const Play = () => {
  const containerRef = useRef()
  const [scope, animate] = useAnimate()

  const [referenceOpen, setReferenceOpen] = useState(false)

  const levelStore = useSnapshot(levelState)
  const gameStore = useSnapshot(gameState)

  useEffect(() => {
    if (gameStore.points != 0) {
      animate(scope.current, { opacity: [0, 1, 0], y: [0, 100], scale: [1, 1.2] }, { duration: 1.5 })
    }
  }, [gameStore.points])

  const steps = [
    {
      selector: '.dropdown-container',
      content: "Here is the main menu, you'll find informations about your current game",
    },
    {
      selector: '.toggle',
      content: 'You can toggle it clicking here, if you want some space to seek',
    },
    {
      selector: '.restart',
      content: 'You can restart the level if you want to compete!',
    },
    {
      selector: '.timer',
      content: 'Always keep an eye on time!',
    },
    {
      selector: '.reference-view ',
      mutationObservables: ['.reference-view'],
      content: 'Here is the reference view, you can compare your model to find the differences.',
    },

    {
      selector: '.main-view ',
      mutationObservables: ['.reference-view'],
      content: 'Finally, the main view, you can click on details missing in the reference view to score points!',
    },
    // ...
  ]

  const radius = 10

  return (
    <TourProvider
      steps={steps}
      className='tour'
      onClickClose={({ setIsOpen }) => {
        setIsOpen(false)
        timerStore.startTimer()
      }}
      padding={{
        mask: 5,
      }}
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: radius,
        }),
        maskArea: (base) => ({ ...base, rx: radius, borderRadius: radius }),
      }}
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false)
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
        }
      }}>
      <div className='play-container' ref={containerRef}>
        {/* <Navbar></Navbar> */}

        <Dropdown />

        <div className='good-answer' ref={scope}>
          + 1
        </div>

        <Timer />

        <div className='main-view' ref={mainView} />

        <div
          className={`reference-view `}
          ref={referenceView}
          onPointerOver={() => {
            if (!isMobile) {
              referenceView.current.style.width = '50vw'
              referenceView.current.style.height = '50vh'
            }
          }}
          onPointerOut={() => {
            if (!isMobile) {
              referenceView.current.style.width = '25vw'
              referenceView.current.style.height = '25vh'
            }
          }}
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
    </TourProvider>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Play.canvas = (props) => <PlayScene mainView={mainView} referenceView={referenceView} />

export default Play

'use client'

import { UilArrowLeft, UilRedo, UilAngleRightB } from '@iconscout/react-unicons'
import { ToggleButton } from './toggleButton'
import { gameState, resetGameState, toggleCameraSync, toggleRotation } from '@/stores/gameStore'
import { useSnapshot } from 'valtio'
import { levelState } from '@/stores/levelStore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { isMobile } from 'react-device-detect'
import { timerStore } from '@/stores/timerStore'
import confetti from 'canvas-confetti'
import { useTour } from '@reactour/tour'
import 'animate.css'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import Lottie from 'lottie-react'
import welcome from 'public/welcome.json'

const Dropdown = () => {
  const [scope, animate] = useAnimate()
  const [toggleOpen, setOpen] = useState(isMobile ? false : true)
  const { isOpen, currentStep, setIsOpen, setCurrentStep } = useTour()

  const levelStore = useSnapshot(levelState)
  const gameStore = useSnapshot(gameState)
  const router = useRouter()

  //Only to check for reactour
  useEffect(() => {
    if (!sessionStorage.getItem('tour')) {
      const MySwal = withReactContent(Swal)

      MySwal.fire({
        html: (
          <div className='welcome'>
            <Lottie animationData={welcome} />

            <div className='explanations'>
              <h1>{'Welcome to 3Differences!'}</h1>
              <h2>{"As you can guess, i'm a 7 differences game (3 here for the pun), but in 3D."}</h2>
              <h3>{"Let's see how fast you can get ;)"}</h3>
            </div>
          </div>
        ),
        customClass: {
          container: 'welcome-container',
          popup: 'welcome-popup',
        },
        confirmButtonText: 'How it works?',
        confirmButtonColor: '#1d3557',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsOpen(true)
        }
      })
      sessionStorage.setItem('tour', true)
    } else {
      timerStore.startTimer()
    }
  }, [])

  return (
    <div className='dropdown-container'>
      <div className='header'>
        <motion.div className='toggle' animate={{ rotate: toggleOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <UilAngleRightB
            className='toggle-icon'
            onClick={() => {
              //If react tour is live
              if (isOpen) {
                setCurrentStep(currentStep + 1)
              }

              setOpen(!toggleOpen)
            }}
            size={30}
          />{' '}
        </motion.div>
        <div className='title'>3Differences</div>
        <div className='restart' onClick={() => resetGameState()}>
          <UilRedo className='redo' size={30} />{' '}
        </div>
      </div>
      <motion.div
        className={`content ${toggleOpen && 'active'}`}
        animate={{ height: toggleOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}>
        <div className='item disable-rotation'>
          <span className='text'>Rotation</span>
          <ToggleButton
            onClick={() => {
              toggleRotation()
            }}
            toggleState={gameStore.rotation}
          />
        </div>

        <div className=' item current-level'>
          <span className='text'>Level</span>
          <span className='value'>{levelStore.currentLevel}</span>
        </div>
        <div className=' item differences-count'>
          <span className='text'>Guesses</span>
          <span className='value'>
            {gameStore.currentAnswers.length + ' / ' + levelStore.levels[levelStore.currentLevel].goodAnswers.length}
          </span>
        </div>
        <div className=' item differences-count'>
          <span className='text'>Help ? </span>
          <span className='value clickable'>Watch tutorial</span>
        </div>
      </motion.div>
    </div>
  )
}

export default Dropdown

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

const Dropdown = () => {
  const [scope, animate] = useAnimate()
  const [isOpen, setOpen] = useState(isMobile ? false : true)

  const levelStore = useSnapshot(levelState)
  const gameStore = useSnapshot(gameState)
  const router = useRouter()

  return (
    <div className='dropdown-container'>
      <div className='header'>
        <motion.div className='toggle' animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <UilAngleRightB className='toggle-icon' onClick={() => setOpen(!isOpen)} size={30} />{' '}
        </motion.div>
        <div className='title'>7 DIFFERENCES</div>
        <div className='restart' onClick={() => resetGameState()}>
          <UilRedo className='redo' size={30} />{' '}
        </div>
      </div>
      <motion.div
        className={`content ${isOpen && 'active'}`}
        animate={{ height: isOpen ? 'auto' : 0 }}
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
      </motion.div>
    </div>
  )
}

export default Dropdown

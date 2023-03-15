import { gameState, toggleCameraSync, toggleRotation } from '@/stores/gameStore'
import { levelState } from '@/stores/levelStore'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSnapshot } from 'valtio'
import { ToggleButton } from './toggleButton'
import { UilArrowLeft } from '@iconscout/react-unicons'

const Navbar = ({ props, children }) => {
  const levelStore = useSnapshot(levelState)
  const gameStore = useSnapshot(gameState)
  const router = useRouter()

  return (
    <motion.nav
      initial='initialState'
      animate='animateState'
      exit='exitState'
      variants={{
        initialState: { height: '0px', opacity: 0 },
        animateState: { height: '56px', opacity: 1 },
        exitState: { height: '0px', opacity: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.5 }}
      id='nav'>
      <div
        className='back'
        onClick={() => {
          router.push('/')
        }}>
        <UilArrowLeft size={30} /> {' BACK'}
      </div>

      {children}

      <div className='sync-position'>
        Sync
        <ToggleButton
          toggleState={gameStore.syncCameraPosition}
          onClick={() => {
            toggleCameraSync()
          }}
        />
      </div>
      <div className='disable-rotation'>
        Rotation{' '}
        <ToggleButton
          toggleState={gameStore.rotation}
          onClick={() => {
            toggleRotation()
          }}
        />
      </div>
      <div className='current-level'>{'Level ' + levelStore.currentLevel}</div>
      <div className='answers-count'>
        {gameStore.currentAnswers.length + ' / ' + levelStore.levels[levelStore.currentLevel].goodAnswers.length}
      </div>
    </motion.nav>
  )
}

export default Navbar

import { gameState, toggleRotation } from '@/stores/gameStore'
import { levelState } from '@/stores/levelStore'
import { motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { ToggleButton } from './toggleButton'

const Navbar = ({ props, children }) => {
  const levelStore = useSnapshot(levelState)
  const gameStore = useSnapshot(gameState)

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
      {children}

      <div className='sync-position'>Sync position</div>
      <div className='disable-rotation'>
        Rotation{' '}
        <ToggleButton
          toggleState={gameStore.rotation}
          onClick={() => {
            toggleRotation()
          }}
        />
      </div>
      <div className='answers-count'>
        {gameStore.currentAnswers.length + ' / ' + levelStore.levels[levelStore.currentLevel].goodAnswers.length}
      </div>
    </motion.nav>
  )
}

export default Navbar

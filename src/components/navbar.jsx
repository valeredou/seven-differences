import { gameState } from '@/stores/gameStore'
import { levelState } from '@/stores/levelStore'
import { motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

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
      <div className='answers-count'>
        {gameStore.currentAnswers.length + ' / ' + levelStore.levels[levelStore.currentLevel].goodAnswers.length}
      </div>
    </motion.nav>
  )
}

export default Navbar

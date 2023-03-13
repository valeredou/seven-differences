import { motion } from 'framer-motion'

const Navbar = ({ props, children }) => {
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
    </motion.nav>
  )
}

export default Navbar

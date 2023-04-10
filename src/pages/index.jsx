import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import HomeScene from '@/components/canvas/HomeScene'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
//const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Home(props) {
  const router = useRouter()
  return (
    <div className='home-container'>
      {/* <motion.h1
        initial='initialState'
        animate='animateState'
        exit='exitState'
        variants={{
          initialState: { opacity: 0.2, y: 30 },
          animateState: { opacity: 1, y: 0 },
          exitState: { y: 50 },
        }}
        transition={{ duration: 0.75 }}>
        SEVEN DIFFERENCES
      </motion.h1>
      <Button
        type='button'
        className='secondary play-button'
        onClick={() => {
          router.push('/play')
        }}
        initial='initialState'
        animate='animateState'
        exit='exitState'
        variants={{
          initialState: { opacity: 0.2, y: -30 },
          animateState: { opacity: 1, y: 0 },
          exitState: { y: -50 },
        }}
        transition={{ duration: 0.75 }}>
        PLAY
      </Button> */}
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Home.canvas = (props) => <HomeScene scale={0.5} route='/play' />

export async function getStaticProps() {
  return { props: { title: 'Home' } }
}

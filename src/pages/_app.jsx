import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/public/css/index.min.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

//toto
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  const router = useRouter()
  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={router.route}
            initial='initialState'
            animate='animateState'
            exit='exitState'
            variants={{
              initialState: { opacity: 0.2, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
              animateState: { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
              exitState: { clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)' },
            }}
            transition={{ duration: 0.75, type: 'tween', stiffness: 100 }}
            className='base-page-size'>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
            {Component.canvas(pageProps)}
          </Scene>
        )}
      </Layout>
    </>
  )
}

import Farm from '@/components/canvas/Farm'
import Scene from '@/components/canvas/Scene'
import { RoundedBox, Sphere } from '@react-three/drei'
import { useRouter } from 'next/router'
import React from 'react'

const Play = () => {
  const router = useRouter()
  return (
    <div className='play-container'>
      <Scene className='scene'>
        <Farm />
      </Scene>
      <div className='separation'></div>
      <Scene className='scene'>
        <Farm reduced />
      </Scene>

      <div
        className='back'
        onClick={() => {
          router.push('/')
        }}>
        {'< BACK'}
      </div>
    </div>
  )
}

export default Play

import Farm from '@/components/canvas/Farm'
import Scene from '@/components/canvas/Scene'
import Navbar from '@/components/navbar'
import { levelState } from '@/stores/levelStore'
import { RoundedBox, Sphere } from '@react-three/drei'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSnapshot } from 'valtio'

const MySwal = withReactContent(Swal)

const Play = () => {
  const levelStore = useSnapshot(levelState)

  const ObjectToDisplay = levelStore.levels[levelStore.currentLevel].component
  const objectName = levelStore.levels[levelStore.currentLevel].name

  return (
    <div className='play-container'>
      <Navbar></Navbar>
      <Scene className='scene'>
        <ObjectToDisplay name={objectName + '1'} />
      </Scene>
      <div className='separation'></div>
      <Scene className='scene'>
        <ObjectToDisplay reduced name={objectName + '2'} />
      </Scene>
    </div>
  )
}

export default Play

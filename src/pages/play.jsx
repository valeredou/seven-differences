import Farm from '@/components/canvas/Farm'
import Scene from '@/components/canvas/Scene'
import Navbar from '@/components/navbar'
import { levelState } from '@/stores/levelStore'
import { RoundedBox, Sphere } from '@react-three/drei'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSnapshot } from 'valtio'

const MySwal = withReactContent(Swal)

const Play = () => {
  const router = useRouter()
  const levelStore = useSnapshot(levelState)

  useEffect(() => {
    console.log('je passe dans le useeFFECGT')
    let div = document.getElementsByClassName('sync-position')[0]

    //TO FIX
    div.addEventListener('click', () => {
      console.log('jajoute un listener')
      alert('Hi!')
    })
  }, [])

  // if (levelStore.levels[levelState.currentLevel].accomplished == true) {
  //   MySwal.fire({
  //     title: <p>Hello World</p>,
  //     didOpen: () => {
  //       // `MySwal` is a subclass of `Swal` with all the same instance & static methods
  //       MySwal.showLoading()
  //     },
  //   }).then(() => {
  //     return MySwal.fire(<p>Shorthand works too</p>)
  //   })
  // }
  return (
    <div className='play-container'>
      <Navbar>
        <div
          className='back'
          onClick={() => {
            router.push('/')
          }}>
          {'< BACK'}
        </div>
      </Navbar>
      <Scene className='scene'>
        <Farm />
      </Scene>
      <div className='separation'></div>
      <Scene className='scene'>
        <Farm reduced />
      </Scene>
    </div>
  )
}

export default Play

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { proxy } from 'valtio'
import 'animate.css'
import Farm from '@/components/canvas/Farm'
import Shoe from '@/components/canvas/Shoe'
import { resetGameState } from './gameStore'

//contains arrays of the responses for each level (key)
const levels = {
  1: { name: 'Farm', component: Farm, goodAnswers: ['fence', 'boxes'], accomplished: false },
  2: { name: 'Shoe', component: Shoe, goodAnswers: ['patch', 'laces'], accomplished: false },
}

export const levelState = proxy({ currentLevel: 1, levels: levels })

export const levelAccomplished = () => {
  const MySwal = withReactContent(Swal)
  levels[levelState.currentLevel].accomplished = true
  resetGameState()
  MySwal.fire({
    title: 'Congratulations!',
    icon: 'success',
    text: 'Level ' + levelState.currentLevel + ' accomplished',
    confirmButtonText: 'Next level',
    confirmButtonColor: '#1d3557',
    showClass: {
      popup: 'animate__animated animate__tada',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      incLevel()
    }
  })
}

export const incLevel = () => {
  if (levelState.currentLevel < Object.keys(levels).length) {
    levelState.currentLevel++
  }
}

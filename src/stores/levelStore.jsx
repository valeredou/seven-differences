import { proxy } from 'valtio'

//contains arrays of the responses for each level (key)
const levels = {
  1: { name: 'Farm', goodAnswers: ['fence', 'boxes'], accomplished: false },
}

export const levelState = proxy({ currentLevel: 1, levels: levels })

export const initLevel = () => {
  levelState.currentLevel = 1
}

export const levelAccomplished = () => {
  console.log('LEVEL ACCOMPLISHED')
  levels[levelState.currentLevel].accomplished = true
}

export const incLevel = () => {
  levelState.currentLevel++
}

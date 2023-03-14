import { proxy } from 'valtio'
import { toJS } from './helpers'
import { levelAccomplished, levels, levelState } from './levelStore'

export const gameState = proxy({
  points: 0, //number of points of the current level
  currentAnswers: [],
  rotation: true,
  syncCameraPosition: false, //triggers camera position change on second scene
  cameraPosition: {}, //contains the camera position from the first scene
})

// export const clickElement = (element) => {
//   if (!gameState.includes(element)) {
//     currentAnswers.push(element)
//   }
//   checkWin()
// }

export const clickObject = (objectClicked) => {
  const maxGoodAnswerCount = levelState.levels[levelState.currentLevel].goodAnswers.length
  let goodAnswerCount = gameState.points

  console.log(objectClicked, goodAnswerCount < maxGoodAnswerCount)

  if (
    levelState.levels[levelState.currentLevel].goodAnswers.includes(objectClicked) &&
    !gameState.currentAnswers.includes(objectClicked) &&
    goodAnswerCount < maxGoodAnswerCount
  ) {
    goodAnswerCount++
    gameState.currentAnswers.push(objectClicked)
    gameState.points = goodAnswerCount
  }

  if (goodAnswerCount == maxGoodAnswerCount) {
    levelAccomplished()
  }

  console.log(toJS(levelState), toJS(gameState))
}

export const toggleRotation = () => {
  gameState.rotation = !gameState.rotation
}

export const toggleCameraSync = () => {
  gameState.syncCameraPosition = !gameState.syncCameraPosition
}

export const updateCameraPosition = (newCameraPosition) => {
  gameState.cameraPosition = newCameraPosition
}

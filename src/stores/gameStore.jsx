import { proxy } from 'valtio'
import { toJS } from './helpers'
import { levelAccomplished, levels, levelState } from './levelStore'

export const gameState = proxy({ points: 0, currentAnswers: [] })

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

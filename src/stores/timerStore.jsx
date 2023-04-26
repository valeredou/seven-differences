import { proxy } from 'valtio'

export const timerStore = proxy({
  time: 0,
  isRunning: false,
  intervalId: null,
  startTimer() {
    if (!timerStore.isRunning) {
      timerStore.isRunning = true
      timerStore.intervalId = setInterval(() => {
        timerStore.time += 10
      }, 10) // 10 millisecondes pour prendre en compte les centièmes de secondes
    }
  },
  stopTimer() {
    if (timerStore.isRunning) {
      clearInterval(timerStore.intervalId)
      timerStore.isRunning = false
    }
  },
  resetTimer() {
    timerStore.stopTimer()
    timerStore.time = 0
  },
})

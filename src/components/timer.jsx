import React, { useState, useEffect } from 'react'
import { UilStopwatch } from '@iconscout/react-unicons'
import { timerStore } from '@/stores/timerStore'
import { useSnapshot } from 'valtio'

function Timer() {
  const [time, setTime] = useState(timerStore.time)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(timerStore.time)
    }, 10)

    return () => clearInterval(intervalId)
  }, [])

  const formatTime = (time) => {
    const minutes = Math.floor((time / 1000 / 60) % 60)
    const seconds = Math.floor((time / 1000) % 60)
    const centiseconds = Math.floor((time / 10) % 100)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div
      className='timer'
      // onClick={() => {
      //   timerStore.startTimer()
      // }}
    >
      <UilStopwatch className='stopwatch' />
      <h1> {formatTime(time)}</h1>
    </div>
  )
}

export default Timer

import React, { useState, useEffect } from 'react'
import { UilStopwatch } from '@iconscout/react-unicons'

function Timer() {
  const [milliseconds, setMilliseconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds((milliseconds) => milliseconds + 10)
    }, 10)
    return () => clearInterval(interval)
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
    <div className='timer'>
      <UilStopwatch className='stopwatch' />
      <h1> {formatTime(milliseconds)}</h1>
    </div>
  )
}

export default Timer

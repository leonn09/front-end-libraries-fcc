import { useState, useEffect } from 'react'
import './App.css'

const TwentyFivePlusFiveClock = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timerLabel, setTimerLabel] = useState('Session')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      if (timerLabel === 'Session') {
        setTimeLeft((sessionLength - 1) * 60)
      }
    }
  }

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      if (timerLabel === 'Session') {
        setTimeLeft((sessionLength + 1) * 60)
      }
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

const handleReset = () => {
  setBreakLength(5)
  setSessionLength(25)
  setTimerLabel('Session')
  setTimeLeft(25 * 60)
  setIsRunning(false)

  const audio = document.getElementById('beep')
  audio.pause()
  audio.currentTime = 0
}

  const updateTimer = () => {
    if (isRunning && timeLeft > 0) {
      setTimeLeft(timeLeft - 1)
    } else if (timeLeft === 0) {
      if (timerLabel === 'Session') {
        setTimerLabel('Break')
        setTimeLeft(breakLength * 60)
      } else {
        setTimerLabel('Session')
        setTimeLeft(sessionLength * 60)
      }
    }
  }

  useEffect(() => {
    let timer = null
    if (isRunning) {
      timer = setInterval(updateTimer, 1000)
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = document.getElementById('beep')
      audio.play()
    }
  }, [timeLeft])

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="settings">
        <div className="break-length">
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={handleBreakIncrement}>+</button>
        </div>
        <div className="session-length">
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={handleSessionIncrement}>+</button>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{timerLabel}</h2>
        <span id="time-left">{formatTime(timeLeft)}</span>
        <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" preload="auto"></audio>
      </div>
      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default TwentyFivePlusFiveClock

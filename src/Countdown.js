import React, { useState, useContext, useEffect, useCallback } from 'react'
import styles from './Countdown.module.css'
import { GameContext } from './context'

export default function Countdown() {
  const [time, setTime] = useState(60)
  const gameContext = useContext(GameContext)

  const startClock = useCallback(() => {
    return time > 0
      ? setInterval(() => {
          setTime(time - 1)
        }, 1000)
      : null
  }, [time])

  const resetClock = useCallback(() => {
    setTime(60)
    gameContext.endGame()
  }, [gameContext])

  useEffect(() => {
    let id
    if (gameContext.started) {
      id = startClock()
    }
    return () => clearInterval(id)
  }, [gameContext.started, startClock])

  useEffect(() => {
    if (time === 0) {
      resetClock()
    }
  }, [time, resetClock])

  useEffect(() => {
    if (!gameContext.started && time < 60) setTime(60)
  }, [gameContext.started, time])

  return (
    <div className={styles.wrapper}>
      <p>{time}</p>
    </div>
  )
}

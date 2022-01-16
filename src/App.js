import React, { useState } from 'react'
import { GameContext } from './context'
import './App.css'
import Game from './Game'
import Countdown from './Countdown'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [stats, setStats] = useState({firstGame: true})

  function startGame() {
    setGameStarted(true)
  }
  function endGame() {
    setGameStarted(false)
  }

  return (
    <GameContext.Provider
      value={{ started: gameStarted, startGame, endGame, stats, setStats }}
    >
      <div className="App">
        <section>
          <p>you are worfless</p>
        </section>
        <Game />
        <Countdown />
      </div>
    </GameContext.Provider>
  )
}

export default App

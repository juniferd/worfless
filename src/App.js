import React, { useState } from 'react'
import { GameContext } from './context'
import './App.css'
import Game from './Game'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [stats, setStats] = useState({})

  function startGame() {
    setGameStarted(true)
  }
  function endGame() {
    setGameStarted(false)
  }

  return (
    <GameContext.Provider
      value={{ gameStarted, startGame, endGame, stats, setStats }}
    >
      <div className="App">
        <section>
          <p>you are worfless</p>
        </section>
        <Game />
      </div>
    </GameContext.Provider>
  )
}

export default App

import React, { useState } from 'react'
import {FontAwesomeIcon as FA} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import { GameContext } from './context'
import './App.css'
import Game from './Game'
import Countdown from './Countdown'
import Controls from './Controls'

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
          <p>you are worfless <FA icon={faCoffee} /></p>
        </section>
        <Game />
        <Controls />
        <Countdown />
      </div>
    </GameContext.Provider>
  )
}

export default App

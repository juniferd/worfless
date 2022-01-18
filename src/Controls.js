import React, { useContext } from 'react'
import { GameContext } from './context'

export default function Controls() {
  const { started, startGame, endGame, stats: { firstGame } } = useContext(GameContext)

  function updateGame() {
    if (!started) {
      startGame()
    } else {
      endGame()
    }
  }

  const getButtonText = () => {
    if (started) return 'end game';
    if (!started && firstGame) return 'play worfless';
    return 'play again'
  }

  return (
    <>
      <button onClick={updateGame}>{getButtonText()}</button>
    </>
  )
}

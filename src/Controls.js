import React, { useContext } from 'react'
import { GameContext } from './context'
import { Button } from './components'

export default function Controls() {
  const { started, startGame, endGame, firstGame } = useContext(GameContext)

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
      <Button onClick={updateGame}>{getButtonText()}</Button>
    </>
  )
}

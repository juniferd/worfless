import React from 'react'
import { GameContext } from './context'

export default function Controls() {
  return (
      <GameContext.Consumer>
        {(gameState) => {
          function updateGameStats() {
            if (!gameState.gameStarted) {
              gameState.startGame()
            } else {
              gameState.endGame()
            }
          }
          return (
            <>
              <button onClick={updateGameStats}>
                {gameState.gameStarted ? 'end' : 'start'} game
              </button>
            </>
          )
        }}
      </GameContext.Consumer>
  )
}

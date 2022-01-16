import React from 'react'
import { GameContext } from './context'

export default function Controls() {
  return (
      <GameContext.Consumer>
        {(gameState) => {
          function updateGameStats() {
            if (!gameState.started) {
              gameState.startGame()
            } else {
              gameState.endGame()
            }
          }
          return (
            <>
              <button onClick={updateGameStats}>
                {gameState.started ? 'end' : 'start'} game
              </button>
            </>
          )
        }}
      </GameContext.Consumer>
  )
}

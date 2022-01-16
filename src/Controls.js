import React from 'react'
import PropTypes from 'prop-types';
import { GameContext } from './context'

export default function Controls({
  grabTiles,
  getScore,
  resetGame,
}) {
  return (
      <GameContext.Consumer>
        {(gameState) => {
          function updateGameStats() {
            if (!gameState.gameStarted) {
              gameState.startGame()
              grabTiles()
            } else {
              gameState.endGame()
              getScore()
              resetGame()
              gameState.setStats({
                ...gameState.stats,
                count:
                  gameState.stats.count === undefined
                    ? 1
                    : gameState.stats.count + 1,
              })
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

Controls.propTypes = {
  grabTiles: PropTypes.func,
  getScore: PropTypes.func,
  resetGame: PropTypes.func,
}

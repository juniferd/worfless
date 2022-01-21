import React, { useContext } from 'react'
import { GameContext, StatsContext } from './context'

export default function Stats() {
  const { totalGames, recentGame, hist } = useContext(StatsContext)
  const { firstGame, started } = useContext(GameContext)

  console.log(hist, totalGames)
  return (
    <div>
      {!firstGame && !started && (
        <>
          <p>
            {recentGame.wordCount && recentGame.wordCount > 0
              ? `you got ${recentGame.wordCount} words for a total of ${recentGame.score} points.`
              : "you didn't guess any words! :("}
          </p>
          {recentGame.wordCount && recentGame.wordCount > 0 && (
            <p>your longest word was <strong>{recentGame.maxWord}</strong></p>
          )}
          {recentGame.foundWords && recentGame.foundWords.map(word => <p key={word}>{word}</p>)}
        </>
      )}
    </div>
  )
}

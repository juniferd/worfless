import React, { useState } from 'react'
import { Empty, Tile, TileWrapper } from './components'
import { GameContext } from './context'
import {
  findDeletedLetter,
  validateAndGetUpdatedGame,
  createShuffledBagOfLetters,
  scoreGame,
} from './helpers'
import Controls from './Controls'

export default function Game() {
  const [gameTiles, setGameTiles] = useState([])
  const [letters, setLetters] = useState(createShuffledBagOfLetters())
  // TODO revisit this later
  const [counter, setCounter] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [foundWords, setFoundWords] = useState([])
  const [valid, setValid] = useState({})

  function resetGame() {
    setCounter(0)
    setGameTiles([])
    setLetters(createShuffledBagOfLetters())
    setInputValue('')
    setFoundWords([])
  }

  function grabTiles(n = 10, currGameLetters = gameTiles) {
    const nextTiles = letters
      .slice(0, n)
      .map((letter, i) => ({ id: `${letter}-${i + 1 + counter}`, letter }))
    setGameTiles([...currGameLetters, ...nextTiles])
    setLetters(letters.slice(n))
    setCounter(counter + n)
  }

  function handleOnChange(e) {
    // handle deleted letter
    if (e.target.value.length < inputValue.length) {
      const deletedLetter = findDeletedLetter(
        e.target.value.toUpperCase(),
        inputValue.toUpperCase()
      )
      const updatedGameTiles = [...gameTiles]
      const index = updatedGameTiles.findIndex(({ letter, found }) => {
        return letter === deletedLetter && !!found
      })
      // TODO why
      if (updatedGameTiles[index]) {
        updatedGameTiles[index]['found'] = false
      }
      setGameTiles(updatedGameTiles)
    }
    setInputValue(e.target.value)
  }

  function handleKeyUp(e) {
    const word = e.target.value.toUpperCase()

    const { valid: validGame, updatedGameTiles } = validateAndGetUpdatedGame(
      word,
      [...gameTiles]
    )
    console.log(validGame)
    setGameTiles(updatedGameTiles)
    setValid({...validGame})

    if (e.keyCode === 13 && validGame.valid) {
      if (word.length > 2) {
        // on enter store the game word and remove tiles
        const remainingTiles = updatedGameTiles.filter(({ found }) => !found)
        // TODO maybe don't hardcode this
        const n = remainingTiles.length >= 10 ? 0 : 10 - remainingTiles.length
        grabTiles(n, remainingTiles)
        setFoundWords([...foundWords, word])
        setInputValue('')
      } else {
        setValid({valid: false, message: 'word needs to be longer than 2 letters'})
      }
    }
  }

  function getScore() {
    const { wordCount, points, maxWord } = scoreGame(foundWords)
    alert(
      `you got ${wordCount} words for a total of ${points} points. your longest word was ${maxWord}`
    )
  }

  return (
    <>
      <section>
        <GameContext.Consumer>
          {({ gameStarted }) => (
            <>
              {gameStarted ? (
                <>
                  <TileWrapper>
                    {gameTiles.map(({ id, letter, found }) => (
                      <Tile key={id} found={found} id={id} letter={letter} />
                    ))}
                  </TileWrapper>
                  <button onClick={() => grabTiles(3)}>get more</button>
                </>
              ) : (
                <Empty />
              )}
            </>
          )}
        </GameContext.Consumer>
      </section>
      <section>
        {!valid.valid && <p>{valid.message}</p>}
        <GameContext.Consumer>
          {({ gameStarted }) => (
            <input
              type="text"
              value={inputValue}
              onChange={handleOnChange}
              onKeyUp={handleKeyUp}
              disabled={!gameStarted}
            />
          )}
        </GameContext.Consumer>
      </section>
      <section>
        <p>{foundWords.length > 0 ? 'your words' : ''}</p>
        {foundWords.map((word, i) => (
          <p key={i}>{word}</p>
        ))}
      </section>
      <Controls grabTiles={grabTiles} getScore={getScore} resetGame={resetGame} />
    </>
  )
}

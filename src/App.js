import React, { useState, useEffect } from 'react'
import Tile, {TileWrapper} from './Tile'
import './App.css'
import bag from './letters'
import { findDeletedLetter, validateAndGetUpdatedGame } from './utils'
import scoreGame from './score';

function App() {
  const [gameTiles, setGameTiles] = useState([])
  const [letters, setLetters] = useState(bag())
  // TODO revisit this later
  const [counter, setCounter] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [foundWords, setFoundWords] = useState([])
  const [valid, setValid] = useState(true)

  useEffect(() => {
    // init
    grabTiles()
    // TODO uhhh fix this cleanup
    return () => {
      setTimeout(() => {
        setGameTiles([])
        setLetters(bag())
      }, 0)
    }
  }, [])

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
    setGameTiles(updatedGameTiles)
    setValid(validGame)

    if (e.keyCode === 13 && validGame) {
      // on enter store the game word and remove tiles
      const remainingTiles = updatedGameTiles.filter(({ found }) => !found)
      // TODO maybe don't hardcode this
      const n = remainingTiles.length >= 10 ? 0 : 10 - remainingTiles.length
      grabTiles(n, remainingTiles)
      setFoundWords([...foundWords, word])
      setInputValue('')
    }
  }

  function getScore() {
    const {wordCount, scrabblePoints, maxWord} = scoreGame(foundWords);
    alert(`you got ${wordCount} words for a total of ${scrabblePoints}. your longest word was ${maxWord}`)
  }

  return (
    <div className="App">
      <section>
        <p>you are worfless</p>
      </section>
      <section>
        <TileWrapper>
          {gameTiles.map(({ id, letter, found }) => (
            <Tile key={id} found={found} id={id} letter={letter} />
          ))}
        </TileWrapper>
        <button onClick={() => grabTiles(3)}>get more</button>
      </section>
      <section>
        {!valid && <p>that tile is not available!</p>}
        <input
          type="text"
          value={inputValue}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
        />
      </section>
      <section>
        <p>your words</p>
        {foundWords.map((word, i) => (
          <p key={i}>{word}</p>
        ))}
        <button onClick={getScore}>score this nonsense</button>
      </section>
    </div>
  )
}

export default App

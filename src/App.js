import { useState, useEffect } from 'react'
import Tile, {TileWrapper} from './Tile'
import './App.css'
import bag from './letters'
import { findDeletedLetter, validateAndGetUpdatedGame } from './utils'

function App() {
  const [gameTiles, setGameTiles] = useState([])
  const [letters, setLetters] = useState(bag())
  const [counter, setCounter] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [foundWords, setFoundWords] = useState([])
  const [valid, setValid] = useState(true)

  useEffect(() => {
    // init
    grabLetters()
    // TODO uhhh fix this cleanup
    return () => {
      setTimeout(() => {
        setGameTiles([])
        setLetters(bag())
      }, 0)
    }
  }, [])

  function grabLetters(n = 10, currGameLetters = gameTiles) {
    const nextLetters = letters
      .slice(0, n)
      .map((letter, i) => ({ id: `${letter}-${i + 1 + counter}`, letter }))
    setGameTiles([...currGameLetters, ...nextLetters])
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
      const updatedGameLetters = [...gameTiles]
      const index = updatedGameLetters.findIndex(({ letter, found }) => {
        return letter === deletedLetter && !!found
      })
      if (updatedGameLetters[index]) {
        updatedGameLetters[index]['found'] = false
      }
      setGameTiles(updatedGameLetters)
    }
    setInputValue(e.target.value)
  }

  function handleKeyUp(e) {
    const word = e.target.value.toUpperCase()

    const { valid: validGame, updatedGameLetters } = validateAndGetUpdatedGame(
      word,
      [...gameTiles]
    )
    setGameTiles(updatedGameLetters)
    setValid(validGame)

    if (e.keyCode === 13 && validGame) {
      // on enter store the game word and remove tiles
      const remainingTiles = updatedGameLetters.filter(({ found }) => !found)
      const n = remainingTiles.length >= 10 ? 0 : gameTiles.length - remainingTiles.length
      grabLetters(n, remainingTiles)
      setFoundWords([...foundWords, word])
      setInputValue('')
    }
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
        <button onClick={() => grabLetters(9)}>get more</button>
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
      </section>
    </div>
  )
}

export default App

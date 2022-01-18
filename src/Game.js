import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react'
import { Empty, Tile, TileWrapper } from './components'
import { GameContext } from './context'
import {
  findDeletedLetter,
  validateAndGetUpdatedGame,
  createShuffledBagOfLetters,
  scoreGame,
} from './helpers'

export default function Game() {
  const [gameTiles, setGameTiles] = useState([])
  const [letters, setLetters] = useState(createShuffledBagOfLetters())
  // TODO revisit this later
  const [counter, setCounter] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [foundWords, setFoundWords] = useState([])
  const [valid, setValid] = useState({})
  const { started: gameStarted, stats, setStats } = useContext(GameContext)
  const textInput = useRef()
  const [finalScoreText, setFinalScoreText] = useState([])
  const [dictionary, setDictionary] = useState({})
  const [swapMode, setSwapMode] = useState(false)

  const grabTiles = useCallback(
    (n = 10, currTiles = gameTiles) => {
      const nextTiles = letters
        .slice(0, n)
        .map((letter, i) => ({ id: `${letter}-${i + 1 + counter}`, letter }))
      setGameTiles([...currTiles, ...nextTiles])
      setLetters(letters.slice(n))
      setCounter(counter + n)
    },
    [counter, gameTiles, letters]
  )

  const getScore = useCallback(() => {
    const { wordCount, points, maxWord } = scoreGame(foundWords)
    setFinalScoreText([
      wordCount > 0
        ? `you got ${wordCount} words for a total of ${points} points. your longest word was ${maxWord}`
        : "you didn't guess any words! :(",
      ...foundWords,
    ])
  }, [foundWords])

  useEffect(() => {
    setTimeout(() => {
      import('./modules/dictionary')
        .then(({ createDictionary }) => {
          if (JSON.stringify(dictionary) === '{}') {
            const dict = createDictionary()
            setDictionary(dict)
          }
        })
        .catch((err) => {
          console.log('error:', err)
        })
    }, 0)
  }, [dictionary])

  // TODO this seems not great? listens to context and controls game starting/stopping

  useEffect(() => {
    if (gameStarted) {
      if (stats.firstGame) setStats({ ...stats, firstGame: false })
      grabTiles()
      textInput.current.focus()
    } else {
      if (!stats.firstGame) getScore()
      resetGame()
      setStats({
        ...stats,
        count: stats.count === undefined ? 0 : stats.count + 1,
      })
    }
    // TODO look into this pls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted])

  function resetGame() {
    setSwapMode(false)
    setCounter(0)
    setGameTiles([])
    setLetters(createShuffledBagOfLetters())
    setInputValue('')
    setFoundWords([])
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

  function checkDictionary(word) {
    return word in dictionary
  }

  function checkIfWordAlreadyUsed(word) {
    return foundWords.includes(word)
  }

  function handleKeyUp(e) {
    const word = e.target.value.toUpperCase()

    const { valid: validGame, updatedGameTiles } = validateAndGetUpdatedGame(
      word,
      [...gameTiles]
    )
    setGameTiles(updatedGameTiles)
    setValid({ ...validGame })

    if (e.keyCode === 13 && validGame.valid) {
      if (word.length <= 2) {
        setValid({
          valid: false,
          message: 'word must be longer than 2 letters',
        })
      } else if (checkIfWordAlreadyUsed(word)) {
        setValid({
          valid: false,
          message: 'you already used that word',
        })
      } else if (!checkDictionary(word)) {
        setValid({
          valid: false,
          message: 'word not found in dictionary',
        })
      } else {
        // on enter store the game word and remove tiles
        const remainingTiles = updatedGameTiles.filter(({ found }) => !found)
        // TODO maybe don't hardcode this
        const n = remainingTiles.length >= 10 ? 0 : 10 - remainingTiles.length
        grabTiles(n, remainingTiles)
        setFoundWords([...foundWords, word])
        setInputValue('')
      }
    }
  }

  function handleStartSwap() {
    // clear any found tiles
    const updatedTiles = [...gameTiles].map(t => ({ ...t, found: false }))
    setInputValue('')
    setGameTiles(updatedTiles)
    setSwapMode(true)
  }

  function handleCancelSwap() {
    // clear any pressed
    const updatedTiles = [...gameTiles].map(t => ({...t, pressed: false}))
    setGameTiles(updatedTiles)
    setSwapMode(false)
    textInput.current.focus();
  }

  function selectTile(id) {
    const updatedTiles = [...gameTiles]
    if (swapMode) {
      const tile = updatedTiles.find((tile) => tile.id === id)
      tile.pressed = !tile.pressed;
      const numPressed = updatedTiles.reduce((acc, t) => {
        return t.pressed ? acc + 1 : acc
      }, 0)
      if (numPressed === 3) {
        // remove pressed tiles, exit swap mode, grab 3 tiles
        grabTiles(3, updatedTiles.filter(t => !t.pressed))
        setSwapMode(false)
        textInput.current.focus();
      } else {
        setGameTiles(updatedTiles)
      }
    }
    // TODO selecting tiles by clicking
  }

  return (
    <>
      <section>
        {gameStarted ? (
          <>
            <TileWrapper>
              {gameTiles.map(({ id, letter, found, pressed}) => (
                <Tile
                  key={id}
                  found={found}
                  id={id}
                  letter={letter}
                  pressed={pressed}
                  onClick={() => selectTile(id)}
                  disabled={!swapMode}
                />
              ))}
            </TileWrapper>
            {swapMode ? (
              <button onClick={handleCancelSwap} style={{ background: '#333' }}>
                cancel swap
              </button>
            ) : (
              <button onClick={handleStartSwap} style={{ background: '#333' }}>
                swap 3 tiles
              </button>
            )}
          </>
        ) : (
          <Empty />
        )}
      </section>
      <section>
        {!valid.valid && <p>{valid.message}</p>}
        <input
          type="text"
          value={inputValue}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
          disabled={!gameStarted}
          ref={textInput}
        />
      </section>
      <section>
        {!gameStarted
          ? finalScoreText.map((text, i) => <p key={i}>{text}</p>)
          : ''}
        <p>{foundWords.length > 0 ? 'your words' : ''}</p>
        {foundWords.map((word, i) => (
          <p key={i}>{word}</p>
        ))}
      </section>
    </>
  )
}

import React, { useState } from 'react'
import { ModalContext, GameContext, StatsContext } from './context'
import './App.css'
import Game from './Game'
import ModalPortal from './ModalPortal'
import Countdown from './Countdown'
import Controls from './Controls'
import Stats from './Stats'
import { Header } from './modules/header'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [firstGame, setFirstGame] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [totalGameCount, setTotalGameCount] = useState(0)
  const [recentGame, setRecentGame] = useState({})
  const [hist, setHist] = useState({})

  const body = document.querySelector('body')

  function startGame() {
    setGameStarted(true)
    if (firstGame) setFirstGame(false)
  }

  function endGame() {
    setGameStarted(false)
  }

  function openModal() {
    setModalOpen(true)
    body.style.overflow = 'hidden'
  }

  function closeModal() {
    setModalOpen(false)
    body.style.overflow = 'auto'
  }

  function setModal(content) {
    setModalContent(content)
  }

  function setStats(recentGame) {
    setRecentGame(recentGame)
    // add to hist
    if (recentGame.score in hist) {
      const newHist = {...hist}
      newHist[recentGame.score] += 1
      setHist(newHist)
    } else {
      setHist({...hist, [recentGame.score]: 1})
    }
    setTotalGameCount(totalGameCount + 1)
  }

  return (
    <GameContext.Provider
      value={{ started: gameStarted, startGame, endGame, firstGame }}
    >
      <ModalContext.Provider
        value={{
          open: modalOpen,
          openModal,
          closeModal,
          setContent: setModal,
        }}
      >
        <StatsContext.Provider
          value={{ totalGames: totalGameCount, setStats, recentGame, hist }}
        >
          <div className="App">
            <Header />
            <main>
              <Game />
              <Controls />
              <Countdown />
              <Stats />
            </main>
          </div>
        </StatsContext.Provider>
        <ModalPortal>{modalOpen && modalContent}</ModalPortal>
      </ModalContext.Provider>
    </GameContext.Provider>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { GameContext } from './context'
import { ModalContext } from './context'
import './App.css'
import Game from './Game'
import ModalPortal from './ModalPortal'
import Countdown from './Countdown'
import Controls from './Controls'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [stats, setStats] = useState({ firstGame: true })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [header, setHeader] = useState(null)
  const body = document.querySelector('body')

  useEffect(() => {
    import('./modules/header')
      .then(({ Header }) => setHeader(<Header />))
      .catch((err) => console.log(err))
  }, [])

  function startGame() {
    setGameStarted(true)
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

  return (
    <GameContext.Provider
      value={{ started: gameStarted, startGame, endGame, stats, setStats }}
    >
      <ModalContext.Provider
        value={{
          open: modalOpen,
          openModal,
          closeModal,
          setContent: setModal,
        }}
      >
        <div className="App">
          <header>{header}</header>
          <main>
            <Game />
            <Controls />
            <Countdown />
          </main>
        </div>
        <ModalPortal>{modalOpen && modalContent}</ModalPortal>
      </ModalContext.Provider>
    </GameContext.Provider>
  )
}

export default App

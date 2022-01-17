import React, { useContext } from 'react'
import { GameContext } from './context'
import { ModalContext } from './context'

export default function Controls() {
  const {
    setContent: setModalContent,
    openModal,
    closeModal,
  } = useContext(ModalContext)
  const { started, startGame, endGame, stats: { firstGame } } = useContext(GameContext)

  function handleModalClick() {
    import('./modules/about')
      .then(({ About }) => {
        openModal()
        setModalContent(<About onClose={closeModal} />)
      })
      .catch((err) => console.log('error:', err))
  }

  function updateGame() {
    if (!started) {
      startGame()
    } else {
      endGame()
    }
  }

  const getButtonText = () => {
    if (started) return 'end game';
    if (!started && firstGame) return 'play worfless';
    return 'play again'
  }

  return (
    <>
      <button onClick={updateGame}>{getButtonText()}</button>
      <br />
      <button onClick={handleModalClick} style={{marginTop: '.5em', background: '#aaa'}}>about</button>
    </>
  )
}

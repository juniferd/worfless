import React, { useContext } from 'react'
import { Modal } from './components'
import { ModalContext, GameContext, StatsContext } from './context'
import styles from './Stats.module.css'

export default function StatsModal() {
  const { totalGames, recentGame } = useContext(StatsContext)
  const { startGame } = useContext(GameContext)
  const { closeModal } = useContext(ModalContext)

  function handleOnClick() {
    closeModal()
    startGame()
  }
  return (
    <Modal onClose={closeModal}>
      <Modal.Header onClose={closeModal}>
        you&apos;ve played {totalGames} games!
      </Modal.Header>
      <Modal.Content>
        <div className={styles.wrapper}>
          <p>
            {recentGame.wordCount && recentGame.wordCount > 0
              ? `you got ${recentGame.wordCount} words for a total of ${recentGame.score} points.`
              : "you didn't guess any words! :("}
          </p>
          {recentGame.wordCount && recentGame.wordCount > 0 ? (
            <p>
              your longest word was <strong>{recentGame.maxWord}</strong>
            </p>
          ) : null}
          {recentGame.wordCount && recentGame.wordCount > 0
            ? recentGame.foundWords.map((word) => <p key={word}>{word}</p>)
            : null}
          <button onClick={handleOnClick}>play again</button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

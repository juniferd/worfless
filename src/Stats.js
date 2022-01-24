import React, { useContext } from 'react'
import { Modal, Button } from './components'
import { ModalContext, GameContext, StatsContext } from './context'
import styles from './Stats.module.css'

export function Stats() {
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
        you&apos;ve played {totalGames} game{totalGames !== 1 ? 's' : ''}!
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
          {recentGame.wordCount && recentGame.wordCount > 0 ? (
            <>
              <p>your words:</p>
              <div className={styles.wordsWrapper}>
              {recentGame.foundWords.map((word) => (
                <span key={word} className={styles.word}>
                  {word}
                </span>
              ))}
              </div>
            </>
          ) : null}
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleOnClick}>play again</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Stats

import React, { useEffect, useContext, useState } from 'react'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faCoffee,
  faBookDead,
  faBomb,
  faCat,
  faMeh,
  faCrow,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import { ModalContext } from '../../context'
import styles from './Header.module.css';

export function Header() {
  const icons = [faCoffee, faBomb, faBookDead, faCat, faMeh, faCrow]
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    setIcon(icons[Math.floor(Math.random() * icons.length)])
  }, [])

  const {
    setContent: setModalContent,
    openModal,
    closeModal,
  } = useContext(ModalContext)

  async function handleModalClick() {
    const {About} = await import('../about');
    openModal()
    setModalContent(<About onClose={closeModal} />)
  }

  return (
    <header className={styles.header}>
      <button onClick={handleModalClick} title="about" className={styles.button}>
        <FA icon={faQuestionCircle} />
      </button>
      <span className={styles.title}>
        worfless {icon && <FA icon={icon} />}
      </span>
      <span>
        &nbsp;
      </span>
    </header>
  )
}

export default Header

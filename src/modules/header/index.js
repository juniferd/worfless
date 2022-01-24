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
import { Button } from '../../components'
import { ModalContext } from '../../context'
import styles from './Header.module.css';

export function Header() {
  const icons = [faCoffee, faBomb, faBookDead, faCat, faMeh, faCrow]
  const [loadingModal, setLoadingModal] = useState(false)
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
    setLoadingModal(true)
    const {About} = await import('../about');
    setLoadingModal(false)
    openModal()
    setModalContent(<About onClose={closeModal} />)
  }

  return (
    <header className={styles.header}>
      <Button onClick={handleModalClick} title="about" kind="noBackground" loading={loadingModal}>
        <FA icon={faQuestionCircle} />
      </Button>
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

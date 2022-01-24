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
  faChartBar,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../components'
import { ModalContext } from '../../context'
import styles from './Header.module.css';

export function Header() {
  const icons = [faCoffee, faBomb, faBookDead, faCat, faMeh, faCrow]
  const [loadingAboutModal, setLoadingAboutModal] = useState(false)
  const [loadingStatsModal, setLoadingStatsModal] = useState(false)
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    setIcon(icons[Math.floor(Math.random() * icons.length)])
  }, [])

  const {
    setContent: setModalContent,
    openModal,
    closeModal,
  } = useContext(ModalContext)

  async function handleAboutModalClick() {
    setLoadingAboutModal(true)
    const {About} = await import('../about');
    setLoadingAboutModal(false)
    openModal()
    setModalContent(<About onClose={closeModal} />)
  }

  async function handleStatsModalClick() {
    setLoadingStatsModal(true)
    const {Stats} = await import('../../Stats');
    setLoadingStatsModal(false)
    openModal()
    setModalContent(<Stats />)
  }

  return (
    <header className={styles.header}>
      <Button onClick={handleAboutModalClick} title="about" kind="noBackground" loading={loadingAboutModal}>
        <FA icon={faQuestionCircle} />
      </Button>
      <span className={styles.title}>
        worfless {icon && <FA icon={icon} />}
      </span>
      <Button onClick={handleStatsModalClick} title="stats" kind="noBackground" loading={loadingStatsModal}>
        <FA icon={faChartBar} />
      </Button>
    </header>
  )
}

export default Header

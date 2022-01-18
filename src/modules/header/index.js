import React, { useState, useEffect, useContext } from 'react'
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
import { About } from '../about'
import { ModalContext } from '../../context'

export function Header() {
  const icons = [faCoffee, faBomb, faBookDead, faCat, faMeh, faCrow]
  const icon = icons[Math.floor(Math.random() * icons.length)]
  const [headerClass, setHeaderClass] = useState('')
  const {
    setContent: setModalContent,
    openModal,
    closeModal,
  } = useContext(ModalContext)

  useEffect(() => {
    setHeaderClass('color')
  }, [])

  function handleModalClick() {
    openModal()
    setModalContent(<About onClose={closeModal} />)
  }

  return (
    <>
      <button onClick={handleModalClick} className={headerClass} title="about">
        <FA icon={faQuestionCircle} />
      </button>
      <span className={headerClass}>
        worfless <FA icon={icon} />
      </span>
      <span />
    </>
  )
}

export default Header

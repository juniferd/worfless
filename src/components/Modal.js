import PropTypes from 'prop-types'
import React from 'react'
import styles from './Modal.module.css'

function Modal({ onClose, children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>{children}</div>
      <div className={styles.clickWrapper} onClick={onClose}></div>
    </div>
  )
}

// FIXME
Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.any,
}

function ModalHeader({ onClose, children }) {
  return (
    <div className={styles.header}>
      {children}
      <button className={styles.closeButton} onClick={onClose}>&#x2715;</button>
    </div>
  )
}

// FIXME
ModalHeader.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
}

function ModalContent({ children }) {
  return <div className={styles.content}>{children}</div>
}

// FIXME
ModalContent.propTypes = {
  children: PropTypes.any,
}

function ModalFooter({ children }) {
  return <div className={styles.footer}>{children}</div>
}

// FIXME
ModalFooter.propTypes = {
  children: PropTypes.any,
}

Modal.Header = ModalHeader
Modal.Footer = ModalFooter
Modal.Content = ModalContent

export default Modal

import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Empty.module.css'

export default function Empty({ children }) {
  return (
    <div className={styles.empty}>
      {children ? (
        children
      ) : (
        <p>yes hello - find some words why don&apos;t you
          <br />
          <FA icon={faHandPointDown} />
        </p>
      )}
    </div>
  )
}

Empty.propTypes = {
  children: PropTypes.node,
}

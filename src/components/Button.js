import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styles from './Button.module.css'

export default function Button({ onClick, disabled, title, loading, kind, children }) {
  const btnClass = [
    styles.button,
    styles[kind],
    loading && styles.loading,
    (disabled || loading) && styles.disabled,
  ].join(' ')
  return (
    <button onClick={onClick} className={btnClass} title={title} disabled={disabled || loading}>
      {loading ? (
        <div className={styles.spinner}>
          <FA icon={faSpinner} />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'secondary', 'noBackground']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
}

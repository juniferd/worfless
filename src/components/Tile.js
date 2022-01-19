import PropTypes from 'prop-types'
import React from 'react'
import styles from './Tile.module.css'

function TileWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>
}

// FIXME
TileWrapper.propTypes = {
  children: PropTypes.any,
}

function Tile({ id, letter, found, onClick, pressed, disabled }) {
  return (
    <button
      className={[found ? styles.found : '', styles.tile].join(' ')}
      id={id}
      onClick={onClick}
      aria-pressed={pressed ? 'true' : 'false'}
      disabled={disabled}
    >
      {letter}
    </button>
  )
}

// FIXME
Tile.propTypes = {
  id: PropTypes.string,
  letter: PropTypes.string,
  found: PropTypes.bool,
  onClick: PropTypes.func,
  pressed: PropTypes.bool,
  disabled: PropTypes.bool,
}

Tile.Wrapper = TileWrapper;

export default Tile

import PropTypes from 'prop-types';
import React from 'react';
import styles from './Tile.module.css'

export function TileWrapper({children}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )  
}

// FIXME
TileWrapper.propTypes = {
  children: PropTypes.any,
}

function Tile({ id, letter, found }) {
  return (
    <span className={[found ? styles.found : '', styles.tile].join(' ')} id={id}>
      {letter}
    </span>
  )
}

// FIXME
Tile.propTypes = {
  id: PropTypes.string,
  letter: PropTypes.string,
  found: PropTypes.bool,
}

export default Tile

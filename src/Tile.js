import React from 'react';
import styles from './Tile.module.css'

export function TileWrapper({children}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )  
}

TileWrapper.propTypes = {
  children: React.propTypes.any,
}

function Tile({ id, letter, found }) {
  return (
    <span className={[found ? styles.found : '', styles.tile].join(' ')} id={id}>
      {letter}
    </span>
  )
}

Tile.propTypes = {
  id: React.propTypes.string,
  letter: React.propTypes.string,
  found: React.propTypes.bool,
}

export default Tile

import React from 'react';
import styles from './Tile.module.css'

export function TileWrapper({children}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )  
}

function Tile({ id, letter, found }) {
  return (
    <span className={[found ? styles.found : '', styles.tile].join(' ')} id={id}>
      {letter}
    </span>
  )
}

export default Tile

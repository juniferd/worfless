import React from 'react'
import PropTypes from 'prop-types'
import styles from './SVG.module.css'

export default function SVG({ children, fill, stroke, width, height }) {
  const styleObj = {
    width,
    height,
    fill,
    stroke,
  }

  return (
    <svg className={styles.wrapper} style={styleObj}>
      {children}
    </svg>
  )
}

SVG.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
}

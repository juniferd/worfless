import React from 'react'
import PropTypes from 'prop-types'
import { SVG, Modal } from '../../components'
import { ReactComponent as Worf } from './worf.svg'

export function About({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Modal.Header onClose={onClose}>
        <span>about worfless</span>
      </Modal.Header>
      <Modal.Content>
        <h4>what is this?</h4>
        <p>
          worfless is a basic{' '}
          <a href="https://en.wikipedia.org/wiki/Anagrams_(game)">
            anagrams-like game
          </a>{' '}
          using 220 letter tiles
        </p>
        <p>
          pull tiles out of a bag and try to form as many 3+ letter words as
          possible in 60 seconds
        </p>
        <h4>scoring</h4>
        <p>this uses boggle scoring</p>
        <p>3 letters = 1 pt</p>
        <p>4 letters = 1 pt</p>
        <p>5 letters = 2 pts</p>
        <p>6 letters = 3 pts</p>
        <p>7 letters = 5 pts</p>
        <p>8+ letters = 11 pts</p>
        <h4>
          ok that&apos;s nice, but i&apos;d like to speak to the manager, pls
        </h4>
        <p>
          see the <a href="https://github.com/juniferd/worfless">sauce</a>
        </p>
        <h4>what about worf?</h4>
        <p>ma&apos;am, this is a wendy&apos;s. jk here&apos;s a picture of worf</p>
        <SVG height={'150px'} fill={'white'} stroke={'#ff6150'}>
          <Worf />
        </SVG>
      </Modal.Content>
      <Modal.Footer>
        <button onClick={onClose}>close</button>
      </Modal.Footer>
    </Modal>
  )
}

About.propTypes = {
  onClose: PropTypes.func,
}
export default About

import {createShuffledBagOfLetters} from '../helpers'

export default function reducer(state, action) {
  switch (action.type) {
    case 'reset': {
      const newLetters = createShuffledBagOfLetters();
      return [...newLetters]
    }
    case 'pull':
      return state.slice(action.number)
    default:
      return [...state]
  }
}

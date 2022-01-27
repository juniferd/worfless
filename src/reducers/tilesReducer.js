export default function reducer(state, action) {
  switch (action.type) {
    case 'pull': {
      const newState = action.swap ? state.filter(({pressed}) => !pressed) : state.filter(({found}) => !found)
      const nextTiles = action.letters.map((letter, i) => ({id: `${letter}-${i + action.counter}`, letter}))
      return [...newState, ...nextTiles]
    }
    case 'reset':
      return []
    case 'update': {
      return [...action.tiles]
    }
    default:
      return [...state]
  }
}

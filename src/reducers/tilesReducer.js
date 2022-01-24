// TODO uhhh no this doesn't work
export default function reducer(state, action) {
  switch (action.type) {
    case 'pull':
      return [...action.remaining, ...action.next]
    case 'reset':
      return []
    case 'update':
      return [...action.tiles]
    default:
      return [...state]
  }
}

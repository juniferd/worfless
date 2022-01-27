// distribution of letters when playing anagrams
const LETTER_DISTRIBUTION = {
  A: 14,
  B: 6,
  C: 6,
  D: 8,
  E: 20,
  F: 6,
  G: 8,
  H: 10,
  I: 14,
  J: 4,
  K: 4,
  L: 8,
  M: 8,
  N: 12,
  O: 14,
  P: 6,
  Q: 4,
  R: 12,
  S: 12,
  T: 14,
  U: 10,
  V: 4,
  W: 8,
  X: 2,
  Y: 4,
  Z: 2,
}

function createBagOfLetters(letters = LETTER_DISTRIBUTION) {
  const bag = []
  Object.entries(letters).forEach(([letter, num]) => {
    bag.push(...Array(num).fill(letter))
  })
  return bag
}

export function shuffleBag(bag = []) {
  for (let i = 0; i < bag.length; i++) {
    const j = Math.floor(i * Math.random())
    if (j !== i) {
      const first = bag[i]
      const second = bag[j]
      bag[j] = first
      bag[i] = second
    }
  }
  return bag
}

export default function createShuffledBagOfLetters(
  letters = LETTER_DISTRIBUTION
) {
  console.log('create shuffled bag')
  const bag = createBagOfLetters(letters)
  return shuffleBag(bag)
}

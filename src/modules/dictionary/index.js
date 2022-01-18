import str from './prunedWordsStr'

export function createDictionary() {
  const dict = {}
  let prev = ''

  str.split(' ').forEach((prefixWord) => {
    const numStr = prefixWord.match(/\d/g).join('')
    const prefix = `${prev.slice(0, +numStr)}`
    const word = `${prefix}${prefixWord.slice(numStr.length)}`
    dict[word] = 1
    prev = word
  })
  return dict
}

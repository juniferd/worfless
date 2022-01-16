import dict from './prunedDictWords';

export function checkDictionary(word) {
  return word in dict;
}

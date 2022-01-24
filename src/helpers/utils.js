export function findDeletedLetter(one, two) {
  const maxLength = Math.max(one.length, two.length);

  for (let i = 0; i < maxLength; i++) {
    const curr1 = one[i];
    const curr2 = two[i];
    if (curr1 !== curr2) {
      return one.length > two.length ? curr1 : curr2;
    }
  }

  return undefined;
}

export function validateAndGetUpdatedGame(word, gameTiles) {
  // TODO should find a better way than re-writing these found keys all the time
  const updatedGameTiles = [...gameTiles].map(p => ({...p, found: false}));

  for (let i = 0; i < word.length; i++) {
    const currLetter = word[i];
    const index = updatedGameTiles.findIndex(({letter, found}) => {
      return letter === currLetter & !found;
    });
    if (index > -1) {
      updatedGameTiles[index].found = true;
    } else {
      return {valid: {valid: false, message: 'that tile is not available'}, updatedGameTiles};
    }
  }

  return {valid: {valid: true, message: ''}, updatedGameTiles};
}

export const delay = t => new Promise(resolve => setTimeout(resolve, t))

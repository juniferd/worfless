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

export function validateAndGetUpdatedGame(word, gameLetters) {
  // TODO should find a better way than re-writing these found keys all the time
  const updatedGameLetters = [...gameLetters].map(p => ({...p, found: false}));
  let valid = true;

  for (let i = 0; i < word.length; i++) {
    const currLetter = word[i];
    const index = updatedGameLetters.findIndex(({letter, found}) => {
      return letter === currLetter & !found;
    });
    if (index > -1) {
      updatedGameLetters[index].found = true;
    } else {
      return {valid: false, updatedGameLetters};
    }
  }

  return {valid, updatedGameLetters};
}

// The Fisher-Yates algorith
// https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = Array.from(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
};

function cleanItems(items, indicesToRemove) {
    for (let indexIndex = indicesToRemove.length - 1; indexIndex > -1; indexIndex--) {
        items.splice(indicesToRemove[indexIndex], 1);
    }
}
export const calculateColors = (guess, answer) => {
    const colors = [];
    const lettersRemaining = answer.split('').reduce((acc, val) => {
        if (acc[val] != null)
            acc[val] += 1;
        else
            acc[val] = 1;
        return acc;
    }, {});
    const indices = [0, 1, 2, 3, 4];
    const indicesToRemove = [];
    // Greens
    indices.forEach((letterIndex, removalIndex) => {
        const guessLetter = guess[letterIndex];
        if (guessLetter === answer[letterIndex] && lettersRemaining[guessLetter] > 0) {
            colors[letterIndex] = 'g';
            lettersRemaining[guessLetter] -= 1;
            indicesToRemove.push(removalIndex);
        }
    });
    cleanItems(indices, indicesToRemove);
    indicesToRemove.length = 0;
    // Yellows
    indices.forEach((letterIndex, removalIndex) => {
        const guessLetter = guess[letterIndex];
        if (lettersRemaining[guessLetter]) {
            colors[letterIndex] = 'y';
            lettersRemaining[guessLetter] -= 1;
            indicesToRemove.push(removalIndex);
        }
    });
    cleanItems(indices, indicesToRemove);
    indicesToRemove.length = 0;
    // Blacks
    indices.forEach((letterIndex) => {
        colors[letterIndex] = 'b';
    });
    return colors;
};

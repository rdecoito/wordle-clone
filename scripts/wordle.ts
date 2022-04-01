export type Color = 'b' | 'g' | 'y' | undefined;

function cleanItems(items: Array<unknown>, indicesToRemove: Array<number>) {
	for (let indexIndex = indicesToRemove.length - 1; indexIndex > -1; indexIndex--) {
		items.splice(indicesToRemove[indexIndex], 1);
	}
}

export const calculateColors = (guess: string, answer: string) => {
	const colors: Array<'g' | 'y' | 'b' | undefined> = [];
	const lettersRemaining = answer.split('').reduce((acc, val) => {
		if (acc[val] != null) acc[val] += 1;
		else acc[val] = 1;

		return acc;
	}, {} as Record<string, number>);
	const indices: Array<number> = [0, 1, 2, 3, 4];
	const indicesToRemove: Array<number> = [];

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
}

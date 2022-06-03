import { calculateColors } from "./wordle.js";
const CLASS_E = 'block-e';
const CLASS_B = 'block-b';
const CLASS_Y = 'block-y';
const CLASS_G = 'block-g';
const getClass = (color) => color === 'g' ? CLASS_G : color === 'y' ? CLASS_Y : color === 'b' ? CLASS_B : CLASS_E;
export const setGameBoard = (grid) => {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        const wordRow = document.createElement('div');
        wordRow.id = getWordRowId(rowIndex);
        wordRow.classList.add('word-row');
        for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
            const letterDiv = document.createElement('div');
            letterDiv.id = getLetterId(rowIndex, letterIndex);
            letterDiv.classList.add('letter-block');
            letterDiv.classList.add('block-e');
            wordRow.appendChild(letterDiv);
        }
        ;
        grid.appendChild(wordRow);
    }
};
export function getWordRowId(rowIndex) {
    return `word-row-${rowIndex}`;
}
export function getLetterId(rowIndex, letterIndex) {
    return `letter-${rowIndex}-${letterIndex}`;
}
const setWordColors = (wordIndex, colors) => {
    for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
        const letterDiv = document.querySelector('#' + getLetterId(wordIndex, letterIndex));
        if (letterDiv) {
            letterDiv.classList.remove(CLASS_B, CLASS_Y, CLASS_G, CLASS_E);
            const letterColor = colors[letterIndex];
            letterDiv.classList.add(getClass(letterColor));
        }
    }
};
const setWordLetters = (wordIndex, word) => {
    for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
        const letter = letterIndex < word.length ? word[letterIndex] : '';
        const letterDiv = document.querySelector('#' + getLetterId(wordIndex, letterIndex));
        if (letterDiv) {
            letterDiv.innerHTML = letter.toUpperCase();
            letterDiv.style.setProperty('animation-delay', `${}s`);
        }
    }
};
export const setWord = (wordIndex, word, colors) => {
    requestAnimationFrame(() => {
        setWordLetters(wordIndex, word);
        setWordColors(wordIndex, colors);
    });
};
export const commitWord = (wordIndex, word, answer) => {
    const colors = calculateColors(word, answer);
    setWord(wordIndex, word, colors);
};

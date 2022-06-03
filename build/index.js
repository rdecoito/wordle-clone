import { commitWord, setGameBoard, setWord } from './wordleDom.js';
let curWordIndex = 0;
const wordGuesses = Array(6).fill('');
let answer;
const clearGame = () => {
    for (let i = 0; i < 6; i++) {
        setWord(i, '', Array(5).fill(undefined));
    }
    curWordIndex = 0;
    wordGuesses.splice(0, 6, ...Array(6).fill(''));
};
const getNewWord = () => {
    console.log('setting new word');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://random-word-api.herokuapp.com/word?number=1&length=5');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            const words = JSON.parse(xhr.responseText);
            answer = words[0].substring(0, 5);
            if (answer.length < 5)
                answer += 'e'.repeat(5 - answer.length);
        }
        else {
            answer = 'great';
        }
    };
    xhr.onerror = () => {
        answer = 'great';
    };
};
// Setup script
(() => {
    const grid = document.querySelector('#wordle-grid');
    const clearBoardBtn = document.querySelector('#clearBoardBtn');
    const newGameBtn = document.querySelector('#newGameBtn');
    if (!grid || !clearBoardBtn || !newGameBtn) {
        return;
    }
    setGameBoard(grid);
    clearBoardBtn.addEventListener('mousedown', () => {
        clearGame();
        newGameBtn.blur();
    });
    newGameBtn.addEventListener('mousedown', () => {
        getNewWord();
        clearGame();
        newGameBtn.blur();
    });
    getNewWord();
})();
const tryCommitWord = () => {
    if (curWordIndex > 5 || wordGuesses[curWordIndex].length !== 5) {
        return;
    }
    const word = wordGuesses[curWordIndex];
    commitWord(curWordIndex, word, answer);
    curWordIndex++;
};
document.body.addEventListener('keydown', (e) => {
    if (!e.key || e.repeat)
        return;
    if (curWordIndex > 5)
        return;
    if (e.key === 'Enter') {
        tryCommitWord();
    }
    else if (e.key === 'Backspace') {
        const word = wordGuesses[curWordIndex];
        wordGuesses[curWordIndex] = word.substring(0, word.length - 1);
        setWord(curWordIndex, wordGuesses[curWordIndex], Array(5).fill(undefined));
    }
    else if (curWordIndex < 6
        && wordGuesses[curWordIndex].length < 5
        && e.key.length === 1
        && ((e.key >= 'A' && e.key <= 'Z')
            || (e.key >= 'a' && e.key <= 'z'))) {
        wordGuesses[curWordIndex] += e.key.toLowerCase();
        setWord(curWordIndex, wordGuesses[curWordIndex], Array(5).fill(undefined));
    }
});

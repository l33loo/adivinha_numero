"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let points = 20;
    let numberToGuess = generateNumberToGuess();
    console.log(numberToGuess);

    const pointsDisplay = document.getElementById('points');
    pointsDisplay.innerHTML = points;
    const input = document.getElementById('guess');
    input.value = '';
    input.focus();
    const playButton = document.getElementById('play');
    const resetButton = document.getElementById('reset');
    const numberDisplay = document.getElementById('number');
    const inputWrapper = document.getElementById('input-wrap');
    const messageElement = document.getElementById('message');
    resetMessage();

    playButton.addEventListener('click', (e) => play(e));
    playButton.addEventListener('touchend', (e) => play(e));
    playButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            play(e);
        }
    });
    input.addEventListener('keydown', (e) => {
        if (!e.currentTarget.disabled && e.key === 'Enter') {
            play(e);
        }
    });

    resetButton.addEventListener('click', (e) => resetGame(e));
    resetButton.addEventListener('touchend', (e) => resetGame(e));
    resetButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            resetGame(e);
        }
    });

    function play(e) {
        e.preventDefault();
        resetMessage();
        console.log("click!");
        const guess = input.value;
        const guessToNumber = Number(guess);

         // Win
         if (guessToNumber === numberToGuess) {
            endGame(true);
            return;
        }

        // Invalid guess
        if (!Number.isInteger(guessToNumber) || guessToNumber < 1 || guessToNumber > 20) {
            displayMessage("error: wrong value. Must be an integer between 1 and 20", 'invalid');
            input.focus();
            return;
        }
        
        // Valid but wrong guess
        points--;
        pointsDisplay.innerHTML = points;
        input.focus();
        const message = (guessToNumber < numberToGuess) ? 'number is higher': 'number is lower';
        displayMessage(message, 'wrong');

        // Game over
        if (points === 0) {
            endGame(false);
        }
    }

    function endGame(isWin) {
        const className = isWin ? 'won' : 'lost';
        const message = isWin ? 'WIN!' : 'game over :(';
        displayMessage(message, className);
     
        console.log(message);
        playButton.disabled = true;
        input.disabled = true;
        numberDisplay.innerHTML = numberToGuess;
        resetButton.focus();
    }

    function resetGame(e) {
        e.preventDefault();
        resetMessage();
        points = 20;
        pointsDisplay.innerHTML = points;
        numberToGuess = generateNumberToGuess();
        console.log(numberToGuess);
    
        input.value = '';
        input.disabled = false;
        input.focus();
        playButton.disabled = false;
        numberDisplay.innerHTML = '?';
    }

    function resetMessage() {
        displayMessage('Adivinha um número entre 1 e 20', 'instructions');
    }

    // TODO: fix all messages
    function displayMessage(message, className) {
        messageElement.innerHTML = message;
        messageElement.className = className;
    }
});

// Gera um número inteiro entre 1 e 20, inclusivo
const generateNumberToGuess = () => {
    return Math.ceil(Math.random() * 20);
};
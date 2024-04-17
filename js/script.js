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
        
        // Win
        // Usamos o '==' porque o palpite é uma string
        if (guess == numberToGuess) {
            endGame(true);
            return;
        }
        
        // Valid but wrong guess
        if (guess >= 1 && guess <= 20) {
            points--;
            pointsDisplay.innerHTML = points;
            input.focus();
            const message = (guess < numberToGuess) ? 'number is higher': 'number is lower';
            displayMessage(message, 'wrong');

            // Game over
            if (points === 0) {
                endGame(false);
            }

            console.log(message);
            return;
        }

        // Invalid guess
        displayMessage("error: wrong value. Must be between 1 and 20", 'invalid');
        input.focus();
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

    function displayMessage(message, className) {
        messageElement.innerHTML = message;
        messageElement.className = className;
    }
});

const generateNumberToGuess = () => {
    let numberToGuess = Math.round(Math.random() * 20);
    if (numberToGuess === 0) {
        numberToGuess++;
    }

    return numberToGuess;
};
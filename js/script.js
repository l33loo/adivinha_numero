document.addEventListener("DOMContentLoaded", () => {
    let points = 20;
    let numberToGuess = generateNumberToGuess();
    console.log(numberToGuess);

    const input = document.getElementById('guess');
    input.value = '';
    input.focus();
    const playButton = document.getElementById('play');
    const resetButton = document.getElementById('reset');
    const numberDisplay = document.getElementById('number');
    const pointsDisplay = document.getElementById('points');

    playButton.addEventListener('click', (e) => play(e));
    playButton.addEventListener('touchend', (e) => play(e));
    playButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            play(e);
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
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
        console.log("click!");
        const guess = input.value;

        // Game over
        // TODO: continues once more when hitting 0 - to fix
        if (points <= 0) {
            endGame(false);
            return;
        }
        
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
            let message = '';

            if (guess < numberToGuess) {
                message = 'number is higher';
            }

            if (guess > numberToGuess) {
                message = 'number is lower';
            }

            console.log(message);
            return;
        }

        // Invalid guess
        // TODO: Add error message
        console.log("error: wrong value. Must be between 1 and 20");
        input.focus();
    }

    function endGame(isWin) {
        // TODO: get msg to display
        let message = '';
        if (isWin) {
            message = 'WIN!';
        }
        if (!isWin) {
            message = 'game over :(';
        }
     
        console.log(message);
        playButton.disabled = true;
        input.disabled = true;
        numberDisplay.innerHTML = numberToGuess;
        resetButton.focus();
    }

    function resetGame(e) {
        e.preventDefault();
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
});

const generateNumberToGuess = () => {
    let numberToGuess = Math.round(Math.random() * 20);
    if (numberToGuess === 0) {
        numberToGuess++;
    }

    return numberToGuess;
};
document.addEventListener("DOMContentLoaded", () => {
    // TODO: display points
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
    // TODO: Implement keyboard and touchend events too
    playButton.addEventListener('click', play);
    playButton.addEventListener('touchend', play);
    playButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            play();
        }
    });

    resetButton.addEventListener('click', resetGame);
    resetButton.addEventListener('touchend', resetGame);
    resetButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            resetGame();
        }
    });

    const play = () => {
        console.log("click!");
        const guess = input.value;

        // Game over
        if (points <= 0) {
            // TODO: msg that player lost the game
            // TODO: disable play button
            console.log("game over :(");

        // Win
        // Usamos o '==' porque o palpite é uma string
        } else if (guess == numberToGuess) {
            console.log(typeof guess);
            // TODO: win!
            // TODO: disable input
            console.log("WIN!");
            playButton.disabled = true;
            input.disabled = true;
            numberDisplay.innerHTML = numberToGuess;
            resetButton.focus();

        // Valid but wrong guess
        } else if (guess >= 1 && guess <= 20) {
            points--;
            pointsDisplay.innerHTML = points;
            input.focus();
            let message = 'number is lower';

            if (guess < numberToGuess) {
                message = 'number is higher';
            }

            // if (guess > numberToGuess) {
            //     // TODO: display message that number is lower
            //     // TODO: display points
            //     console.log("number is lower");
            // } else if (guess < numberToGuess) {
            //     // TODO: Display msg that number is higher
            //     // TODO: display points
            //     console.log('number is higher');
            // }

            // TODO: get message to display

        // Invalid guess
        } else {
            // TODO: Add error message
            console.log("error: wrong value. Must be between 1 and 20");
            input.focus();
        }
    };

    const resetGame = () => {
        points = 20;
        pointsDisplay.innerHTML = points;
        numberToGuess = generateNumberToGuess();
        console.log(numberToGuess);
    
        input.value = '';
        input.disabled = false;
        input.focus();
        playButton.disabled = false;
        numberDisplay.innerHTML = '?';
    };
});

const generateNumberToGuess = () => {
    let numberToGuess = Math.round(Math.random() * 20);
    if (numberToGuess === 0) {
        numberToGuess++;
    }

    return numberToGuess;
};
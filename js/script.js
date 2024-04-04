document.addEventListener("DOMContentLoaded", () => {
    // TODO: display points
    let points = 20;
    let numberToGuess = generateNumberToGuess();
    console.log(numberToGuess);

    const input = document.getElementById('guess');
    input.value = '';
    input.focus();
    const playButton = document.getElementById('play');
    const numberDisplay = document.getElementById('number');
    const pointsDisplay = document.getElementById('points');
    // TODO: Implement keyboard and touchend events too
    playButton.addEventListener('click', () => {
        console.log("click!");
        const guess = input.value;

        if (points <= 0) {
            // TODO: msg that player lost the game
            // TODO: disable play button
            console.log("game over :(");
        } else if (guess >= 1 && guess <= 20) {
            if (guess == numberToGuess) {
                // TODO: win!
                // TODO: disable input
                console.log("WIN!");
                playButton.disabled = true;
                input.disabled = true;
                numberDisplay.innerHTML = numberToGuess;
            } else {
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
            }
        } else {
            // TODO: Add error message
            console.log("error: wrong value. Must be between 1 and 20");
            input.focus();
        }
    });
    // TODO: reset button
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        points = 20;
        numberToGuess = generateNumberToGuess();
        console.log(numberToGuess);

        input.value = '';

        playButton.disabled = false;
        input.focus();
        numberDisplay.innerHTML = '?';
    });
});

const generateNumberToGuess = () => {
    let numberToGuess = Math.round(Math.random() * 20);
    if (numberToGuess === 0) {
        numberToGuess++;
    }

    return numberToGuess;
};
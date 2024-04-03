document.addEventListener("DOMContentLoaded", () => {
    let points = 20;
    let numberToGuess = generateNumberToGuess();
    console.log(numberToGuess);

    const input = document.getElementById('guess');
    input.value = '';
    input.focus();
    const playButton = document.getElementById('play');
    const numberDisplay = document.getElementById('number');
    // TODO: Implement keyboard and touchend events too
    playButton.addEventListener('click', () => {
        console.log("click!");
        const guess = input.value;

        if (points <= 0) {
            // TODO: msg that player lost the game
            // disable play button
            console.log("game over :(");
        } else if (points > 0) {
            if (guess >= 1 && guess <= 20) {
                if (guess == numberToGuess) {
                    // TODO: win!
                    // disable input
                    console.log("WIN!");
                    playButton.disabled = true;
                    numberDisplay.innerHTML = numberToGuess;
                } else if (guess > numberToGuess) {
                    points--;
                    input.focus();
                    // TODO: display message that number is lower
                    console.log("number is lower");
                } else if (guess < numberToGuess) {
                    points--;
                    input.focus();
                    // TODO: Display msg that number is higher
                    console.log('number is higher');
                }
            } else {
                // TODO: Add error message
                console.log("error: wrong value. Must be between 1 and 20");
                input.focus();
            }
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
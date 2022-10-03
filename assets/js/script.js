const cards = document.querySelectorAll('.memory-card');
/* Access the modal*/
const modal = document.getElementById("modal");

/* Access the play again button */
const playAgain = document.querySelector(".play-again-btn");

/* declare the variable for the number of moves */

let moves = 0;
let counter = document.querySelector('.moves');

let pairs = 0;


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/*  Card Flip */
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        /* First Click 
        * Checks if it is the first click and sets hasFlippedCard to true and sets first card to 'this' 
        */
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    /* second click */
    secondCard = this;

    checkForMatch();
    updateScoreCounter();

    if (pairs === 6) {
       displayModal();       
    }
}

/* check if the cards match */
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    /* Check if the cards match
    * if the cards match, disable them
    * if the don't match unflip them 
    */
    if (isMatch) {
        disableCards();
        pairs++;

    } else {
        unflipCards();
    }
}

/* The cards match 
* remove event listen to prevent them being clicked again
*/
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    /* The cards are a match: 
    * Play 'correct' sound.
    */
    let correct = new Audio("assets/audio/correct.mp3");
    correct.play();
    resetBoard();
}

/* The cards are not a match 
* Unflips cards if they don't match, time delay to allow user to view
*/
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        /* The cards are not a match: 
        * Play 'wrong' sound.
        */
        let wrong = new Audio("assets/audio/wrong.mp3");
        wrong.play();
        resetBoard();
    }, 1500);
}

/* The cards are not a match
* reset the board after each round of 2 clicks
*/
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/* Shuffle Cards
* Generate and assign a random number
*/
(function shuffle() {
    cards.forEach(card => {
       let randomPos = Math.floor(Math.random() *12);
       card.style.order = randomPos; 
    });
})();

/* Add click event listener */
cards.forEach(card => card.addEventListener('click', flipCard));

/* Function for counting moves */
function updateScoreCounter() {
    moves++;
    counter.innerHTML = moves;
}

/* Function that displays the modal when the game is complete */
function displayModal() {
    const modalClose = document.getElementById("btnPlayAgain");
    const feedback = document.getElementById("feedback");

    feedback.innerHTML = "You completed the game in " + moves + " moves!";

    /* display block when game is won */
        modal.style.display="block";
    /* Close the modal when the user clicks button */
    modalClose.onclick = function() {
        modal.style.display = "none";
    };
    /* Close the modal when the user clicks anywhere outside it */
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/* Check if the game is complete with 6 matching pairs */
function winGame() {
    if (pairs === 6) {
        displayModal();
    }
}

/* Event listener to listen for a click on the play again button
* call resetEverything() when clicked */
playAgain.addEventListener('click',function() {
    modal.style.display = "none";
    location.reload();
});  
const cards = document.querySelectorAll('.memory-card');

/* declare the variable for the number of moves */

let moves = 0;
let counter = document.querySelector('.moves');

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
const cards = document.querySelectorAll('.memory-card');

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
* time delay to allow user to view
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
* remove event listen to prevent them being clicked again
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

cards.forEach(card => card.addEventListener('click', flipCard));
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        //second click
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();        
    }
}

function checkForMatch() {
    //check cards match
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        
    } else {
       unflipCards();
    }
}

function disableCards() {
    //cards match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
     //not a match
     setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1500);
}

cards.forEach(card => card.addEventListener('click', flipCard));
const gameBoard = document.getElementById('gameBoard');
let cardsArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', // Card values
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'  // Duplicate for matching pairs
];
let flippedCards = [];
let matchedCards = [];

// Shuffle function to randomize the cards
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create card elements on the game board
function createCards() {
  shuffleArray(cardsArray); // Shuffle cards before displaying

  cardsArray.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-id', index);
    cardElement.innerHTML = `
      <div class="card-content">${card}</div>
    `;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Flip card logic
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    // Check if two cards have been flipped
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Check if the two flipped cards match
function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  const firstCardContent = firstCard.querySelector('.card-content').textContent;
  const secondCardContent = secondCard.querySelector('.card-content').textContent;

  if (firstCardContent === secondCardContent) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards.push(firstCard, secondCard);
    flippedCards = []; // Reset flipped cards
    if (matchedCards.length === cardsArray.length) {
      alert('Congratulations, You Win!');
    }
  } else {
    // If they don’t match, flip them back after a short delay
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Initialize the game
createCards();


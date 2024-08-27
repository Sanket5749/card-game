const cards = [
  "1",
  "1",
  "2",
  "2",
  "3",
  "3",
  "4",
  "4",
  "5",
  "5",
  "6",
  "6",
  "7",
  "7",
  "8",
  "8",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const gameBoard = document.getElementById("gameBoard");
  shuffle(cards);
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.value = card;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.textContent = "";
    secondCard.textContent = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();

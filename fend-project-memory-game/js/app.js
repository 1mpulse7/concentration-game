
// variable used in card creation

const deckList = ['fa-anchor', 'fa-diamond', 'fa-plane', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-anchor', 'fa-diamond', 'fa-plane', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

// variable used for win message

const modal = document.querySelector('.modal');

// close button for win message

const close = document.querySelector('.close-button');

const moveDisplay = document.querySelector('.moves');

const stars = document.querySelector('.stars');

const modalStars = document.querySelector('.modal-stars')

const timerDisplay = document.querySelector('.timer-display');

const totalTime = document.querySelector('.total-time');

let openCards = [];

let matches = 0;

let moves = 0;

// buildDeck function is called before card list is defined becase the cards are created dynamically

buildDeck();

// made with mike wales tutorial

const cardList = document.querySelectorAll('.card');

cardList.forEach(function(card){
  card.addEventListener('click', function(evt){
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && matches.length != deckList.length && openCards.length < 2) {
      moveCounter();
      if (moves == 1) {
        startTimer();
      }
      starDisplay();

      openCards.push(card);
      card.classList.add('open', 'show');
      let firstCard = openCards[0].dataset.card;
      let secondCard = openCards[1].dataset.card;

      if (openCards.length == 2 && firstCard != secondCard) {
        setTimeout(function(){
          openCards.forEach(function(card) {
            card.classList.remove('open', 'show');
          });
          openCards = [];
        }, 1000);
      } else if (openCards.length == 2 && firstCard == secondCard) {
        openCards.forEach(function(card) {
          card.classList.remove('open', 'show');
          card.classList.add('match');
        });
        matches += 2;
        openCards = [];
        if (matches == deckList.length) {
          stopTimer();
          modal.style.display = "block";
        }
      }
    }
  });
});

// event listener to rehide the modal
close.addEventListener('click', function(){
  modal.style.display = "none";
  refresh();
});

// template function used to create cards HTML, created with help from Mike Wales tutorial video.
function createCards(card) {
  return `<li class="card col-s-3" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

// shuffle funtion provided by Udacity for the project
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};


// function to build the game's deck
function buildDeck() {
  const deck = document.querySelector('.deck');
  let cardHTML = shuffle(deckList).map(function(card) {
    return createCards(card);
  });
  deck.innerHTML = cardHTML.join('');
};

// restart game
function refresh() {
  location.reload();
};


//moves counter

function moveCounter() {
  moves++;
  let realMoves = (moves / 2);
  if (realMoves % 1 == 0) {
    moveDisplay.innerText = realMoves;
  };
};

// star moves dislpay

function userStarDisplay() {
  if (moves == 20) {
    stars.children[0].style.display = "none";
  } else if (moves == 32) {
    stars.children[1].style.display = "none";
  } else if (moves == 40) {
    stars.children[2].style.display = "none";
  };
};

//modal star moves display

function modalStarDisplay() {
  if (moves == 20) {
    modalStars.children[0].style.display = "none";
  } else if (moves == 32) {
    modalStars.children[1].style.display = "none";
  } else if (moves == 40) {
    modalStars.children[2].style.display = "none";
  };
};

//function to bring them together

function starDisplay() {
  userStarDisplay();
  modalStarDisplay();
};

// stop watch code

let minutes = 0;

let seconds = 0;

let timer;

let finalTime;

function startTimer() {
  timer = setInterval(insertTime, 1000);
};

function insertTime() {
  seconds++;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  };

  if (seconds >= 60) {

    minutes++;

    seconds = "00";
  };
  timerDisplay.innerText = "0" + minutes + ":" + seconds;
  totalTime.innerText = minutes + ":" + seconds;
};


function stopTimer() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
};

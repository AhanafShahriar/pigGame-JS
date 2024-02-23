'use strict';

const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

let currentScore, activePlayer, scores, playing;

function init() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('.player--active');
}
init();

function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer == 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document.querySelector('.dice').classList.add('hidden');
}

rollBtn.addEventListener('click', function () {
  if (playing) {
    const diceVal = Math.trunc(Math.random() * 6 + 1);
    console.log(diceVal);
    document.querySelector('.dice').src = `dice-${diceVal}.png`;
    document.querySelector('.dice').classList.remove('hidden');
    if (diceVal !== 1) {
      currentScore += diceVal;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);

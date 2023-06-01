const card = document.querySelectorAll('.cell');
const front = document.querySelectorAll('.front');
const container = document.querySelector('.container');
const score = document.querySelector('.score span');
const themeInput = document.querySelector('.theme-input');
const modal = document.getElementById('modal');

let timerInterval;
let elapsedTime = 0;

themeInput.addEventListener('change', () => {
  document.documentElement.classList.toggle('light');
});

suffleImage();
clicking();

setTimeout(() => {
  startTimer();
}, 2000);

function suffleImage() {
  card.forEach((c) => {
    const num = [...Array(card.length).keys()];
    const random = Math.floor(Math.random() * card.length);

    c.style.order = num[random];
  });
}

function clicking() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add('show');

    setInterval(() => {
      front[i].classList.remove('show');
    }, 2000);

    card[i].addEventListener('click', () => {
      front[i].classList.add('flip');
      const filppedCard = document.querySelectorAll('.flip');

      if (filppedCard.length == 2) {
        container.style.pointerEvents = 'none';

        setInterval(() => {
          container.style.pointerEvents = 'all';
        }, 1000);

        match(filppedCard[0], filppedCard[1]);
      }
    });
  }
}

function match(cardOne, cardTwo) {
  if (cardOne.dataset.index == cardTwo.dataset.index) {
    score.innerHTML = parseInt(score.innerHTML) + 1;

    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');

    cardOne.classList.add('match');
    cardTwo.classList.add('match');
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
    }, 1000);
  }

  if (parseInt(score.innerHTML) == 6) {
    stopTimer();
    modal.classList.replace('hide-modal', 'show-modal');
    const restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function updateTimer() {
  elapsedTime++;
  let timerElement = document.getElementById('timer');
  timerElement.textContent = formatTime(elapsedTime);
}

function startTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

const game = document.querySelector('.game');
const smile = document.querySelector('.smile');
const score = game.querySelector('.score');
const pooTemplate = document.querySelector('#poo').content;

const jumpSelector = 'smile_action_jump';
const rotateSelector = 'smile_action_rotating';

let timer = 0;


// Функция, возвращающая рандомное число в промежутке от min до max
function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

// Функция, реализующая прыжок смайлика
function handleJump() {
  smile.classList.remove(rotateSelector);
  smile.classList.add(jumpSelector);
}

// Функция, реализующая приземление
function endJump() {
  smile.classList.remove(jumpSelector);
  smile.classList.add(rotateSelector);
}

// Функция создания какашки
function addPoo() {
  
  const randTime = getRandomTime(0.3, 3);

  setTimeout(() => {
    const poo = pooTemplate.querySelector('.poo').cloneNode(true);
    game.prepend(poo);
    const timePoo = Number( getComputedStyle(poo).animation.match(/\d\D?\d*s/)[0].slice(0,-1) );

    setTimeout(() => {
      poo.remove();
    }, timePoo*1e+3 );
  }, randTime*1e+3);
}

// Функция, определяющая GAME OVER
function gameOver() {
  const bottomSmile = Number( getComputedStyle(smile).bottom.slice(0,-2) );
  const allPoo = game.querySelectorAll('.poo');

  allPoo.forEach((poo) => {

    const rightPoo = Number( getComputedStyle(poo).right.slice(0,-2) );

    if( rightPoo >= 460 && rightPoo <= 505 && bottomSmile <= 45 ) {
        if(!alert('GAME OVER!')){window.location.reload();}
    }
  });
}

// Слушатель для прыжка смайлика
document.addEventListener('keydown', (e) => {

  if( !smile.classList.contains(jumpSelector) ) {
    handleJump();
    const timeJump = Number( getComputedStyle(smile).animation.match(/\d\D?\d*s/)[0].slice(0,-1) );

    setTimeout(() => {
      endJump();
    }, timeJump*1e+3 );
  }
});

// Делаем запросы на "ВИКТОР, ВЫ ЕЩЕ ЖИВЫ?" и на покакать
setInterval(() => {
  gameOver();
  
  if( timer % 350 === 0 ) {
    addPoo();
  };
  
  timer += 1;
  score.textContent = Math.floor(142.5*timer*1e-2) + ' m';
}, 10);

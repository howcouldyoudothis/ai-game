// script.js

const gameContainer = document.getElementById('gameContainer');
const dinosaur = document.getElementById('dinosaur');
const gameWidth = gameContainer.offsetWidth;
const gameHeight = gameContainer.offsetHeight;
const dinoWidth = dinosaur.offsetWidth;
let dinoPosition = gameWidth / 2 - dinoWidth / 2;
const speed = 20; // Movement speed in pixels
let isGameOver = false;

// Handle Keyboard Input
document.addEventListener('keydown', moveDinosaur);

function moveDinosaur(e) {
    if (isGameOver) return;

    if (e.key === 'ArrowLeft') {
        dinoPosition -= speed;
        if (dinoPosition < 0) dinoPosition = 0;
    } else if (e.key === 'ArrowRight') {
        dinoPosition += speed;
        if (dinoPosition > gameWidth - dinoWidth) dinoPosition = gameWidth - dinoWidth;
    }

    dinosaur.style.left = dinoPosition + 'px';
}

// Generate Meteors at Intervals
setInterval(createMeteor, 1000);

function createMeteor() {
    const meteor = document.createElement('img');
    meteor.src = 'https://www.pngplay.com/wp-content/uploads/4/Meteor-Transparent-Images.png';
    meteor.classList.add('meteor');

    // Random horizontal position
    const meteorWidth = 50; // As defined in CSS
    const maxLeft = gameWidth - meteorWidth;
    const randomLeft = Math.floor(Math.random() * maxLeft);
    meteor.style.left = randomLeft + 'px';

    gameContainer.appendChild(meteor);

    // Remove meteor after it falls
    meteor.addEventListener('animationend', () => {
        meteor.remove();
    });

    // Collision Detection
    meteor.addEventListener('animationiteration', () => {
        checkCollision(meteor);
    });
}

function checkCollision(meteor) {
    const meteorRect = meteor.getBoundingClientRect();
    const dinoRect = dinosaur.getBoundingClientRect();

    if (
        meteorRect.bottom >= dinoRect.top &&
        meteorRect.left < dinoRect.right &&
        meteorRect.right > dinoRect.left
    ) {
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    alert('Game Over!');
    // Reload the game
    window.location.reload();
}

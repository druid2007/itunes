import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

console.log(playerBtn);
console.log(playerBlock);

function deactivationPlayer() {
    temp.style.display = 'none';
    playerBtn.forEach((btn, i) => {
        btn.classList.remove('active');
        playerBlock[i].classList.remove('active');
    });
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', event => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
}));

radioPlayerInit();
videoPlayerInit();
musicPlayerInit();
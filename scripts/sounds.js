'use strict'

function clickSound() {
    var audio = new Audio('sounds/click.wav');
    audio.play();
}

function winSound() {
    var audio = new Audio('sounds/gameWin.wav');
    audio.play();
}

function loostSound() {
    var audio = new Audio('sounds/gameOver.wav');
    audio.play();
}

function bombSound() {
    var audio = new Audio('sounds/bomb2.wav');
    audio.play();
}

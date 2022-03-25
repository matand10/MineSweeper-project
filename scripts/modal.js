'use strict'


// Model
var gElButton = document.querySelector('.reset-Btn');
var gBoard;
var gSavedScore =
{
    easy: localStorage.getItem('easyScore'),
    medium: localStorage.getItem('mediumScore'),
    hard: localStorage.getItem('hardScore')
}




function buildBoard() {
    var SIZE = gLevel.SIZE;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }
    return board;
}



function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            var value = ' ';
            var cellContent = currCell.minesAroundCount;
            if (cellContent === null) value = BOMB;
            if (cellContent > 0) value = cellContent;
            strHTML += `\t<td class="cell cell-${i}-${j}
            hidden" onclick="cellClick(this, ${i}, ${j})"
            oncontextmenu="rightClick(this, ${i}, ${j})"
            onmousedown="changeFace()"
            onmouseup="changeFaceBack()">${value}</td>`
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function resetStats() {
    var elTime = document.querySelector('.time');
    var elFlag = document.querySelector('.flag');
    var elLives = document.querySelector('.lives');
    var elSafeClick = document.querySelector('.safe-clicks');
    gFlagsCount = 99;
    gSafeClicks = 3;
    gGame.lives = '❤❤❤';
    gGame.markedCount = 0;
    gGame.shownCount = 0;
    gGame.secsPassed = 0;
    elTime.innerText = 0;
    elFlag.innerText = 99;
    elLives.innerText = gGame.lives;
    elSafeClick.innerText = gSafeClicks;
    gGame.isOn = false;
    gSevenBoomMood = false;
}


function setLevel(num) {
    resetStats();
    gElButton.innerText = '😁';
    if (num === 4) gLevel.MINES = 2;
    if (num === 8) gLevel.MINES = 12;
    if (num === 12) gLevel.MINES = 30;
    gLevel.SIZE = num;
    init();
}

function changeFace() {
    gElButton.innerText = '😋';
}

function changeFaceBack() {
    gElButton.innerText = '😁';
}


function saveScore() {
    if (gLevel.SIZE === 4) {
        if (gGame.secsPassed < parseInt(localStorage.getItem('easyScore')) || !localStorage.length) {
            localStorage.setItem('easyScore', gGame.secsPassed);
        }
    }
    if (gLevel.SIZE === 8) {
        if (gGame.secsPassed < parseInt(localStorage.getItem('mediumScore'))) {
            localStorage.setItem('mediumScore', gGame.secsPassed);
        }
    }
    if (gLevel.SIZE === 12) {
        if (gGame.secsPassed < parseInt(localStorage.getItem('hardScore')))
            localStorage.setItem('hardScore', gGame.secsPassed);
    }
}

function updateHighScore() {
    var elScore = document.querySelector('.score');
    switch (gLevel.SIZE) {
        case 4:
        case localStorage.getItem('easyScore'):
            elScore.innerText = localStorage.getItem('easyScore');
            break;
        case 8:
        case localStorage.getItem('mediumScore'):
            elScore.innerText = localStorage.getItem('mediumScore');
            break;
        case 12:
        case localStorage.getItem('hardScore'):
            elScore.innerText = localStorage.getItem('hardScore');
            break;
    }
}
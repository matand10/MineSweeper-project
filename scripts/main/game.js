'use strict'

const BOMB = '💣';
const FLAG = '📌';
const LIVES = '❤❤❤';


// Model
var gBombsToPlace = 0;
var gRevealedCells = 0;
var gBombsCount;
var gGameIntervalId;
var gSafeClicks = 3;
var gFlagsCount = 99;
var gSevenBoomMood = false;
var gHintMood = false;
var gManuelMood = false;
var gHintCount = 3;

var gLevel =
{
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: LIVES,
    undo: []
}


function init() {
    resetStats();
    updateHighScore();
    clearInterval(gGameIntervalId);
    gBombsCount = gLevel.MINES;
    gBoard = buildBoard();
    if (!gManuelMood) {
        placeRandomMines(gLevel.MINES);
        getMinds();
    }
    renderBoard(gBoard);
}

function setMineNegsCount(cellI, cellJ) {
    var bombNegsCount = countNeighbors(cellI, cellJ, gBoard);
    gBoard[cellI][cellJ].minesAroundCount += bombNegsCount;
    return bombNegsCount;
}


function revealNum(i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.style.backgroundColor = 'grey';
    elCell.classList.add('revealed');
}

function revealBomb(i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.add('bomb');
    elCell.style.backgroundColor = 'red';
}

function gameOn() {
    if (gGame.shownCount === 1) {
        startGameTime()
        gGame.isOn = true;
    }
}

function startGameTime() {
    var elTime = document.querySelector('.time')
    gGameIntervalId = setInterval(() => {
        gGame.secsPassed++
        elTime.innerText = gGame.secsPassed;
    }, 1000)
}


function putFlag(elCell, i, j) {
    if (!gGame.isOn) return
    var elFlag = document.querySelector('.flag');
    var cell = gBoard[i][j];
    if (!cell.isMarked) {
        gGame.markedCount++;
        gFlagsCount--;
        cell.isMarked = true;
        elCell.innerText = FLAG;
        elFlag.innerText = gFlagsCount;
        elCell.classList.add('flag');
    } else {
        gGame.markedCount--;
        gFlagsCount++
        gBoard[i][j].isMarked = false;
        if (cell.isMine) elCell.innerText = BOMB;
        else elCell.innerText = cell.minesAroundCount;
        elFlag.innerText = gFlagsCount;
        elCell.classList.remove('flag');
    }
}

function getEmptyPositions() {
    var positions = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) positions.push({ i, j });
        }
    }
    var randomIdx = getRandomInt(0, positions.length);
    return positions[randomIdx]
}

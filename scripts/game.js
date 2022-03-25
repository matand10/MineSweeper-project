'use strict'

const BOMB = '💣';
const FLAG = '📌';
const LIVES = '❤❤❤';


// Model
var gRevealedCells = 0;
var gBombsCount;
var gGameIntervalId;
var gSafeClicks = 3;
var gFlagsCount = 99;
var gSevenBoomMood = false;
var gHintMood = false;
var gHintCount = 3;
var gLevel =
{
    WINS: 0,
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: LIVES
}


function init() {
    resetStats();
    clearInterval(gGameIntervalId);
    updateHighScore();
    gBoard = buildBoard();
    placeRandomMines(gLevel.MINES);
    getMinds();
    gBombsCount = gLevel.MINES;
    renderBoard(gBoard);
}



function restart() {
    setLevel(gLevel.SIZE);
}


function checkGameOver() {
    if (gGame.lives.length === 0 || gLevel.MINES === 0) {
        gElButton.innerText = '🤯';
        gGame.isOn = false;
        revealAllBombs()
        gameOver()
        return
    } else if (gGame.markedCount === gLevel.MINES &&
        ((gLevel.SIZE ** 2) - gBombsCount) === gGame.shownCount) {
        clearInterval(gGameIntervalId);
        gElButton.innerText = '😎';
        gGame.isOn = false;
        gLevel.WINS++;
        winSound();
        saveScore();
        return
    }
}


function rightClick(elCell, cellI, cellJ) {
    event.preventDefault();
    putFlag(elCell, cellI, cellJ);
    checkGameOver();
}


function setMineNegsCount(cellI, cellJ) {
    var bombNegsCount = countNeighbors(cellI, cellJ, gBoard);
    gBoard[cellI][cellJ].minesAroundCount += bombNegsCount;
    return bombNegsCount;
}



function cellClick(elCell, i, j) {
    var currCell = gBoard[i][j];

    if (currCell.isShown) return;
    if (currCell.isMarked) return;
    if (gHintMood) {
        revealArea(i, j);
        gHintMood = false;
        return
    }
    if (currCell.isMine) {
        revealBomb(i, j);
        decreaseLife();
        checkGameOver();
        return
    }
    currCell.isShown = true;
    gGame.shownCount++
    gameOn();
    if (!gGame.isOn) return

    // console.log('gLevel.SIZE', gLevel.SIZE ** 2)
    // console.log('gBombsCount', gBombsCount)
    // console.log('gGame.shownCount', gGame.shownCount)

    checkGameOver();
    clickSound();
    revealNum(i, j);
    renderCell({ i, j }, currCell.minesAroundCount);
    if (currCell.minesAroundCount > 0) return;
    openRecursiveCells(i, j);
}


function placeRandomMines(length) {
    for (var i = 0; i < length; i++) {
        var emptyCell = getEmptyPositions();
        gBoard[emptyCell.i][emptyCell.j].isMine = true;
        gBoard[emptyCell.i][emptyCell.j].minesAroundCount = null;
    }
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

function revealAllBombs() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {
                var currCell = gBoard[i][j]
                currCell.isShown = true;
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerText = BOMB;
                elCell.style.backgroundColor = 'red';
            }
        }
    }

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

function gameOver() {
    gGame.isOn = false;
    clearInterval(gGameIntervalId);
    loostSound();
}

function putFlag(elCell, i, j) {
    var elFlag = document.querySelector('.flag');
    var cell = gBoard[i][j];
    if (!cell.isMarked) {
        gGame.markedCount++;
        gFlagsCount--;
        cell.isMarked = true;
        elCell.innerText = FLAG;
        elFlag.innerText = gFlagsCount;
        elCell.classList.add('flag');
    }
    // else if (elCell.innerText === ' ') return
    else {
        gGame.markedCount--;
        gFlagsCount++
        gBoard[i][j].isMarked = false;
        elCell.innerText = cell.minesAroundCount;
        elFlag.innerText = gFlagsCount;
        elCell.classList.remove('flag');
    }
}

function decreaseLife() {
    var elLives = document.querySelector('.lives');
    gGame.lives = gGame.lives.substring(0, gGame.lives.length - 1)
    gLevel.MINES--;
    elLives.innerText = gGame.lives;
    bombSound();
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

function safeClick() {
    var elSafeClicks = document.querySelector('.safe-clicks');
    if (gSafeClicks > 0) {
        var emptyCell = getEmptyPositions();
        var elCell = document.querySelector(`.cell-${emptyCell.i}-${emptyCell.j}`);
        elCell.style.backgroundColor = 'white';
        elCell.style.transitionDuration = 200 + 'ms';
        setTimeout(() => {
            elCell.style.backgroundColor = '#525252';
        }, 1000);
    }
    gSafeClicks--;
    if (gSafeClicks > -1) elSafeClicks.innerText = gSafeClicks;
}



function openRecursiveCells(cellI, cellJ) {
    var neighbors = [];
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            var cell = gBoard[i][j]
            var location = { i, j };
            if (cell.isMine) continue;
            revealNum(i, j);
            renderCell(location, cell.minesAroundCount);
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            elCell.classList.add('revealed');
            if (cell.minesAroundCount > -1 && cell.isShown === false) gGame.shownCount++;
            if (cell.minesAroundCount === 0 && cell.isShown === false) neighbors.push(location);
            cell.isShown = true;
        }
    }
    for (var i = 0; i < neighbors.length; i++) {
        var cellObj = neighbors[i];
        var cell = gBoard[cellObj.i][cellObj.j];
        cell.isShown = true;
        openRecursiveCells(cellObj.i, cellObj.j);
        neighbors.shift();
    }
}



function sevenBoomOn() {
    gSevenBoomMood = true;
    clearStage();
}

function sevenBoom() {
    var countCellSeven = 0;
    var countBombs = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gLevel.SIZE === 8 && countCellSeven === 63) break;
            if ((countCellSeven % 7) === 0 && countCellSeven !== 0) {
                gBoard[i][j].isMine = true;
                gBoard[i][j].minesAroundCount = null;
                countBombs++;
            }
            countCellSeven++
        }
    }
    gLevel.MINES = countBombs;
    gBombsCount = countBombs;
    return countBombs;
}


function clearStage() {
    resetStats();
    clearInterval(gGameIntervalId);
    updateHighScore();
    gBoard = buildBoard();
    sevenBoom();
    getMinds();
    gBombsCount = gLevel.MINES;
    renderBoard(gBoard);
}


function allowHint() {
    var elHintBtn = document.querySelector('.bulb');
    gHintMood = true;
    gHintCount--
    elHintBtn.innerText = gHintCount;

}

function revealArea(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            // if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMine) {
                revealBombTemp(i, j);
            };
        }
    }
}

function revealBombTemp(i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.classList.add('revealed');
    setTimeout(() => {
        elCell.classList.remove('revealed');
    }, 1000)
}
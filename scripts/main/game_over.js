'use strict'


function gameOver() {
    gGame.isOn = false;
    clearInterval(gGameIntervalId);
    loostSound();
}


function revealAllBombs() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {
                var currCell = gBoard[i][j]
                currCell.isShown = true;
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.style.fontSize = 20 + 'px';
                elCell.style.backgroundColor = 'red';
            }
            if (!gBoard[i][j].isShown) {
                var elCell = document.querySelector(`.cell-${i}-${j}`);
                elCell.classList.add('revealed');
                elCell.style.backgroundColor = 'grey';
            }
        }
    }

}

function decreaseLife() {
    var elLives = document.querySelector('.lives');
    gGame.lives = gGame.lives.substring(0, gGame.lives.length - 1)
    gLevel.MINES--;
    elLives.innerText = gGame.lives;
    bombSound();
}



function restart() {
    setLevel(gLevel.SIZE);
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
        winSound();
        saveScore();
        return
    }
}
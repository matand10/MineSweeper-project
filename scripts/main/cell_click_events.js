'use strict'

function cellClick(elCell, i, j) {
    var currCell = gBoard[i][j];
    if (currCell.isShown) return;
    if (currCell.isMarked) return;

    if (gManuelMood) {
        manualCreate(i, j);
        return;
    }
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

    checkGameOver();
    clickSound();
    revealNum(i, j);
    renderCell({ i, j }, currCell.minesAroundCount);
    if (currCell.minesAroundCount > 0) return;
    openRecursiveCells(i, j);
}


function rightClick(elCell, cellI, cellJ) {
    event.preventDefault();
    putFlag(elCell, cellI, cellJ);
    checkGameOver();
}
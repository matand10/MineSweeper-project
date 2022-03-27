'use strict'


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

'use strict'

function manualCreateOn() {
    gManuelMood = true;
    init();
}

function manualCreate(cellI, cellJ) {
    var elPlaceBombs = document.querySelector('.manual-msg');
    var elCell = document.querySelector(`.cell-${cellI}-${cellJ}`);
    if (gLevel.MINES > gBombsToPlace) {
        gBoard[cellI][cellJ].isMine = true;
        gBoard[cellI][cellJ].minesAroundCount = null;
        elCell.classList.add('bomb');
        renderCell({ i: cellI, j: cellJ }, gBoard[cellI][cellJ].minesAroundCount);
        gBombsToPlace++;
        elPlaceBombs.innerText = `${gBombsToPlace} / ${gLevel.MINES}`;
    } else {
        removeBombClass();
        getMinds();
        gManuelMood = false;
    }
}


function removeBombClass() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            if (elCell.classList.contains('bomb')) elCell.classList.remove('bomb');
        }
    }
}
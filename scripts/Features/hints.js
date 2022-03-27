'use strict'

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
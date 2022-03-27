'use strict'

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


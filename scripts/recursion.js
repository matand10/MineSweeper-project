'use strict'


// function openRecursiveCells(cellI, cellJ) {
//     var neighbors = [];
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue;
//             if (j < 0 || j >= gBoard[i].length) continue;
//             var cell = gBoard[i][j]
//             var location = {i, j};
//             if (cell.isMine) continue;
//             renderCell(location, cell.minesAroundCount)
//             // cell.isShown = true;
//             if (!cell.isShown) neighbors.push(cell);
//             var elCell = document.querySelector(`.cell-${i}-${j}`);
//             elCell.classList.add('revealed');
//             // revealNum(i, j);
//             // openRecursiveCells(cellI, cellJ);
//             // if (!gBoard[i][j].isMine) {
//             //     return revealNum(i, j);
//             // }
//         }
//     }
//     for (var i = 0; i < neighbors.length; i++) {
//         neighbors[i].isShown = true;
//         openRecursiveCells(neighbors[i].i, neighbors[i].j);
//         neighbors.splice(i, 1);
//     }
// }


// function getMinds() {
// check every cell and find every bomb and insert it into an array
// using for loop on the array, and for each bomb she activate the function getNextCount
//
// }



function getMinds() {
    var bombs = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine) bombs.push({ i, j });
        }
    }
    for (var i = 0; i < bombs.length; i++) {
        var cell = bombs[i];
        getNextCount(cell.i, cell.j)
    }
    return bombs;
}

function getNextCount(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMine) continue;
            gBoard[i][j].minesAroundCount++;
        }
    }
}


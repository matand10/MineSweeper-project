'use strict'


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



// function undo() {
//     if (!gGame.isOn) return;
//     var lastCell = gGame.undo.pop();
//     // if (!lastCell.data.isMine) {
//     //     // lastCell.data.isShowns = false;
//     //     gBoard[lastCell.position.i][lastCell.position.j].isShowns = false;
//     // } else {
//     //     gBoard[lastCell.position.i][lastCell.position.j].isShowns = false;
//     //     // increase lives

//     // }
//     // for (var i = 0; i < gBoard.length; i++) {
//     //     for (var j = 0; j < board[i].length; j++) {
//     //         var currCell = board[i][j];

//     closeRecursionCells(lastCell.position.i, lastCell.position.j)
//     renderBoard(gBoard);
// }
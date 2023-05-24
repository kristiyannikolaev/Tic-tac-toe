const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageTextEl = document.querySelector('[data-winning-message-text]');
const winningMessageEl = document.getElementById('winning-message');
const restartBtn = document.getElementById('restartBtn');
let circleTurn;

startGame();


restartBtn.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(c => {
        c.classList.remove(X_CLASS);
        c.classList.remove(CIRCLE_CLASS);
        c.removeEventListener('click', handleClick);
        c.addEventListener('click', handleClick, { once: true})
    });
    
    setBoardHoverClass();
    winningMessageEl.classList.remove('show');
}

function handleClick(event) {
    //Place Mark
    const cell = event.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass);
    
    //Check for win
    if(checkWin(currentClass)) {
        endGame(false);
        return;
    }
    
    //Check for draw
    if(isDraw()) {
        endGame(true);
        return;
    }
    //Switch turn
    swapTurns();
    setBoardHoverClass();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw() {
    return [...cellElements].every(c => {
        return c.classList.contains(X_CLASS) || c.classList.contains(CIRCLE_CLASS);
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageTextEl.innerText = `Draw!`;
    } else {
        winningMessageTextEl.innerText = `${circleTurn ? 'O\'s' : 'X\'s'} Wins!`;
    }

    winningMessageEl.classList.add('show');
}
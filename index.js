const x = 'x';
const o = 'o';
let circleClass
const winningStreak = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.querySelector('[data-winning-message-text]');
const winMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton')

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {

    circleClass = false;
    cells.forEach(cell => {
        cell.classList.remove(x)
        cell.classList.remove(o)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHovers()
    winMessageElement.classList.remove('show')
}

function handleClick(e) {
    const clickedCell = e.target;
    const currentClass = circleClass ? o : x;

    addMark(clickedCell, currentClass);

    if (checkwin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        changeTurns();
        setBoardHovers();
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(o)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw'
    } else {
        winningMessage.innerText = `${circleClass ? "O's" : "X's"} win!`
    }

    winMessageElement.classList.add('show')
}

function addMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function changeTurns() {
    circleClass = !circleClass
}

function setBoardHovers() {
    board.classList.remove(x);
    board.classList.remove(o);

    if (circleClass) {
        board.classList.add(o)
    } else {
        board.classList.add(x)
    }
}

function checkwin(checkClass) {
    return winningStreak.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(checkClass)
        })
    })
}
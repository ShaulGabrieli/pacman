'use strict'

const WALL = '🍀'
const FOOD = '🍪'
const EMPTY = ' '
const POWER_FOOD = '🍕'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
}

var gBoard
var gCherryInterval

function onInit() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gCherryInterval = setInterval(createCherry, 15000)
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = POWER_FOOD
    board[1][8] = POWER_FOOD
    board[8][1] = POWER_FOOD
    board[8][8] = POWER_FOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    clearInterval(gCherryInterval)
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    const elModal = document.querySelector('.modal')
    elModal.innerHTML = 'You Lost! <button onclick="playAgain()">Play Again</button>'
    elModal.classList.remove('modal-display')
}

function playAgain() {
    clearInterval(gIntervalGhosts)
    const elModal = document.querySelector('.modal')
    elModal.classList.add('modal-display')
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    gGame.isOn = true
    gGhosts = []
    onInit()
}

function victory() {
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    const elModal = document.querySelector('.modal')
    elModal.innerHTML = 'You Won! <button onclick="playAgain()">Play Again</button>'
    elModal.classList.remove('modal-display')
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function createCherry() {
    const emptyCell = findEmptyCell(gBoard)
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
}

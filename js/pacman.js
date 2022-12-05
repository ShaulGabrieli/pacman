'use strict'

const PACMAN = '🐟'
var newPACMAN = '🐟'

var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2,
        },
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else {
            for (var k = 0; k < gGhosts.length; k++) {
                if (gGhosts[k].location.i === nextLocation.i && gGhosts[k].location.j === nextLocation.j) {
                    if(gGhosts[k].currCellContent === FOOD)gGhosts[k].currCellContent = EMPTY
                    gDeathGhosts.push(gGhosts.splice(k, 1)[0])
                }
            }
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        for (var i = 0; i < gGhosts.length; i++) {
            var currGhost = gGhosts[i]
            renderCell(currGhost.location, getGhostHTML(currGhost))
        }
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhosts()
                
        }, 5000)
    }
    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    if (newPACMAN !== PACMAN) {
        renderCell(nextLocation, newPACMAN)
    } else {
        renderCell(nextLocation, PACMAN)
    }

    if (isLeftFood()) victory()
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            newPACMAN = `<div style="transform: rotate(0.25turn)">${PACMAN}</div>`
            nextLocation.i--
            break
        case 'ArrowRight':
            newPACMAN = `<div style="transform: rotate(0.5turn)">${PACMAN}</div>`
            nextLocation.j++
            break
        case 'ArrowDown':
            newPACMAN = `<div style="transform: rotate(-0.25turn)">${PACMAN}</div>`
            nextLocation.i++
            break
        case 'ArrowLeft':
            newPACMAN = `<div >${PACMAN}</div>`
            nextLocation.j--
            break
    }
    return nextLocation
}

function isLeftFood() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) {
                return false
            }
        }
    }
    return true
}

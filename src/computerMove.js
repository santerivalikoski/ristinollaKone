
const getNextTurn = (t) => {
    if (t === 'X') return 'O'
    else return 'X'
}
export const findWinner = (boxes) => {
    // console.log('find winner')
    if (!boxes.includes('')) return 'D'
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i]
        if (boxes[a] !== '' && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
            return boxes[a]
        }
    }
    return null
}

const playerTurn = (board, turn, original) => {

    console.log('playerturn: ', board, turn, original)
    const simuWinner = findWinner(board)
    if (simuWinner) {
        if (simuWinner === original) return -10
        else if (simuWinner === 'D') return 0
        else return 10
    }
    else {
        console.log('playerturn else')
        let tempBoard = board.concat()
        let r = 11
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                let newboard = tempBoard.concat()
                newboard[i] = turn
                const newTurn = computerTurn(newboard, getNextTurn(turn), original)
                if (newTurn < r) r = newTurn
            }
        }
        if(r > 10) console.log('ERROR PLAYERTURN, R YLI 10', r)
        return r
    }
}
export const computerTurn = (board, turn, original) => {
    
    console.log('computerturn: ', board, turn, original)
    const simuWinner = findWinner(board)
    if (simuWinner) {
        if (simuWinner === original) return 10
        else if (simuWinner === 'D') return 0
        else return -10
    }
    else {
        console.log('computerturn else')
        let tempBoard = board.concat()
        let r = -11
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                let newboard = tempBoard.concat()
                newboard[i] = turn
                const newTurn = playerTurn(newboard, getNextTurn(turn), original)
                if (newTurn > r) {
                    r = newTurn
                }
            }
        }
        if(r < -10) console.log('ERROR COMPUTERTURN FUNCTIOSSA, R = -11: ', r)
        return r
    }
}


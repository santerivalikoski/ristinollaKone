
const getNextTurn = (t) => {
    if (t === 'X') return 'O'
    else return 'X'
}
export const findWinner = (squares) => {
  
    // console.log(squares)
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
        if (squares[a] !== '' && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    if (!squares.includes('')) {
        return 'D'
            } 
    return null
}

export const computerTurn = (board, turn, original, totaalipyoritykset) => {
    // if(totaalipyoritykset > 55) {
    //     alert('totaalit ylitty')
    //     return
    // } 
    const simuWinner = findWinner(board)
    if (simuWinner) {
        // console.log('winner löyty: ', simuWinner)
        if (simuWinner === 'O') return 10
        else if (simuWinner === 'D') return 0
        else return -10
    }
    else {
        if(turn === original) {
            // if(totaalipyoritykset < 1) console.log('COMPUTERTURN ORIGINAL')
            let r = -11
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = turn
                    let newTurn = computerTurn(board, getNextTurn(turn), original, totaalipyoritykset+1)
                    board[i] = ''
                    r = Math.max(r, newTurn)
                }
            }
            // if(r < -10) alert('ERROR COMPUTERTURN FUNCTIOSSA, R = -11: ', r)
            return r
        }
        else {
            // if(totaalipyoritykset < 1) console.log('computerturn else')
            let r = 11
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = turn
                    let newTurn = computerTurn(board, getNextTurn(turn), original, totaalipyoritykset+1)
                    board[i] = ''
                    r = Math.min(r, newTurn)
                }
            }
            // if(r < -10) alert('ERROR COMPUTERTURN FUNCTIOSSA, R = -11: ', r)
            return r
        }       
    }
}


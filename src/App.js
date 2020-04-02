import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [turn, setTurn] = useState('X')
  const [boardSize, setBoardSize] = useState(Array(9).fill(''))
  const [winner, setWinner] = useState()

  const changeTurn = () => {
    if (turn === 'X') setTurn('O')
    else setTurn('X')
  }
  const handleClick = (i) => {
    console.log('h', i, 'board: ', boardSize[i])
    if (boardSize[i] === '') {
      console.log('handleClick', i)
      let changedBoard = boardSize.concat()
      changedBoard[i] = turn
      setBoardSize(changedBoard)
      changeTurn()
      setWinner(findWinner(boardSize))
    }
    else return
  }
  const doComputerMove = (sTurn, original) => {
    console.log('COMPUTER MOVE')
    let myMove = -1, myScore = -99
    const nextTurn = sTurn === 'X' ? 'O' : 'X'
    for (let i = 0; i < 9; i++) {
      if (boardSize[i] === '') {
        let newboard = boardSize.concat()
        newboard[i] = sTurn
        const newTurn = computerTurn(newboard, nextTurn, 0)
        if (newTurn > myScore) {
          myScore = newTurn
          myMove = i
        }
      }
    }
    console.log('comp', myMove)
    if(original) handleClick(myMove)
    else console.log('nääh')
  }
  const computerTurn = (simBoard, sTurn, original) => {

    let tempBoard = simBoard
    const simuWinner = findWinner(tempBoard)
    if (simuWinner) {
      if (simuWinner === turn) return 10
      else if (simuWinner === 'D') return 0
      else return -10
    }

    // const nextTurn = sTurn === 'X' ? 'O' : 'X'
    // let plalautus = 0
    // let moveIndex = -1
    // for (let i = 0; i < tempBoard.length; i++) {
    //   if (tempBoard[i] === '') {
    //     let newboard = tempBoard
    //     newboard[i] = sTurn
    //     const newTurn = computerTurn(newboard, nextTurn, 0)
    //     if (newTurn > plalautus) {
    //       plalautus += newTurn
    //       moveIndex = i
    //     }
    //   }
    // }
    console.log('ei löydy')
    return -20
  }
  const findWinner = (boxes) => {
    console.log('find winner')
    if (!boardSize.includes('')) return 'D'
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
  const Square = ({ s, i }) => {
    return (
      <div onClick={() => handleClick(i)} className="square">
        <div className="pylpyra"> {s}</div>
      </div>
    )
  }

  return (
    <>
      <h1>TICTACTOE</h1>
      {winner ? <p>{winner} voitti!</p> : null}
      <div className="board">
        {boardSize.map((s, i) => <Square key={i} s={s} i={i} />)}
      </div>
      <div>      <button onClick={() => doComputerMove(turn, true)}>comp</button>
        <button onClick={() => console.log(boardSize)}>boardi</button>
      </div>
    </>
  );
}

export default App;

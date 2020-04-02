import React, { useState } from 'react';
import './App.css';
import { findWinner, computerTurn } from './computerMove'

const App = () => {

  const [turn, setTurn] = useState('X')
  const [boardSize, setBoardSize] = useState(Array(9).fill(''))
  const [winner, setWinner] = useState()

  const changeTurn = () => {
    if (turn === 'X') setTurn('O')
    else setTurn('X')
  }

  const handleClick = (i) => {
    console.log('HANDLEKLIK ALKU', i, 'board: ', boardSize[i])
    if (boardSize[i] === '' && !winner) {
      console.log('handleClick', i)
      let changedBoard = boardSize.concat()
      changedBoard[i] = turn
      setBoardSize(changedBoard)
      changeTurn()
      console.log('findwinner: ', findWinner(boardSize))
      setWinner(findWinner(changedBoard))
    }
    else return
  }
  const doComputerMove = (board, sTurn, original) => {
    console.log('COMPUTER MOVE')
    let myMove = -1, myScore = -99
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        let newboard = board.concat()
        newboard[i] = sTurn
        const newTurn = computerTurn(newboard, sTurn, original)
        if (newTurn > myScore) {
          myScore = newTurn
          myMove = i
        }
      }
    }
    console.log('comp move: ', myMove)
    handleClick(myMove)
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
      <div>
        <button onClick={() => doComputerMove(boardSize, turn, turn)}>comp</button>
        <button onClick={() => console.log(boardSize)}>boardi</button>
      </div>
    </>
  );
}

export default App;

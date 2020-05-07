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
    // console.log('HANDLEKLIK ALKU', i, 'board: ', boardSize[i])
    if(i<0) alert('ERROR HANDLECLICKISSÄ')
    if (boardSize[i] === '' && !winner) {
      // console.log('handleClick', i)
      let changedBoard = boardSize.concat()
      changedBoard[i] = turn
      setBoardSize(changedBoard)
      setTurn('O')
      // console.log('findwinner: ', findWinner(boardSize))
      setWinner(findWinner(changedBoard))  
      doComputerMove(changedBoard, 'O', 'O')   
    }    
  }
  const computerClick = (i, newboard) => {
    console.log('computerklik',i, newboard)
    if (boardSize[i] === '' && !winner) {
      // console.log('handleClick', i)
      let changedBoard = newboard.concat()
      changedBoard[i] = 'O'
      setBoardSize(changedBoard)
      setTurn('X')
      // console.log('findwinner: ', findWinner(boardSize))
      setWinner(findWinner(changedBoard))
    }
    // else alert('computerklik error')
  }
  const playAgain = () => {
    setBoardSize(Array(9).fill(''))
    setTurn('X')
    setWinner(null)
  }
  const doComputerMove = (board, sTurn, original) => {
    console.log('COMPUTER MOVE turnit: ', sTurn, original, board)
    let myMove
    let myScore = -Infinity
    let newboard = board.concat()
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        newboard[i] = sTurn
        const newScore = computerTurn(newboard, 'X', original, 0)
        console.log('newboard', newboard, newScore)
        // console.log('newscore:', newScore, 'i:', i , 'aiempi myscore ja mymove', myScore, myMove)
        if (newScore > myScore) {
          myScore = newScore
          myMove = i
        }
        newboard[i] = ''
      }
    }
    console.log('comp move: ', myMove)
    computerClick(myMove, newboard)
  }
  const Square = ({ s, i }) => {
    return (
      <div onClick={() => handleClick(i)} className="square">
        <div className="pylpyra"> {s}</div>
      </div>
    )
  }
  const computerStart = () => {
    setTurn('O')
    computerClick(Math.floor(Math.random() * 9), boardSize)
    // doComputerMove(boardSize, 'O', 'O')    
  }
  const Winner = () => {
    if (!winner && boardSize.filter(b => b === '').length === 9) return <button onClick={() => computerStart()}>Computer start</button>
    else if (winner === 'D') return <> <p>Tasapeli!</p><button onClick={() => playAgain()}>Play again!</button></>
  else if (winner === 'X' || winner === 'O') return <> <p>{winner} voitti!</p><button onClick={() => playAgain()}>Play again!</button></>
  else return null
  }
  return (
    <>
      <h1>TICTACTOE</h1>
  <Winner />
      <div className="board">
        {boardSize.map((s, i) => <Square key={i} s={s} i={i} />)}
      </div>
      <div>
        {/* <button onClick={() => doComputerMove(boardSize, turn, turn)}>comp</button>
        <button onClick={() => console.log(boardSize)}>board</button> */}
      </div>
    </>
  );
}

export default App;

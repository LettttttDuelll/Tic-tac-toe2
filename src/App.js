import React, { useState } from 'react';
import './App.css';
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handedClick(i) {
    if (squares[i] || calculateWinner(squares)) { return; }; // Ignore click if square is already filled
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X"; // For simplicity, we are always placing "X" on click.
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // Toggle the turn
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handedClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handedClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handedClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handedClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handedClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handedClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handedClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handedClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handedClick(8)} />
      </div>
    </>
  );
}
function calculateWinner(squares) {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ("X" or "O")
    }
  }
  return null;
}

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
  const [squares, setSquares] = useState(Array(25).fill(null));

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

  const nemBer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  return (
    <>
      <div className="status">{status}</div>
      <div className='board-row'>
        {nemBer.filter(num => num < 5).map((num) => (
          <Square key={num} value={squares[num]} onSquareClick={() => handedClick(num)} />
        ))}
      </div>
      <div className='board-row'>
        {nemBer.filter(num => num > 4 && num < 10).map((num) => (
          <Square key={num} value={squares[num]} onSquareClick={() => handedClick(num)} />
        ))}
      </div>
      <div className='board-row'>
        {nemBer.filter(num => num > 9 && num < 15).map((num) => (
          <Square key={num} value={squares[num]} onSquareClick={() => handedClick(num)} />
        ))}
      </div>
      <div className='board-row'>
        {nemBer.filter(num => num > 14 && num < 20).map((num) => (
          <Square key={num} value={squares[num]} onSquareClick={() => handedClick(num)} />
        ))}
      </div>
      <div className='board-row'>
        {nemBer.filter(num => num > 19 && num < 25).map((num) => (
          <Square key={num} value={squares[num]} onSquareClick={() => handedClick(num)} />
        ))}
      </div>
    </>
  );
}
function calculateWinner(squares) {
  const line = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];
  for (const element of line) {
    const [a, b, c,d,e] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]&&squares[a]===squares[d] && squares[a]===squares[e]) {
      return squares[a]; // Return the winner ("X" or "O")
    }
  }
  return null;
}

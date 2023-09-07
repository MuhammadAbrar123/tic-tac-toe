import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import Reset from "./Reset";
import sound from "./audio.mp3";

const TicTacToe = () => {
  const [result, setResult] = useState("");
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [gameEnded, setGameEnded] = useState(false);
  const [move, setMove] = useState("X");

  const playClickSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  const checkWinDrawAndUpdate = (square) => {
    if (checkWin(square)) {
      setResult(`${move} is the winner!`);
      setBoard(Array(9).fill(""));
      
      playClickSound();
      return true;
    }

    if (checkDraw(square)) {
      setResult("Match Drawn");
      setBoard(Array(9).fill(""));
      playClickSound();
      return true;
    }

    return false;
  };

  function handleClick(n) {
    let square = [...board];

    if (square[n] !== "") {
      alert("Already Clicked");
      return;
    }

    square[n] = move;

    //     if (board.filter(cell => cell !== "").length >= 5) {
    //   if (checkWin(square)) {
    //     setResult(`${move} is the winner!`);
    //     setBoard('');

    //     playClickSound();

    //     setBoard(square);

    //     return;
    //   } else if (checkDraw(square)) {

    //     setResult("Match Drawn");
    //     setBoard('');
    //     playClickSound();
    //     return;
    //   }
    // }

    setBoard(square);

    if (!checkWinDrawAndUpdate(square)) {
      if (move === "X") {
        setMove("O");
      } else {
        setMove("X");
      }
      playClickSound();
    }
    playClickSound();
  }

  const checkDraw = () => {
    const isEveryElementFilled = board.every((element) => element !== "");
    const isNotAWin = !checkWin();

    console.log("isEveryElementFilled:", isEveryElementFilled);
    console.log("isNotAWin:", isNotAWin);

    return isEveryElementFilled && isNotAWin;
  };
  const handleReset = () => {
    setResult("");
    setWinner("");
    setBoard(Array(9).fill(""));
    setMove("X");
    setGameEnded(false);
    playClickSound();
  };

  const checkWin = () => {
    const winnigs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winnigs) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return true;
      }
    }

    return false;
  };

  React.useEffect(() => {
    if (!gameEnded && board.filter((cell) => cell !== "").length >= 5) {
      if (checkWin(board)) {
        setBoard(Array(9).fill(""));
        setResult(`${move==='X'?'O':'X'} is the winner!`);

        playClickSound();
      } else if (checkDraw(board)) {
        console.log("Match Drawn condition met");

        setResult("Match Drawn");
        setBoard(Array(9).fill(""));
        
        playClickSound();
      }
    }
  }, [board, winner, move]);

  return (
    <>
      <h1 className="text-center">Tic Tac Toe</h1>
     {
      winner ?
        <h3 className=" text-center">{result}</h3>:
        <h3 >{result}</h3>

     }
      
      <div className="d-flex justify-content-center mt-3">
        <table className="justify-content-center">
          <tbody>
            <tr>
              <td onClick={() => handleClick(0)}>{board[0]}</td>
              <td onClick={() => handleClick(1)}>{board[1]}</td>
              <td onClick={() => handleClick(2)}>{board[2]}</td>
            </tr>
            <tr>
              <td onClick={() => handleClick(3)}>{board[3]}</td>
              <td onClick={() => handleClick(4)}>{board[4]}</td>
              <td onClick={() => handleClick(5)}>{board[5]}</td>
            </tr>
            <tr>
              <td onClick={() => handleClick(6)}>{board[6]}</td>
              <td onClick={() => handleClick(7)}>{board[7]}</td>
              <td onClick={() => handleClick(8)}>{board[8]}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={handleReset}
          className="btn btn-danger  position-absolute reset fa fa-arrow-rotate-left"
        >
          Restart <Reset />{" "}
        </button>
      </div>
    </>
  );
};

export default TicTacToe;

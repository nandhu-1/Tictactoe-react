import React from "react";
import { useState } from "react";


function Gameboard({onSelectsquare,board}) {
 
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playersymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={()=>onSelectsquare(rowIndex,colIndex)}
                  disabled={playersymbol!==null}
                >
                  {playersymbol}
                </button>
              </li>
            ))}{" "}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default Gameboard;

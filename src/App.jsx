import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
import Log from "./components/Log";
import { render } from "react-dom";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import Gameover from "./components/Gameover";

 const PLAYERS={
  "X":"Player1",
  "O":"Player2"
 }
let initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function Derivedwinner(gameboard,players){
  let winner
  for(const combinations of WINNING_COMBINATIONS){
    const firstsquaresymbol=gameboard[combinations[0].row][combinations[0].col]
    const secondsquaresymbol=gameboard[combinations[1].row][combinations[1].col]
    const thirdsquaresymbol=gameboard[combinations[2].row][combinations[2].col]

    if(firstsquaresymbol && firstsquaresymbol===secondsquaresymbol && firstsquaresymbol===thirdsquaresymbol){
        winner=players[firstsquaresymbol]
        
    }
  }
  return winner
}

function Derivedgameboard(gameturns){
  const gameboard=[...initialGameboard.map(array=>[...array])]
  for(const turn of gameturns){
    const{square,player}=turn
    const{row,col}=square
    gameboard[row][col]=player
    
  }
  return gameboard
}
function Derivedplayer(gameturns){
  let activeplayer = "X";

  if (gameturns.length > 0 && gameturns[0].player === "X") {
    activeplayer = "O";
  }
  return activeplayer
}
function App() {
  const [gameturns, setGameturns] = useState([]);
  const[players,setPlayers]=useState(PLAYERS)
  

  const activeplayer=Derivedplayer(gameturns)
const gameboard=Derivedgameboard(gameturns)
 const winner=Derivedwinner(gameboard,players)
 const hasdraw=gameturns.length===9 && !winner
  const handleselectsquare = (rowIndex, colIndex) => {
    // setActiveplayer((curActiveplayer) => (curActiveplayer === "X" ? "O" : "X"));
    setGameturns((prevturns) => {
     const currentplayer=Derivedplayer(prevturns)

      const updatedplayer = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentplayer,
        },
        ...prevturns,
       ];
      return updatedplayer;
    });
  };
const handlerestart=()=>{
  setGameturns([])
}
const handleplayername=(symbol,newName)=>{
     setPlayers(prevplayers=>{
      return{
        ...prevplayers,
        [symbol]:newName
      }
     })
}
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          
          <Player name={PLAYERS.X} symbol="X" isActive={activeplayer === "X"} changename={handleplayername}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activeplayer === "O"} changename={handleplayername}/>
        </ol>
        {(winner || hasdraw )&&<Gameover winner={winner} onrestart={handlerestart}></Gameover> }
        <Gameboard onSelectsquare={handleselectsquare} board={gameboard} />
      </div>
     
      <Log turns={gameturns}/>
    </main>
  );
}

export default App;

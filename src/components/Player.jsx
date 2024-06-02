import React, { useState } from "react";

function Player({ name, symbol, isActive ,changename}) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing((editing) => !editing);
    if(isEditing){
      changename(symbol,playerName)
    }
  }
  function handleSave(e) {
    setPlayerName(e.target.value);
  }
  let editplayername = <span className="player-name"> {playerName} </span>;
  let btnvalue = "Edit";
  if (isEditing) {
    editplayername = (
      <input type="text" required value={playerName} onChange={handleSave} />
    );
    btnvalue = "Save";
  }
  return (
    <li className= {isActive?'active':undefined}>
     
      <span>
        {editplayername}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{btnvalue}</button>
    </li>
  );
}

export default Player;

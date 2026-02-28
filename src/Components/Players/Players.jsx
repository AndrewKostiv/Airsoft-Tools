import { useState } from "react";
import styles from "/src/Components/Players/Players.module.css";
import SectionCard from "../Utils/SectionCard/SectionCard";

const propertyNameConversions = {
  name: "Name",
  rank: "Rank",
  melee: "Melee",
  kills: "Kills",
  deaths: "Deaths",
  gamesPlayed: "Games Played",
  gamesWon: "Games Won",
  gamesFlaked: "Games Flaked",
  isPresent: "Is Present",
  id: "if you see this, something went wrong",
};

const properties = [
  {
    propertyName: "name",
    displayName: "Name",
    inputType: "text",
  },
  {
    propertyName: "rank",
    displayName: "Rank",
    inputType: "text",
  },
  {
    propertyName: "kills",
    displayName: "Kills",
    inputType: "text",
  },
  {
    propertyName: "deaths",
    displayName: "Deaths",
    inputType: "text",
  },
  {
    propertyName: "gamesPlayed",
    displayName: "Games Played",
    inputType: "text",
  },
  {
    propertyName: "gamesWon",
    displayName: "Games Won",
    inputType: "text",
  },
  {
    propertyName: "gamesFlaked",
    displayName: "Games Flaked",
    inputType: "text",
  },
  {
    propertyName: "isPresent",
    displayName: "Is Present",
    inputType: "checkbox",
  },
];

export function Players({ players, dispatch }) {
  const [activePlayerId, setActivePlayerId] = useState(players[0]?.id ?? null);
  const activePlayer =
    players.find((p) => p.id === activePlayerId) ?? players[0] ?? null;
  return (
    <SectionCard className={styles.Players}>

      <h2>Players</h2>
      <AddPlayer dispatch={dispatch} />
      <div className={styles.PlayerHorizontal}>
        <ul className={styles.PlayerList}>
          {players.map((player) => (
            <Player
              key={player.id}
              player={player}
              dispatch={dispatch}
              setActivePlayerId={setActivePlayerId}
            />
          ))}
        </ul>
        {activePlayer && (
          <UpdatePlayer player={activePlayer} dispatch={dispatch} />
        )}
      </div>
    </SectionCard>

  );
}

export function Player({ player, dispatch, setActivePlayerId }) {
  function handleRemovePlayer(e) {
    e.stopPropagation();
    dispatch({
      type: "removeItem",
      collection: "players",
      payload: player.id,
    });
  }
  function handleSelect() {
    setActivePlayerId(player.id);
  }
  return (
    <li className={styles.Player} onClick={handleSelect}>
      <span>{player.name}</span>
      <button onClick={handleRemovePlayer}>X</button>
    </li>
  );
}

export function UpdatePlayer({ player, dispatch }) {
  return (
    <div>
      <h3>UpdatePlayer</h3>
      <ul className={styles.UpdatePlayerProperties}>
        {properties.map((prop) => (
          <Property
            key={prop.propertyName}
            player={player}
            dispatch={dispatch}
            propertyName={prop.propertyName}
            displayName={prop.displayName}
            inputType={prop.inputType}
          />
        ))}
      </ul>
    </div>
  );
}

export function Property({
  player,
  dispatch,
  propertyName,
  displayName,
  inputType,
}) {
  function handleChange(e) {
    const newValue =
      inputType === "checkbox" ? e.target.checked : e.target.value;
    dispatch({
      type: "updateItem",
      collection: "players",
      payload: {
        id: player.id,
        data: {
          [propertyName]: newValue,
        },
      },
    });
  }

  return (
    <li className={styles.Property}>
      <label htmlFor={propertyName}>{[displayName]}:</label>
      <input
        id={propertyName}
        type={inputType}
        checked={inputType === "checkbox" ? player[propertyName] : undefined}
        value={inputType === "text" ? player[propertyName] : undefined}
        onChange={handleChange}
      />
    </li>
  );
}

export function AddPlayer({ dispatch }) {
  const [playerName, setPlayerName] = useState("");
  function getNewPlayer(name) {
    return {
      name,
      rank: 0,
      melee: 0,
      kills: 0,
      deaths: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesFlaked: 0,
      id: crypto.randomUUID(),
    };
  }

  function handleChange(e) {
    let newName = e.target.value;
    setPlayerName(newName);
  }

  function handleSubmit() {
    if (playerName == "") return;
    dispatch({
      type: "addItem",
      collection: "players",
      payload: getNewPlayer(playerName),
    });
    setPlayerName("");
  }
  return (
    <div>
      <form action={handleSubmit}>
        <input type="text" value={playerName} onChange={handleChange} />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

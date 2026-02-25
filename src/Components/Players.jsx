import { useEffect, useState } from "react";
import styles from "./Players.module.css";

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

export function Players({ players, dispatch }) {
  return (
    <>
      <AddPlayer dispatch={dispatch} />
      <ul className={styles.Players}>
        {players.map((player) => (
          <Player key={player.id} player={player} dispatch={dispatch}></Player>
        ))}
      </ul>
    </>
  );
}

export function AddPlayer({ dispatch }) {
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "addPlayer", payload: name });
    setName("");
  }
  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Player</button>
      </div>
    </>
  );
}

export function Player({ player, dispatch }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((o) => !o);
  }

  function removePlayer(e) {
    e.preventDefault();
    dispatch({ type: "removePlayer", payload: player.id });
  }

  return (
    <li className={styles.Player}>
      <div style={{ display: "flex", gap: "0.4rem" }}>
        <span onClick={toggleOpen}> {player.name}</span>
        <button value={isOpen} onClick={toggleOpen}>
          {isOpen ? " ^" : " v"}
        </button>
        <button onClick={removePlayer}>X</button>
      </div>
      {isOpen && (
        <div>
          <UpdatePlayer player={player} dispatch={dispatch}></UpdatePlayer>
        </div>
      )}
    </li>
  );
}

export function UpdatePlayer({ player, dispatch }) {
  const [name, setName] = useState(player.name);
  const [rank, setRank] = useState(player.rank);
  const [melee, setMelee] = useState(player.melee);
  const [kills, setKills] = useState(player.kills);
  const [deaths, setDeaths] = useState(player.deaths);
  const [gamesPlayed, setGamesPlayed] = useState(player.gamesPlayed);
  const [gamesWon, setGamesWon] = useState(player.gamesWon);
  const [gamesFlaked, setGamesFlaked] = useState(player.gamesFlaked);
  const [isPresent, setIsPresent] = useState(player.isPresent);
  function updatePlayer(propertyName, newProperty) {
    dispatch({
      type: "updatePlayer",
      payload: {
        updates: {
          [propertyName]: newProperty,
        },
        id: player.id,
      },
    });
  }

  return (
    <ul>
      <li>
        {propertyNameConversions["name"]}:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            updatePlayer("name", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["rank"]}:{" "}
        <input
          type="text"
          value={rank}
          onChange={(e) => {
            setRank(e.target.value);
            updatePlayer("rank", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["melee"]}:{" "}
        <input
          type="text"
          value={melee}
          onChange={(e) => {
            setMelee(e.target.value);
            updatePlayer("melee", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["kills"]}:{" "}
        <input
          type="text"
          value={kills}
          onChange={(e) => {
            setKills(e.target.value);
            updatePlayer("kills", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["deaths"]}:{" "}
        <input
          type="text"
          value={deaths}
          onChange={(e) => {
            setDeaths(e.target.value);
            updatePlayer("deaths", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["gamesPlayed"]}:{" "}
        <input
          type="text"
          value={gamesPlayed}
          onChange={(e) => {
            setGamesPlayed(e.target.value);
            updatePlayer("gamesPlayed", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["gamesWon"]}:{" "}
        <input
          type="text"
          value={gamesWon}
          onChange={(e) => {
            setGamesWon(e.target.value);
            updatePlayer("gamesWon", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["gamesFlaked"]}:{" "}
        <input
          type="text"
          value={gamesFlaked}
          onChange={(e) => {
            setGamesFlaked(e.target.value);
            updatePlayer("gamesFlaked", e.target.value);
          }}
        />
      </li>
      <li>
        {propertyNameConversions["isPresent"]}:{" "}
        <input
          style={{ transform: "scale(1.5)" }}
          type="checkbox"
          checked={isPresent}
          onChange={(e) => {
            setIsPresent(e.target.checked);
            updatePlayer("isPresent", e.target.checked);
          }}
        />
      </li>
    </ul>
  );
}

export function Property({ player, propertyName, inputType, updatePlayer }) {
  return (
    <li>
      {propertyNameConversions[propertyName]}:{" "}
      <input
        style={{ transform: "scale(1.5)" }}
        type="checkbox"
        checked={player[propertyName]}
        value={player[propertyName]}
        onChange={(e) => {
          setIsPresent(e.target.checked);
          updatePlayer("isPresent", e.target.checked);
        }}
      />
    </li>
  );
}

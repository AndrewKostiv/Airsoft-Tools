import { useState } from "react";
import styles from "./GameModes.module.css";
import SectionCard from "../Utils/SectionCard/SectionCard";

const properties = [
  {
    propertyName: "name",
    displayName: "Mode",
    inputType: "text",
  },
  // {
  //   propertyName: "active",
  //   displayName: "active",
  //   inputType: "checkbox",
  // },
  // {
  //   propertyName: "hasForts",
  //   displayName: "Includes forts",
  //   inputType: "checkbox",
  // },
];

export default function GameModes({ gameModes, dispatch }) {
  const [activeGameModeId, setActiveGameModeId] = useState(
    gameModes[0].id ?? null,
  );
  let activeGameMode = gameModes.find((mode) => (mode.id == activeGameModeId));
  return (
    <SectionCard className={styles.GameModes}>
      <h2>GameModes</h2>
      <AddGameModes dispatch={dispatch} />
      <ul className={styles.GameModeList}>
        {gameModes.map((mode) => (
          <GameMode
            key={mode.id}
            mode={mode}
            dispatch={dispatch}
            modeName={mode.name}
            setActiveGameModeId={setActiveGameModeId}
          />
        ))}
      </ul>

      <UpdateGameMode gameMode={activeGameMode} dispatch={dispatch} />
    </SectionCard>
  );
}

export function GameMode({ mode, dispatch, modeName, setActiveGameModeId }) {
  function handleRemove() {
    dispatch({
      type: "removeItem",
      collection: "gameModes",
      payload: mode.id,
    });
  }
  return (
    <li
      onClick={() => setActiveGameModeId(mode.id)}
      className={styles.GameMode}
    >
      <span>{modeName}</span>
      <button onClick={handleRemove}>X</button>
    </li>
  );
}

export function AddGameModes({ dispatch }) {
  const [gameModeName, setGameModeName] = useState("");
  function getNewGameMode(name) {
    return {
      name,
      active: false,
      forts: false,
      id: crypto.randomUUID(),
    };
  }
  function handleSubmit() {
    dispatch({
      type: "addItem",
      collection: "gameModes",
      payload: getNewGameMode(gameModeName),
    });
    setGameModeName("");
  }
  return (
    <div>
      <form action={handleSubmit}>
        <input
          type="text"
          value={gameModeName}
          onChange={(e) => setGameModeName(e.target.value)}
        />
        <button type="submit">Add Game Mode</button>
      </form>
    </div>
  );
}

export function UpdateGameMode({ gameMode, dispatch }) {
  return (
    <div className={styles.UpdateGameMode}>
      <h3>{gameMode.name}</h3>
      <ul>
        {properties.map((prop) => (
          <Property
            key={prop.propertyName}
            gameMode={gameMode}
            propertyName={prop.propertyName}
            displayName={prop.displayName}
            inputType={prop.inputType}
            dispatch={dispatch}
          />
        ))}
      </ul>
    </div>
  );
}

export function Property({
  gameMode,
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
      collection: "gameModes",
      payload: {
        id: gameMode.id,
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
        checked={inputType === "checkbox" ? gameMode[propertyName] : undefined}
        value={inputType === "text" ? gameMode[propertyName] : undefined}
        onChange={handleChange}
      />
    </li>
  );
}

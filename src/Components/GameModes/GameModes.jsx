import styles from "./GameModes.module.css";
export default function GameModes({ gameModes, dispatch }) {
  return (
    <div className={styles.GameModes}>
      <h2>GameModes</h2>
      <ul className={styles.GameModeList}>
        {gameModes.map((mode) => (
          <GameMode
            key={mode.id}
            modeId={mode.id}
            dispatch={dispatch}
            modeName={mode.name}
          />
        ))}
      </ul>
    </div>
  );
}

export function GameMode({ modeId, dispatch, modeName }) {
  function handleRemove() {
    dispatch({
      type: "removeItem",
      collection: "gameModes",
      payload: modeId,
    });
  }
  return (
    <li className={styles.GameMode}>
      <span>{modeName}</span>
      <button onClick={handleRemove}>X</button>
    </li>
  );
}

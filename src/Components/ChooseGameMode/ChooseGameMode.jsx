import React, { useEffect, useState } from "react";
import styles from "./ChooseGameMode.module.css";
import SectionCard from "../Utils/SectionCard/SectionCard";

export default function ChooseGameMode({ gameModes }) {
  const [chosenMode, setChosenMode] = useState(
    gameModes[getRandInt(gameModes.length)] ?? null,
  );

  function getRandInt(max) {
    // Use Math.ceil() and Math.floor() to handle potential floating point inputs for min and max
    const minCeiled = 0;
    const maxFloored = Math.floor(max) - 1;
    // The formula ensures the range is inclusive of both ends
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
  }

  function pickRandom() {
    let index = getRandInt(gameModes.length);
    setChosenMode(gameModes[index]);
  }

  return (
    <SectionCard className={styles.ChooseGameMode}>
      <h3>Pick Game Mode</h3>
      <button onClick={pickRandom}>Re role</button>
      <div>{chosenMode.name}</div>
    </SectionCard>
  );
}

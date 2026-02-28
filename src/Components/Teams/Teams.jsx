import { useState } from "react";
import style from "./Teams.module.css";
import SectionCard from "../Utils/SectionCard/SectionCard";

export function Teams({ players }) {
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState([]);
  // const [usePresent, setUsePresent] = useState(true);
  const shuffleArray = (array) => {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }
    return shuffled;
  };

  function handleMakeTeams() {
    if (teamCount > players.length || teamCount === 0) return;
    let tempTeams = Array.from({ length: teamCount }, () => []);
    shuffleArray(players).map((player, index) => {
      tempTeams[index % tempTeams.length].push(player);
    });
    setTeams(tempTeams);
    console.log(tempTeams);
  }

  function handleCountChange(e) {
    e.preventDefault();
    let input = e.target.value;

    if (input > players.length) input = players.length;
    else if (input < 0) input = 1;

    setTeamCount(input);
  }

  return (
    <SectionCard className={style.Teams}>
      <h2>Team Randomizer</h2>
      {/* Input number of teams */}
      <div>
        <input
          type="text"
          value={teamCount}
          placeholder="Number of teams"
          onChange={(e) => handleCountChange(e)}
        />
        <button onClick={handleMakeTeams}>Make Teams</button>
      </div>
      {/*Checkbox to filter non present players */}
      {/* <div>
        <label htmlFor="isPresent">Only include present players</label>
        <input
          style={{ transform: "scale(1.5)" }}
          type="checkbox"
          id="isPresent"
          checked={usePresent}
          onChange={(e) => setUsePresent(e.target.checked)}
        />
      </div> */}
      {/* List of teams */}
      <ul>
        {teams.map((team, index) => (
          <Team key={index} teamNumber={index} team={team} />
        ))}
      </ul>
    </SectionCard>
  );
}

export function Team({ teamNumber, team }) {
  return (
    <li className={style.Team}>
      <h3>Team {teamNumber + 1}</h3>
      <ul>
        {team.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </li>
  );
}

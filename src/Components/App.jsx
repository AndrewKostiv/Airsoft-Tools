import { useEffect, useReducer, useState } from "react";
import { Players } from "./Players/Players.jsx";
import { Teams } from "./Teams/Teams.jsx";
import GameModes from "./GameModes/GameModes.jsx";
import ChooseGameMode from "./ChooseGameMode/ChooseGameMode.jsx";
import SectionCard from "./Utils/SectionCard/SectionCard.jsx";
const initialPlayers = [
  {
    name: "Player 1",
    rank: 0,
    melee: 0,
    kills: 0,
    deaths: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    gamesFlaked: 1,
    isPresent: true,
    id: 1,
  },
  {
    name: "Player 2",
    rank: 0,
    melee: 0,
    kills: 0,
    deaths: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    gamesFlaked: 0,
    isPresent: true,
    id: 2,
  },
  {
    name: "Player 3",
    rank: 0,
    melee: 1,
    kills: 0,
    deaths: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    gamesFlaked: 0,
    isPresent: true,
    id: 3,
  },
  {
    name: "Player 4",
    rank: 0,
    melee: 0,
    kills: 0,
    deaths: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    gamesFlaked: 0,
    isPresent: true,
    id: 4,
  },
  {
    name: "Player 5",
    rank: 0,
    melee: 0,
    kills: 0,
    deaths: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    gamesFlaked: 0,
    isPresent: true,
    id: 5,
  },
];

const initialGameModes = [
  { name: "Team Death Match", active: false, id: 1, hasForts: true },
  { name: "Free For All", active: false, id: 2, hasForts: false },
  { name: "Attack & Defend", active: false, id: 3, hasForts: true },
  { name: "Capture The Flag", active: false, id: 4, hasForts: true },
];

const initialData = {
  players: initialPlayers,
  gameModes: initialGameModes,
};

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        [action.collection]: [...state[action.collection], action.payload],
      };

    case "removeItem":
      return {
        ...state,
        [action.collection]: state[action.collection].filter(
          (item) => item.id !== action.payload,
        ),
      };

    case "updateItem":
      console.log(action.payload);

      return {
        ...state,
        [action.collection]: state[action.collection].map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.data }
            : item,
        ),
      };

    default:
      console.log("Error:", action.type, "is not supported");
      return state;
  }
}

export default function App() {
  const [{ players, gameModes }, dispatch] = useReducer(reducer, initialData);

  return (
    <div className="main">
      <h1>Airsoft Tools</h1>
      <Players players={players} dispatch={dispatch} />
      <Teams players={players} />
      <GameModes gameModes={gameModes} dispatch={dispatch} />
      <ChooseGameMode gameModes={gameModes} />
      <div style={{ height: "10rem" }}></div>
    </div>
  );
}

import { useEffect, useReducer, useState } from "react";
import { Players } from "./Players/Players.jsx";
import { Teams } from "./Teams.jsx";

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
  { name: "Team Death Match", active: false, id: 1, forts: true },
  { name: "Free For All", active: false, id: 2, forts: false },
  { name: "Attack & Defend", active: false, id: 3, forts: true },
  { name: "Capture The Flag", active: false, id: 4, forts: true },
];

const initialData = {
  players: initialPlayers,
  gameModes: initialGameModes,
};

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

function getNewGameMode(name) {
  return {
    name,
    active: false,
    forts: false,
    id: crypto.randomUUID(),
  };
}

// function reducer(state, action) {
//   switch (action.type) {
//     case "addPlayer":
//       if (action.payload === "") return { ...state };
//       return {
//         ...state,
//         players: [...state.players, getNewPlayer(action.payload)],
//       };
//     case "removePlayer":
//       return {
//         ...state,
//         players: state.players.filter((player) => player.id !== action.payload),
//       };
//     case "updatePlayer":
//       console.log("called updatePlayer");
//       console.log(action.payload);

//       return {
//         ...state,
//         players: state.players.map((player) =>
//           player.id === action.payload.id
//             ? { ...player, ...action.payload.updates }
//             : player,
//         ),
//       };

//     case "addGameMode":
//       if (action.payload === "") return { ...state };
//       return {
//         ...state,
//         gameModes: [...state.gameModes, getNewGameMode(action.payload)],
//       };
//     case "removeGameMode":
//       return {
//         ...state,
//         gameModes: state.gameModes.filter((mode) => mode.id !== action.payload),
//       };
//     case "updateGameMode":
//       return {
//         ...state,
//         gameModes: state.gameModes.map((mode) =>
//           mode.id === action.payload.id
//             ? { ...mode, ...action.payload.updates }
//             : mode,
//         ),
//       };

//     default:
//       throw new Error("Unknown action");
//   }
// }
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
      <div style={{ height: "10rem" }}></div>
    </div>
  );
}

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";

import { IBoard } from "./slices/types";

// state -> board

// board: {
//   name: "",
//   id: "",
//   tasks: [],
// }

// boardContainer ->
// boardsContainer : []

function App() {
  const boards = useSelector(
    (state: RootState) => state.boardsContainer.boards
  );
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-400">
      <h1>Test</h1>
      <h2>
        {boards.map((board: any) => (
          <div>{board.name}</div>
        ))}
      </h2>
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";

import { IBoard } from "./slices/types";
// import BoardCard from "./components/BoardCard";
import { BoardsContainer } from "./components/BoardsContainer";

// import { Draggable } from "./Draggable";
// import { Droppable } from "./Droppable";

// state -> board

// board: {
//   name: "",
//   id: "",
//   tasks: [],
// }

// boardContainer ->
// boardsContainer : []

// TODO:
// Droppable Containers:
// Draggable BoardCards
// Draggable Tasks

function App() {
  const boards = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-400">
      <h1>Kanban Board</h1>
      <div>
        <BoardsContainer />
      </div>
    </div>
  );
}

export default App;

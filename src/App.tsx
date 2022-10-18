import React from "react";
import "./App.css";
import { BoardsContainer } from "./components/BoardsContainer";

function App() {
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

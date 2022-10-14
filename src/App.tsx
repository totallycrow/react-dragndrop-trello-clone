import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const count = useSelector((state: RootState) => state.sample.value);
  const dispatch = useDispatch();
  return <div className="bg-slate-400">Test</div>;
}

export default App;

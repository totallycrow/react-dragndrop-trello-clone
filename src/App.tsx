import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./slices/sampleSlice";

function App() {
  const count = useSelector((state: RootState) => state.sample.value);
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-400">
      <h1>Test</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}

export default App;

import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "./types";

const initialState = [
  { taskId: "1", value: "test1" },
  { taskId: "2", value: "test2" },
  { taskId: "3", value: "test3" },
  { taskId: "4", value: "test4" },
  { taskId: "5", value: "test5" },
  { taskId: "6", value: "test6" },
];

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskValueTask: (state, action) => {
      console.log("fired");
      const { id, newTaskValue } = action.payload;
      console.log(id);
      console.log(newTaskValue);

      let targetValue = state.find((task) => task.taskId === id);

      if (targetValue) targetValue.value = newTaskValue;
    },
    removeTask: (state, action) => {
      console.log("fired");
      const { id } = action.payload;
      console.log(id);

      const targetTask = state.find((task: ITask) => task.taskId === id);

      if (!targetTask) return;
      const indexToRemove = state.indexOf(targetTask);
      state.splice(indexToRemove, 1);
    },
    addTask: (state, action) => {
      console.log("fired");
      const id = action.payload.id;

      const newTask = {
        taskId: id,
        value: "New Task",
      };
      state.push(newTask);
    },
  },
});

export const { setTaskValueTask, removeTask, addTask } = tasks.actions;
export default tasks.reducer;

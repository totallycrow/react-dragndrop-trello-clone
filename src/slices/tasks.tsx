import { createSlice } from "@reduxjs/toolkit";

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
      state.filter((item: any) => item.id !== id);
    },
  },
});

export const { setTaskValueTask, removeTask } = tasks.actions;
export default tasks.reducer;

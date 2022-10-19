// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

const initialState = {
  group1: { groupName: "Group1", taskIds: ["1", "2", "3"] },
  group2: { groupName: "Group2", taskIds: ["4", "5", "6"] },
  group3: { groupName: "Group3", taskIds: [] },
};

export const boards = createSlice({
  name: "boards",
  initialState,
  reducers: {
    moveBetween: (state, action) => {
      const { activeContainer, activeIndex, overContainer, overIndex, item } =
        action.payload;

      state[overContainer].taskIds.splice(overIndex, 0, item);
      state[activeContainer].taskIds.splice(activeIndex, 1);
    },

    setBoards: (state, action) => {
      const { activeContainer, overContainer, activeIndex, overIndex } =
        action.payload;

      if (activeContainer === overContainer) {
        state[overContainer].taskIds = arrayMove(
          state[overContainer].taskIds,
          activeIndex,
          overIndex
        );
      }
    },

    addBoard: (state) => {
      state[Date.now()] = { groupName: "GroupNew", taskIds: [] };
    },

    removeBoard: (state, action) => {
      const id = action.payload;
      delete state[id];
    },
    removeTaskIdFromBoard: (state, action) => {
      const id = action.payload.id;
      const groupName = action.payload.groupName;

      const targetTask = state[groupName].taskIds.find(
        (task: any) => task === id
      );

      console.log(targetTask);
      const indexToRemove = state[groupName].taskIds.indexOf(targetTask);
      console.log(indexToRemove);
      state[groupName].taskIds.splice(indexToRemove, 1);
    },
  },
});

export const {
  moveBetween,
  setBoards,
  addBoard,
  removeBoard,
  setTaskValue,
  removeTaskIdFromBoard,
} = boards.actions;
export default boards.reducer;

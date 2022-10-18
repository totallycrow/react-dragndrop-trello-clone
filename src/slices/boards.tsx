// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

const initialState = {
  group1: { groupName: "Group1", tasks: ["1", "2", "3"] },
  group2: { groupName: "Group2", tasks: ["4", "5", "6"] },
  group3: { groupName: "Group3", tasks: [] },
};

export const boards = createSlice({
  name: "boards",
  initialState,
  reducers: {
    moveBetween: (state, action) => {
      const { activeContainer, activeIndex, overContainer, overIndex, item } =
        action.payload;

      state[overContainer].tasks.splice(overIndex, 0, item);
      state[activeContainer].tasks.splice(activeIndex, 1);
    },

    setBoards: (state, action) => {
      const { activeContainer, overContainer, activeIndex, overIndex } =
        action.payload;

      if (activeContainer === overContainer) {
        state[overContainer].tasks = arrayMove(
          state[overContainer].tasks,
          activeIndex,
          overIndex
        );
      }
    },

    addBoard: (state) => {
      state[Date.now()] = { groupName: "GroupNew", tasks: [] };
    },

    removeBoard: (state, action) => {
      const id = action.payload;
      delete state[id];
    },
  },
});

export const { moveBetween, setBoards, addBoard, removeBoard } = boards.actions;
export default boards.reducer;

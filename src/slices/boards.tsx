// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IBoardsContainer } from "./types";
import { removeAtIndex } from "../components/utils";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const newGroup = {
  newGroup: { groupName: "GroupNew", tasks: [] },
};

const initialState = {
  group1: { groupName: "Group1", tasks: ["1", "2", "3"] },
  group2: { groupName: "Group2", tasks: ["4", "5", "6"] },
  group3: { groupName: "Group3", tasks: [] },
};

// const moveBetweenContainers = (
//   items,
//   activeContainer,
//   activeIndex,
//   overContainer,
//   overIndex,
//   item
// ) => {
//   return {
//     ...items,
//     [activeContainer]: {
//       tasks: removeAtIndex(items[activeContainer].tasks, activeIndex),
//     },
//     [overContainer]: {
//       tasks: insertAtIndex(items[overContainer].tasks, overIndex, item),
//     },
//   };
// };

export const boards = createSlice({
  name: "boards",
  initialState,
  reducers: {
    moveBetween: (state, action) => {
      const { activeContainer, activeIndex, overContainer, overIndex, item } =
        action.payload;

      console.log("****** @@@@@@@ PAYLOAD");
      console.log(action.payload);
      console.log(activeContainer);
      console.log(overContainer);

      state[overContainer].tasks.splice(overIndex, 0, item);

      state[activeContainer].tasks.splice(activeIndex, 1);

      console.log("!!!!!!!!! STATE AFTER MOVE BETWEEN");
    },

    setBoards: (state, action) => {
      let newItems;
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

    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { moveBetween, setBoards, addBoard } = boards.actions;

export default boards.reducer;

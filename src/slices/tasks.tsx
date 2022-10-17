import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IBoardsContainer } from "./types";

const sampleBoard: IBoard = {
  name: "test-board",
  boardId: "T01",
  tasksIds: ["Do Some Tests"],
};

const initialState: IBoardsContainer = {
  boards: [sampleBoard],
};

// export interface IBoard {
//   name: string;
//   id: string;
//   tasks: Array<string>;
// }

// export interface IBoardsContainer {
//   boards: Array<IBoard>;
// }

export const boardsContainer = createSlice({
  name: "boardsContainer",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {} = boardsContainer.actions;

export default boardsContainer.reducer;

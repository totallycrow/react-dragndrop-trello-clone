import { DndContext, DragOverlay } from "@dnd-kit/core";
import { DraggableTask } from "./DraggableTask";
import { TasksContainer } from "./TasksContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { useBoardsController } from "../hooks/useBoardsController";
import { addBoard } from "../slices/boards";
import { IGroupItems } from "../slices/types";

// SETUP SELECTOR
const boardsSelector = createSelector(
  (state: RootState) => state,
  (state) => state.boards
);

//**********  MAIN COMPONENT **********
export const BoardsContainer = () => {
  const dispatch = useDispatch();
  const boards: IGroupItems = useSelector(boardsSelector);

  // SETUP BOARDS CONTROLLER
  const {
    handleDragCancel,
    sensors,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    activeId,
  } = useBoardsController();

  return (
    <div className="bg-slate-300">
      <h2>BoardsContainer</h2>
      <div>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex">
            {Object.keys(boards).map((group) => (
              <TasksContainer
                id={group}
                items={boards[group]}
                activeId={activeId}
                key={group}
                groupName={boards[group].groupName}
              />
            ))}
            <button className="inline" onClick={() => dispatch(addBoard())}>
              New Board
            </button>
          </div>

          <DragOverlay>
            {activeId ? <DraggableTask id={activeId} dragOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

// @ts-nocheck
import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";
import { TasksContainer } from "./TasksContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { moveBetween, setBoards, addBoard } from "../slices/boards";

// SETUP SELECTOR
const boardsSelector = createSelector(
  (state: RootState) => state,
  (state) => state.boards
);

//**********  MAIN COMPONENT **********
export const BoardsContainer = () => {
  const dispatch = useDispatch();
  const boards = useSelector(boardsSelector);
  const [activeId, setActiveId] = useState<string | null>(null);

  // SETUP SENSORS
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragCancel = () => setActiveId(null);

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    dispatch(
      moveBetween({
        items,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        item,
      })
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in boards
          ? boards[overContainer].tasks.length + 1
          : over.data.current.sortable.index;

      let newItems;
      if (activeContainer === overContainer) {
        dispatch(
          setBoards({
            activeContainer,
            overContainer,
            activeIndex,
            overIndex,
          })
        );
      } else {
        newItems = moveBetweenContainers(
          boards,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      }

      return newItems;
    }
    setActiveId(null);
  };

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
            {Object.keys(boards).map((group, index) => (
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

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id as string);
  }

  function handleDragOver({ active, over }) {
    const overId = over?.id;

    if (!overId || over.data === undefined) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;

    // ?? ********************************************************************************************************
    // initial code
    // const overContainer = over.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || overId;

    if (!overContainer) return;

    if (activeContainer !== overContainer) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in boards
          ? boards[overContainer].length + 1
          : over.data.current.sortable.index;

      return moveBetweenContainers(
        boards,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        active.id
      );
    }
  }
};

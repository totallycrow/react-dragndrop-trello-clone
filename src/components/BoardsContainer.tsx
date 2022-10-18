// @ts-nocheck
import React, { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DraggableTask } from "./DraggableTask";
import { TasksContainer } from "./TasksContainer";
import { insertAtIndex, removeAtIndex } from "./utils";
import { useDispatch, useSelector, getState } from "react-redux";
import { RootState, store } from "../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { moveBetween, setBoards } from "../slices/boards";

const initialBoard = {
  boardId: "group1",
  name: "Test Board",
  taskIds: [0, 1, 2],
};

const boardsSelector = createSelector(
  (state: RootState) => state,
  (state) => state.boards
);

export const BoardsContainer = () => {
  const dispatch = useDispatch();
  const boards = useSelector(boardsSelector);
  const [itemGroups, setItemGroups] = useState(boards);
  const [activeId, setActiveId] = useState<string | null>(null);

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

    console.log("MOVE BETWEEN");
    console.log(boards);

    return {
      ...items,
      [activeContainer]: {
        tasks: removeAtIndex(items[activeContainer].tasks, activeIndex),
      },
      [overContainer]: {
        tasks: insertAtIndex(items[overContainer].tasks, overIndex, item),
      },
    };
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
        over.id in itemGroups
          ? itemGroups[overContainer].tasks.length + 1
          : over.data.current.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: {
              tasks: arrayMove(
                itemGroups[overContainer].tasks,
                activeIndex,
                overIndex
              ),
            },
          };
          // const { activeContainer, overContainer, activeIndex };
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
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
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
            {Object.keys(boards).map((group) => (
              <TasksContainer
                id={group}
                items={boards[group]}
                activeId={activeId}
                key={group}
                groupName={boards[group].groupName}
              />
            ))}
          </div>
          <DragOverlay>
            {activeId ? <DraggableTask id={activeId} dragOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  function handleDragStart(event: DragStartEvent) {
    console.log("DRAG START", event);
    const { active } = event;
    const { id } = active;

    setActiveId(id as string);
  }

  function handleDragOver({ active, over }) {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;

    // ??
    const overContainer = over.data.current?.sortable.containerId || overId;

    // initial code
    // const overContainer = over.data.current.sortable.containerId;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  }
};

import {
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { createSelector } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { moveBetween, setBoards } from "../slices/boards";
import { IGroupItems } from "../slices/types";

// SETUP SELECTOR
const boardsSelector = createSelector(
  (state: RootState) => state,
  (state) => state.boards
);

export const useBoardsController: any = () => {
  const dispatch = useDispatch();
  const boards: IGroupItems = useSelector(boardsSelector);
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
    items: any,
    activeContainer: any,
    activeIndex: any,
    overContainer: string,
    overIndex: any,
    item: any
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

  const handleDragEnd = ({ active, over }: any) => {
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

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id as string);
  }

  function handleDragOver({ active, over }: any) {
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
          ? boards[overContainer].tasks.length + 1
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

  return {
    handleDragCancel,
    sensors,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    activeId,
  };
};

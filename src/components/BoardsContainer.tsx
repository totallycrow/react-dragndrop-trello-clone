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

export const BoardsContainer = () => {
  const containers = [1, 2];
  const [itemGroups, setItemGroups] = useState({
    group1: ["1", "2", "3"],
    group2: ["4", "5", "6"],
    group3: ["7", "8", "9"],
  });
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
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
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
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
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
            {Object.keys(itemGroups).map((group) => (
              <TasksContainer
                id={group}
                items={itemGroups[group]}
                activeId={activeId}
                key={group}
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
  // function handleDragEnd(event: any) {
  //   const { active, over } = event;

  //   console.log("ACTIVE ID", active.id);
  //   console.log("OVER ID", over.id);

  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }

  // import React, {useState} from 'react';
  // import {DndContext} from '@dnd-kit/core';

  // import {Droppable} from './Droppable';
  // import {Draggable} from './Draggable';

  // function App() {
  //   const [isDropped, setIsDropped] = useState(false);
  //   const draggableMarkup = (
  //     <Draggable>Drag me</Draggable>
  //   );

  //   return (
  //     <DndContext onDragEnd={handleDragEnd}>
  //       {!isDropped ? draggableMarkup : null}
  //       <Droppable>
  //         {isDropped ? draggableMarkup : 'Drop here'}
  //       </Droppable>
  //     </DndContext>
  //   );

  //   function handleDragEnd(event) {
  //     if (event.over && event.over.id === 'droppable') {
  //       setIsDropped(true);
  //     }
  //   }
  // }
};

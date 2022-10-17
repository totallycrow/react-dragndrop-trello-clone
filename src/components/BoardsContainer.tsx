import React, { useState } from "react";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DraggableTask } from "./DraggableTask";
import { TasksContainer } from "./TasksContainer";

export const BoardsContainer = () => {
  const containers = ["A", "B", "C"];
  const [items, setItems] = useState([
    ["item1", "item2"],
    ["item3", "item4"],
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="bg-slate-300">
      <h2>BoardsContainer</h2>
      <div>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <TasksContainer
            key={containers[0]}
            id={containers[0]}
            items={items[0]}
          ></TasksContainer>
          <TasksContainer
            key={containers[1]}
            id={containers[1]}
            items={items[1]}
          ></TasksContainer>
        </DndContext>
      </div>
    </div>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    console.log("ACTIVE ID", active.id);
    console.log("OVER ID", over.id);

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

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

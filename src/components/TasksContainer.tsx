import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";

export const TasksContainer = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  return (
    <SortableContext
      id={props.id}
      items={props.items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-400 h-40 w-40 z-0"
      >
        {props.items.map((item: any) => {
          console.log(item);
          return <DraggableTask id={item} />;
        })}
      </div>
    </SortableContext>
  );
};

// import React from 'react';
// import {useDroppable} from '@dnd-kit/core';

// function Droppable(props) {
//   const {isOver, setNodeRef} = useDroppable({
//     id: 'droppable',
//   });
//   const style = {
//     color: isOver ? 'green' : undefined,
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       {props.children}
//     </div>
//   );
// }

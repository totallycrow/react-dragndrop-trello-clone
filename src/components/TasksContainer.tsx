import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";

export const TasksContainer = (props: any) => {
  console.log("TASK CONTAINER");
  console.log(props);
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  console.log("TASK CONTAINER");
  console.log(props);

  return (
    <div>
      <h2>test</h2>
      <div>
        <SortableContext
          id={props.id}
          items={props.items.tasks}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            style={style}
            className="bg-slate-400 h-40 w-40 z-0 inline-block"
          >
            {props.items.tasks.map((item: any) => {
              console.log(item);
              return <DraggableTask id={item} />;
            })}
          </div>
        </SortableContext>
      </div>
    </div>
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

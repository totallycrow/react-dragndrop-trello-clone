import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const DraggableTask = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      transition: {
        duration: 150, // milliseconds,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="z-50"
    >
      Element: {props.id}
    </button>
  );
};

// import React from 'react';
// import {useDraggable} from '@dnd-kit/core';

// function Draggable(props) {
//   const {attributes, listeners, setNodeRef, transform} = useDraggable({
//     id: 'draggable',
//   });
//   const style = transform ? {
//     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//   } : undefined;

//   return (
//     <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {props.children}
//     </button>
//   );
// }
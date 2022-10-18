import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";
import { addBoard, removeBoard } from "../slices/boards";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const boardsSelector = createSelector(
  (state: RootState) => state,
  (state) => state.boards
);

export const TasksContainer = (props: any) => {
  const dispatch = useDispatch();
  const boards = useSelector(boardsSelector);

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
      <h3 className="inline">{props.groupName}</h3>
      <button
        className="close inline"
        onClick={() => dispatch(removeBoard(props.id))}
      >
        &times;
      </button>

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

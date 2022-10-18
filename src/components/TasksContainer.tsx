import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";
import { removeBoard } from "../slices/boards";
import { useDispatch } from "react-redux";

export const TasksContainer = (props: any) => {
  const dispatch = useDispatch();

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

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
              return <DraggableTask id={item} />;
            })}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

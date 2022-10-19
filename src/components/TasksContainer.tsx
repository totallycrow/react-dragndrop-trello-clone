import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";
import { removeBoard, addTaskIdToBoard } from "../slices/boards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addTask } from "../slices/tasks";

export const TasksContainer = (props: any) => {
  const dispatch = useDispatch();

  // @ts-ignore
  const tasks = useSelector((state: RootState) => state.tasks);
  console.log(tasks);

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  const groupId = props.id;

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
          items={props.items}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            style={style}
            className="bg-slate-400 h-40 w-40 z-0 inline-block"
          >
            {props.items.map((item: any, index: any) => {
              console.log(item);
              return (
                <div>
                  {" "}
                  <DraggableTask
                    id={item}
                    value={
                      tasks.find((task: any) => task.taskId === item)?.value
                    }
                    index={index}
                    groupName={props.id}
                  />
                </div>
              );
            })}
            <button
              onClick={() => {
                const id = Date.now();
                dispatch(addTask({ id }));
                dispatch(addTaskIdToBoard({ id, groupId }));
              }}
            >
              Add New Task
            </button>
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

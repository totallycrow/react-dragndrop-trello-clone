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
import { ITask, ITaskProps } from "../slices/types";

export const TasksContainer = ({
  id,
  items,
  activeId,
  key,
  groupName,
}: ITaskProps) => {
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.tasks);
  console.log(tasks);

  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  const groupId = id;

  return (
    <div>
      <h3 className="inline">{groupName}</h3>
      <button
        className="close inline"
        onClick={() => dispatch(removeBoard(id))}
      >
        &times;
      </button>

      <div>
        <SortableContext
          id={id}
          items={items}
          key={key}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            style={style}
            className="bg-slate-400 h-40 w-40 z-0 inline-block"
          >
            {items.map((item: string) => {
              console.log(item);
              return (
                <div>
                  {" "}
                  <DraggableTask
                    id={item}
                    value={
                      tasks.find((task: ITask) => task.taskId === item)?.value
                    }
                    groupName={id}
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

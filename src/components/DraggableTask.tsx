import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { removeTaskIdFromBoard } from "../slices/boards";
import { removeTask, setTaskValueTask } from "../slices/tasks";

interface ITaskProps {
  groupName: string;
  id: string;
  value: string | undefined;
}

export const DraggableTask = ({ groupName, id, value }: ITaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const dispatch = useDispatch();

  // value === undefined while dragging? // potentially set it to initial value
  const taskValue = value || "";

  return (
    <div>
      <div className={"inline"} {...listeners} {...attributes}>
        &#9776;
      </div>
      <input
        ref={setNodeRef}
        style={style}
        className="z-50 block w-1/2 inline"
        value={taskValue}
        onChange={(e) => {
          console.log("*******???????", id);
          dispatch(setTaskValueTask({ id: id, newTaskValue: e.target.value }));
        }}
      ></input>
      <button
        className="inline"
        onClick={() => {
          dispatch(removeTaskIdFromBoard({ id, groupName }));
          dispatch(removeTask({ id }));
        }}
      >
        X
      </button>
    </div>
  );
};

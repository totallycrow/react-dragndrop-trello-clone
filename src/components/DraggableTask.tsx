import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { removeTaskIdFromBoard, setTaskValue } from "../slices/boards";
import { removeTask, setTaskValueTask } from "../slices/tasks";

export const DraggableTask = ({ groupName, id, index, value }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const dispatch = useDispatch();
  // @ts-ignore
  // const tasks = useSelector(
  //   (state: RootState) => state.boards[groupName].tasks
  // );

  // groupName, index, newTaskValue

  return (
    <div>
      <div className={"inline"} {...listeners} {...attributes}>
        &#9776;
      </div>
      <input
        ref={setNodeRef}
        style={style}
        className="z-50 block w-1/2 inline"
        value={value}
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

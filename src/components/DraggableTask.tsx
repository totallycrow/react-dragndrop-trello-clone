import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setTaskValue } from "../slices/boards";
import { setTaskValueTask } from "../slices/tasks";
import { removeTask } from "../slices/tasks";
import { removeTaskIdFromBoard } from "../slices/boards";

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
      <input
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="z-50 block w-1/2 inline"
        value={value}
        onChange={(e) => {
          console.log("*******??????? INPUT ID", id);
          dispatch(setTaskValueTask({ id: id, newTaskValue: e.target.value }));
        }}
      ></input>
      <button
        className="close inline"
        onClick={() => {
          // dispatch(removeTask({ id: id }));
          // dispatch(removeTaskIdFromBoard({ id: id, groupName: groupName }));
        }}
      >
        &times;
      </button>
    </div>
  );
};

import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export const removeAtIndex = (array: any, index: any) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: any, index: any, item: any) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

// export const arrayMove = (array: any, oldIndex: any, newIndex: any) => {
//   return dndKitArrayMove(array, oldIndex, newIndex);
// };

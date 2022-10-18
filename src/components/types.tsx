export interface IBoard {
  name: string;
  boardId: string;
  tasksIds: Array<string>;
}

export interface IBoardsContainer {
  boards: Array<IBoard>;
}

export interface ITask {
  taskId: string;
  value: string;
}
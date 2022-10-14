export interface IBoard {
  name: string;
  boardId: string;
  tasks: Array<string>;
}

export interface IBoardsContainer {
  boards: Array<IBoard>;
}

export interface ITask {
  taskId: string;
  value: string;
}

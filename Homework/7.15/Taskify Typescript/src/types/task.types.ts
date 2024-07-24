export interface Task {
  _id: string;
  title: string;
  description: string;
  body: string;
  todoList: Todo[];
  isPinned: boolean;
}

export interface Todo {
  _id: string;
  title: string;
  isComplete: boolean;
}

import axios from "axios";
import React from "react";
import { Todo } from "./TodoTypes.ts";
type TodoComponentProps = {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
};

class TodoComponent extends React.Component<TodoComponentProps> {
  constructor(props: TodoComponentProps) {
    super(props);
  }

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { data } = await axios.patch<Todo>(
        `http://localhost:8001/todos/${this.props.todo.id}`,
        {
          completed: event.target.checked,
        }
      );
      this.props.updateTodo(data);
    } catch (error) {
      console.log(`App: `, error);
    }
  };
  render(): React.ReactNode {
    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <p>{this.props.todo.title}</p>
        <input
          type="checkbox"
          onChange={this.handleChange}
          checked={this.props.todo.completed}
        />
      </div>
    );
  }
}

export default TodoComponent;

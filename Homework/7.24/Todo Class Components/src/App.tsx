import axios from "axios";
import React from "react";
import TodoComponent from "./TodoComponent.tsx";
import { Todo } from "./TodoTypes.ts";

type AppProps = {};
type AppState = {
  todos: Todo[];
  newTitle: string;
};
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      todos: [],
      newTitle: "",
    };
  }

  async fetchData() {
    try {
      const { data: todos } = await axios.get<Todo[]>(
        "http://localhost:8001/todos"
      );
      this.setState({ todos });
    } catch (error) {
      console.log(`App: `, error);
    }
  }

  componentDidMount(): void {
    this.fetchData();
  }

  updateTodo = (updated: Todo) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === updated.id ? updated : todo
      ),
    });
  };
  addTodo = async () => {
    try {
      const { data: newTodo } = await axios.post<Todo>(
        "http://localhost:8001/todos",
        {
          title: this.state.newTitle,
          completed: false,
        }
      );
      this.setState({
        todos: [...this.state.todos, newTodo],
        newTitle: "",
      });
    } catch (error) {}
  };

  render(): React.ReactNode {
    return (
      <>
        <input
          value={this.state.newTitle}
          onChange={(event) => {
            this.setState({ newTitle: event.target.value });
          }}
        />
        <button onClick={this.addTodo}>Add</button>
        <ul>
          {this.state.todos.map((todo) => {
            return (
              <TodoComponent
                todo={todo}
                updateTodo={this.updateTodo}
                key={todo.id}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
export default App;

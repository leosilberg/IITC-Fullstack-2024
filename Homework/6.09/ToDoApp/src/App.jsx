import { useState } from "react";

const TEST_DATA = [
  { id: "1", title: "Learn React", isComplete: false },
  { id: "2", title: "Build a Todo App", isComplete: false },
  { id: "3", title: "Read JavaScript Documentation", isComplete: true },
  { id: "4", title: "Write Unit Tests", isComplete: false },
  { id: "5", title: "Implement Context", isComplete: true },
  { id: "6", title: "Create Portfolio Website", isComplete: false },
  { id: "7", title: "Learn TypeScript", isComplete: false },
  { id: "8", title: "Refactor Codebase", isComplete: true },
  { id: "9", title: "Optimize Performance", isComplete: false },
  { id: "10", title: "Deploy to Production", isComplete: true },
];
function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function App() {
  const [todos, setTodos] = useState(TEST_DATA);
  const [newTitle, setNewTitle] = useState("");
  const completedToDos = todos.filter((todo) => todo.isComplete).length;
  const activeToDos = todos.filter((todo) => !todo.isComplete).length;
  function toggleToDo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  }
  function deleteToDo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  function createToDo(event) {
    event.preventDefault();

    setTodos(
      todos.concat({ id: makeId(3), title: newTitle, isComplete: false })
    );
    setNewTitle("");
  }
  return (
    <>
      <form onSubmit={createToDo}>
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <button>Create ToDo</button>
      </form>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        <>
          <ul>
            {todos.map((todo) => {
              return (
                <li className="todo__card" key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() => toggleToDo(todo.id)}
                  />
                  <p className={todo.isComplete ? "completed" : ""}>
                    {todo.title}
                  </p>
                  <button onClick={() => deleteToDo(todo.id)}>Delete </button>
                </li>
              );
            })}
          </ul>
          <div>
            <p>Total ToDos: {todos.length}</p>
            <p>Completed ToDos: {completedToDos}</p>
            <p>Active ToDos: {activeToDos}</p>
            <progress max={todos.length} value={completedToDos}></progress>
          </div>
        </>
      )}
    </>
  );
}

export default App;

import { useEffect, useMemo, useState } from "react";
import TodoStatistics from "./components/TodoStatistics.jsx";
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import axios from "axios";
import Filter from "./components/Filter.jsx";

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
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState({
    title: "",
    isComplete: [true, false],
  });
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      return (
        todo.title.toLowerCase().includes(filter.title.toLowerCase()) &&
        filter.isComplete.includes(todo.isComplete)
      );
    });
  }, [todos,filter]);
  const completedToDos = todos.filter((todo) => todo.isComplete).length;

  useEffect(() => {
    console.log(todos);
    return () => {
      console.log("Cleanup " + todos.length);
    };
  }, [todos]);

  useEffect(() => {
    console.log("Hello");
    const abortController = new AbortController();
    loadToDos(abortController.signal);
    return () => abortController.abort();
  }, []);

  async function loadToDos(signal) {
    try {
      console.log("Load data");
      const result = await axios.get("http://localhost:8001/todos", {
        signal: signal,
      });
      console.log("Finished load");
      setTodos(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleToDo(id, isComplete) {
    try {
      const result = await axios.patch("http://localhost:8001/todos/" + id, {
        isComplete: !isComplete,
      });
      setTodos(
        todos.map((todo) => {
          return todo.id === id ? { ...todo, isComplete: !isComplete } : todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteToDo(id) {
    try {
      const result = await axios.delete("http://localhost:8001/todos/" + id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log();
    }
  }
  async function createToDo(newTitle) {
    try {
      const newTodo = { id: makeId(3), title: newTitle, isComplete: false };
      const result = await axios.post("http://localhost:8001/todos", newTodo);
      setTodos(todos.concat(newTodo));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="app__container">
    
     <div className="fixed">
        <AddTodoForm createToDo={createToDo} />
        <TodoStatistics
          totalTodos={todos.length}
          completedToDos={completedToDos}
        />
     </div>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        <>
          <Filter setFilter={setFilter} />
          <TodoList
            todos={filteredTodos}
            toggleToDo={toggleToDo}
            deleteToDo={deleteToDo}
          />
        </>
      )}
    </div>
  );
}

export default App;

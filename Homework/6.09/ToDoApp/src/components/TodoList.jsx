import ToDoItem from "./TodoItem.jsx";

function TodoList(props) {
  return (
    <ul className="todo__content">
      {props.todos.map((todo) => {
        return (
          <ToDoItem
            todo={todo}
            toggleToDo={props.toggleToDo}
            deleteToDo={props.deleteToDo}
            key={todo.id}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;

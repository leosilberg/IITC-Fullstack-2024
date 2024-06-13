function ToDoItem(props) {
  const todo = props.todo;
  return (
    <li className="todo__card">
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => props.toggleToDo(todo.id,todo.isComplete)}
      />
      <p className={todo.isComplete ? "completed" : ""}>{todo.title}</p>
      <button className="todo__button-delete" onClick={() => props.deleteToDo(todo.id)}>Delete </button>
    </li>
  );
}
export default ToDoItem;

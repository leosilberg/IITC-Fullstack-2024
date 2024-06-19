import { Card, CardContent, List, ListItem } from "@mui/material";
import ToDoItem from "./TodoItem.jsx";

function TodoList(props) {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {props.todos.map((todo) => {
        return (
          <ListItem key={todo.id}>
            <ToDoItem
              todo={todo}
              toggleToDo={props.toggleToDo}
              deleteToDo={props.deleteToDo}
              editToDoTitle={props.editToDoTitle}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default TodoList;

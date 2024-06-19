import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function ToDoItem(props) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const newTitleRef = useRef(null);
  const todo = props.todo;
  async function toggleEditMode() {
    if (editMode && newTitleRef.current.value !== todo.title) {
      await props.editToDoTitle(
        todo.id,
        newTitleRef.current.value,
        todo.description
      );
    }
    setEditMode(!editMode);
  }
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="todo__card">
          <Checkbox
            checked={todo.isComplete}
            onChange={() => props.toggleToDo(todo.id, todo.isComplete)}
          />

          {editMode ? (
            <TextField
              variant="outlined"
              inputRef={newTitleRef}
              defaultValue={todo.title}
              size="small"
            />
          ) : (
            <Typography
              variant="body1"
              className={todo.isComplete ? "completed" : ""}
              sx={{ overflowWrap: "anywhere" }}
              onClick={() => {
                navigate(`/todos/${todo.id}`);
              }}
            >
              {todo.title}
            </Typography>
          )}

          <div className="todo__actions">
            <Tooltip title={"Edit Title"}>
              <IconButton onClick={toggleEditMode}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Remove ToDo"}>
              <IconButton onClick={() => props.deleteToDo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>{todo.description}</AccordionDetails>
    </Accordion>
  );
}
export default ToDoItem;

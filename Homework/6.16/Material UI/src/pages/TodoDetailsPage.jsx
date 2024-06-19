import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ApiService } from "../services/api.service.js";

export async function todoLoader({ params }) {
  const abortController = new AbortController();
  const todoId = params.todoId;
  try {
    console.log(`Load data ${todoId}`);
    const { data } = await ApiService.loadTodo(todoId, abortController.signal);
    console.log("Finished load todo");

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function TodoDetailsPage() {
  const data = useLoaderData();
  const [todo, setTodo] = useState(data);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const newTitleRef = useRef(null);
  const newDescriptionRef = useRef(null);
  async function toggleEditMode() {
    if (
      editMode &&
      (newTitleRef.current.value !== todo.title ||
        newDescriptionRef.current.value !== todo.description)
    ) {
      await editToDo();
    }
    setEditMode(!editMode);
  }

  async function editToDo() {
    let snackbar;
    try {
      snackbar = await ApiService.editToDo(
        todo.id,
        newTitleRef.current.value,
        newDescriptionRef.current.value
      );

      setTodo({
        ...todo,
        title: newTitleRef.current.value,
        description: newDescriptionRef.current.value,
      });
    } catch (error) {
      snackbar = error;
    }
  }

  async function deleteToDo() {
    let snackbar;
    try {
      snackbar = await ApiService.deleteToDo(todo.id);
    } catch (error) {
      snackbar = error;
    } finally {
      navigate("/todos/list", { replace: true, state: { snackbar: snackbar } });
    }
  }
  return (
    <Container maxWidth="sm" sx={{ padding: "2rem" }}>
      <Card>
        {!editMode && <CardHeader title={todo?.title} />}
        <CardContent>
          {editMode ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "start",
              }}
            >
              <TextField
                variant="outlined"
                inputRef={newTitleRef}
                defaultValue={todo.title}
                size="small"
              />
              <TextField
                variant="outlined"
                inputRef={newDescriptionRef}
                defaultValue={todo.description}
                size="small"
              />
            </Box>
          ) : (
            <Typography variant="body1">{todo?.description}</Typography>
          )}
        </CardContent>
        <CardActions>
          <Button variant="outlined" sx={{ color: "red" }} onClick={deleteToDo}>
            Delete
          </Button>
          <Button variant="contained" onClick={toggleEditMode}>
            {editMode ? "Save" : "Edit"}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

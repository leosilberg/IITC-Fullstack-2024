import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { ApiService } from "../services/api.service.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

export async function createAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  let snackbar;
  try {
    snackbar = await ApiService.createToDo(updates.title, updates.description);
  } catch (error) {
    snackbar = error;
  } finally {
    return snackbar;
  }
}

export default function CreateTodoPage(props) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const navigate = useNavigate();
  const snackbar = useActionData();
  useEffect(() => {
    snackbar &&
      navigate("/todos/list", {
        replace: true,
        state: { snackbar: snackbar },
      });
  }, [snackbar]);

  return (
    <Modal
      open={open}
      onClose={() => navigate("/todos/list", { replace: true })}
    >
      <Box sx={style}>
        <Card>
          <CardContent>
            <Form method="post" className="form__container">
              <Typography variant="h6" className="form__title">
                Title
              </Typography>
              <TextField variant="outlined" inputRef={titleRef} name="title" />
              <TextField
                multiline
                variant="outlined"
                inputRef={descriptionRef}
                name="description"
              />

              <Button variant="contained" type="submit" disabled={loading}>
                Add
              </Button>
              {loading && <CircularProgress />}
            </Form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

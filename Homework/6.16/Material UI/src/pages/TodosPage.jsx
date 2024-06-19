import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Alert, Skeleton, Snackbar, Tab, Tabs } from "@mui/material";
import DisplayModal from "../components/DisplayModal.jsx";
import Filter from "../components/Filter.jsx";
import ToDoItem from "../components/TodoItem.jsx";
import TodoList from "../components/TodoList.jsx";
import TodoStatistics from "../components/TodoStatistics.jsx";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import { ApiService } from "../services/api.service.js";

export async function todosLoader({ params }) {
  const abortController = new AbortController();
  try {
    console.log("Load data");
    const { data } = await ApiService.loadToDos(abortController.signal);
    console.log("Finished load");

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default function TodosPage(props) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [modal, setModal] = useState({
    open: false,
    message: "",
    action: () => {},
  });

  const data = useLoaderData();
  const [todos, setTodos] = useState(data);
  useEffect(() => {
    console.log("loader data change");
    setTodos(data);
  }, [data]);
  useEffect(() => {
    console.log(todos);
    return () => {
      console.log("Cleanup " + todos.length);
    };
  }, [todos]);

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
  }, [todos, filter]);
  const completedToDos = todos.filter((todo) => todo.isComplete).length;

  const [tab, setTab] = useState(0);
  function handleTabChange(event, newValue) {
    setTab(newValue);
    setFilter((prev) => {
      return {
        ...prev,
        isComplete:
          newValue == 0 ? [true, false] : newValue == 1 ? [false] : [true],
      };
    });
  }

  const location = useLocation();
  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  async function editToDoTitle(id, title, description) {
    let snackbar;
    try {
      snackbar = await ApiService.editToDo(id, title, description);
      setTodos(
        todos.map((todo) => {
          return todo.id === id ? { ...todo, title: title } : todo;
        })
      );
    } catch (error) {
      snackbar = error;
    }
    setSnackbar(snackbar);
  }

  async function toggleToDo(id, isComplete) {
    let snackbar;
    try {
      snackbar = await ApiService.toggleToDo(id, isComplete);
      setTodos(
        todos.map((todo) => {
          return todo.id === id ? { ...todo, isComplete: !isComplete } : todo;
        })
      );
    } catch (error) {
      snackbar = error;
    }
    setSnackbar(snackbar);
  }

  async function deleteToDo(id) {
    let snackbar;
    try {
      snackbar = await ApiService.deleteToDo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      snackbar = error;
    }
    setSnackbar(snackbar);
  }

  return (
    <>
      <div className="app__container">
        <div className="fixed-right">
          <TodoStatistics
            totalTodos={todos.length}
            completedToDos={completedToDos}
          />
        </div>
        <Filter
          updateFilter={(newTitle) =>
            setFilter((prev) => {
              return { ...prev, title: newTitle };
            })
          }
        />
        {todos.length === 0 ? (
          [...Array(10)].fill(0).map((_, index) => {
            return (
              <Skeleton variant="rounded" key={index}>
                <ToDoItem todo={{ title: "", isComplete: false }} />
              </Skeleton>
            );
          })
        ) : (
          <>
            <Tabs value={tab} onChange={handleTabChange}>
              <Tab label="All" />
              <Tab label="Active" />
              <Tab label="Completed" />
            </Tabs>
            <TodoList
              todos={filteredTodos}
              toggleToDo={toggleToDo}
              editToDoTitle={editToDoTitle}
              deleteToDo={(id) =>
                setModal({
                  open: true,
                  message: "Are you sure you want to delete this Todo?",
                  action: () => {
                    deleteToDo(id);
                  },
                })
              }
            />
          </>
        )}
        <DisplayModal
          open={modal.open}
          message={modal.message}
          handleClose={() =>
            setModal({ open: false, message: "", action: () => {} })
          }
          handleConfirm={modal.action}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() =>
            setSnackbar({ open: false, severity: "", message: "" })
          }
        >
          <Alert
            onClose={() =>
              setSnackbar({ open: false, severity: "", message: "" })
            }
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        <Outlet />
      </div>
    </>
  );
}

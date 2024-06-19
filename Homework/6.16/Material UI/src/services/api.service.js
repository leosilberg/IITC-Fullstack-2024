import axios from "axios";
function loadToDos(signal) {
  return axios.get("http://localhost:8001/todos", {
    signal: signal,
  });
}
function loadTodo(id, signal) {
  return axios.get("http://localhost:8001/todos/" + id, {
    signal: signal,
  });
}
async function createToDo(newTitle, newDescription) {
  const newTodo = {
    title: newTitle,
    description: newDescription,
    isComplete: false,
  };
  try {
    await axios.post("http://localhost:8001/todos", newTodo);
    return {
      open: true,
      severity: "success",
      message: "New Todo added",
    };
  } catch (error) {
    console.log(error);
    throw {
      open: true,
      severity: "error",
      message: "Error adding Todo",
    };
  }
}

async function editToDo(id, title, description) {
  try {
    await axios.patch("http://localhost:8001/todos/" + id, {
      title: title,
      description: description,
    });
    
    return {
      open: true,
      severity: "success",
      message: "Todo title edited",
    };
  } catch (error) {
    console.log(error);
    throw {
      open: true,
      severity: "error",
      message: "Error editing Todo",
    };
  }
}

async function toggleToDo(id, isComplete) {
  try {
    await axios.patch("http://localhost:8001/todos/" + id, {
      isComplete: isComplete,
    });
    return { open: true, severity: "success", message: "Todo toggled" };
  } catch (error) {
    console.log(error);
    throw {
      open: true,
      severity: "error",
      message: "Error updating Todo",
    };
  }
}

async function deleteToDo(id) {
  try {
    await axios.delete("http://localhost:8001/todos/" + id);
    return { open: true, severity: "success", message: "Todo deleted" };
  } catch (error) {
    console.log(error);
    throw {
      open: true,
      severity: "error",
      message: "Error deleting Todo",
    };
  }
}

export const ApiService = {
  loadToDos,
  loadTodo,
  createToDo,
  editToDo,
  toggleToDo,
  deleteToDo,
};

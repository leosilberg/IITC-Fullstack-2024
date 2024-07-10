import api from "@/lib/api.js";

async function getTasks() {
  try {
    const { data: tasks } = await api.get("tasks");
    return tasks;
  } catch (error) {
    console.log(`tasks.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}

async function getTask(taskId) {
  try {
    const { data: task } = await api.get(`tasks/${taskId}`);
    return task;
  } catch (error) {
    console.log(`tasks.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}

async function createTask(form) {
  try {
    const { data } = await api.post("/tasks", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(`tasks.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}

async function deleteTask(taskId) {
  try {
    const { data } = await api.delete(`tasks/${taskId}`);
    return data;
  } catch (error) {
    console.log(`tasks.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}

async function editTask(taskId, changes) {
  try {
    const { data } = await api.patch(`tasks/${taskId}`, changes);
    return data;
  } catch (error) {
    console.log(`tasks.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}

export const TasksService = {
  getTasks,
  deleteTask,
  editTask,
  getTask,
  createTask,
};

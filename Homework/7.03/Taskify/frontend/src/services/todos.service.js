import api from "@/lib/api.js";

async function createTodo(taskId, todo) {
  try {
    const { data } = await api.post(`tasks/${taskId}/todo`, todo);
    return data;
  } catch (error) {
    console.log(`todos.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}
async function updateTodo(taskId, todoId, changes) {
  try {
    const { data } = await api.patch(`tasks/${taskId}/todo/${todoId}`, changes);
    return data;
  } catch (error) {
    console.log(`todos.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}

async function deleteTodo(taskId, todoId) {
  try {
    const { data } = await api.delete(`tasks/${taskId}/todo/${todoId}`);
    return data;
  } catch (error) {
    console.log(`todos.service: `, error);
    throw error.response?.data ? error.response.data : error.message;
  }
}
export const TodosService = { updateTodo, deleteTodo,createTodo };

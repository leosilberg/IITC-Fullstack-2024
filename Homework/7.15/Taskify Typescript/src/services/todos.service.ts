import api from "@/lib/api.ts";
import { Todo } from "@/types/task.types.ts";
import { isAxiosError } from "axios";

async function createTodo(
  taskId: string,
  todo: Omit<Todo, "_id">
): Promise<string> {
  try {
    const { data } = await api.post<string>(`tasks/${taskId}/todo`, todo);
    return data;
  } catch (error) {
    console.log(`todos.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}
async function updateTodo(
  taskId: string,
  todoId: string,
  changes: Partial<Todo>
): Promise<string> {
  try {
    const { data } = await api.patch<string>(
      `tasks/${taskId}/todo/${todoId}`,
      changes
    );
    return data;
  } catch (error) {
    console.log(`todos.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function deleteTodo(taskId: string, todoId: string): Promise<string> {
  try {
    const { data } = await api.delete<string>(`tasks/${taskId}/todo/${todoId}`);
    return data;
  } catch (error) {
    console.log(`todos.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}
export const TodosService = { updateTodo, deleteTodo, createTodo };

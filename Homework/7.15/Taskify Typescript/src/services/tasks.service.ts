import api from "@/lib/api.js";
import { Task } from "@/types/task.types.ts";
import { isAxiosError } from "axios";

async function getTasks(): Promise<Task[]> {
  try {
    const { data: tasks } = await api.get<Task[]>("tasks");
    return tasks;
  } catch (error) {
    console.log(`tasks.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function getTask(taskId: string): Promise<Task> {
  try {
    const { data: task } = await api.get<Task>(`tasks/${taskId}`);
    return task;
  } catch (error) {
    console.log(`tasks.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function createTask(form: FormData): Promise<string> {
  try {
    const { data } = await api.post<string>("/tasks", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(`tasks.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function deleteTask(taskId: string): Promise<string> {
  try {
    const { data } = await api.delete<string>(`tasks/${taskId}`);
    return data;
  } catch (error) {
    console.log(`tasks.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function editTask(
  taskId: string,
  changes: Partial<Task>
): Promise<string> {
  try {
    const { data } = await api.patch<string>(`tasks/${taskId}`, changes);
    return data;
  } catch (error) {
    console.log(`tasks.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

export const TasksService = {
  getTasks,
  deleteTask,
  editTask,
  getTask,
  createTask,
};

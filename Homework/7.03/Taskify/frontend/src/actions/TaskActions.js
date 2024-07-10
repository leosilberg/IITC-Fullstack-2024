import { TasksService } from "@/services/tasks.service.js";
import { redirect } from "react-router-dom";

export async function deleteTaskAction({ params }) {
  try {
    const data = await TasksService.deleteTask(params.taskId);
    return "Task deleted succesfully";
  } catch (error) {
    console.log(`TaskCard: `, error);
    return error;
  }
}

export async function updateTaskAction({ request, params }) {
  const formData = await request.formData();
  const changes = Object.fromEntries(formData);
  try {
    const data = await TasksService.editTask(params.taskId, changes);
    return "Task updated succesfully";
  } catch (error) {
    console.log(`TaskCard: `, error);
    return error;
  }
}

export async function createTaskAction({ request }) {
  const form = await request.formData();
  try {
    const data = await TasksService.createTask(form);
    return redirect("/tasks");
  } catch (error) {
    console.log(`CreateTaskPage: `, error);
    return error;
  }
}

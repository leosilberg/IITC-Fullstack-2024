import { TodosService } from "@/services/todos.service.js";
import { Todo } from "@/types/task.types.ts";
import { ActionFunctionArgs } from "react-router-dom";

export async function createTodoAction({
  params,
  request,
}: ActionFunctionArgs): Promise<string> {
  const { taskId } = params;
  const formData = await request.formData();
  try {
    const data = await TodosService.createTodo(
      taskId!,
      Object.fromEntries(formData) as unknown as Omit<Todo, "_id">
    );
    return "Todo created";
  } catch (error) {
    console.log(`TaskDetailsPage: `, error);
    return error as string;
  }
}

export async function updateTodoAction({
  params,
  request,
}: ActionFunctionArgs): Promise<string> {
  const { taskId, todoId } = params;
  const formData = await request.formData();
  try {
    const data = await TodosService.updateTodo(
      taskId!,
      todoId!,
      Object.fromEntries(formData)
    );
    return "Todo updated";
  } catch (error) {
    console.log(`TaskDetailsPage: `, error);
    return error as string;
  }
}

export async function deleteTodoAction({
  params,
}: ActionFunctionArgs): Promise<string> {
  const { taskId, todoId } = params;
  try {
    const data = await TodosService.deleteTodo(taskId!, todoId!);
    return "Todo deleted";
  } catch (error) {
    console.log(`TaskDetailsPage: `, error);
    return error as string;
  }
}

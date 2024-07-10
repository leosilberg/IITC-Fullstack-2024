import { TodosService } from "@/services/todos.service.js";

export async function createTodoAction({ params, request }) {
  const { taskId } = params;
  const formData = await request.formData();
  try {
    const data = await TodosService.createTodo(
      taskId,
      Object.fromEntries(formData),
    );
    return "Todo created";
  } catch (error) {
    console.log(`TaskDetailsPage: `, error);
    return error;
  }
}

export async function updateTodoAction({ params, request }) {
  const { taskId, todoId } = params;
  const formData = await request.formData();
  try {
    const data = await TodosService.updateTodo(
      taskId,
      todoId,
      Object.fromEntries(formData),
    );
    return "Todo updated";
  } catch (error) {
    console.log(`TaskDetailsPage: `, error);
    return error;
  }
}

export async function deleteTodoAction({ params }) {
  const { taskId, todoId } = params;
  try {
    const data = await TodosService.deleteTodo(taskId, todoId);
    return "Todo deleted";
  } catch (error) {
    console.log(`TaskDetailsPage: `, error);
    return error;
  }
}

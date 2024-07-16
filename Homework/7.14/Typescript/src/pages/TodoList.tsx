import CreateTodo from "@/components/CreateTodo.tsx";
import TodoCard, { Todo } from "@/components/TodoCard.tsx";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

interface TodoListProps {}

export async function todosLoader() {
  try {
    const { data } = await axios.get("http://localhost:8001/todos");
    return data;
  } catch (error) {
    console.log(`TodoList: `, error);
    return [];
  }
}
export default function TodoList({}: TodoListProps) {
  const todos = useLoaderData() as Todo[];

  return (
    <div className="grid gap-8 justify-center">
      <CreateTodo />
      <ul className="grid gap-4">
        {todos.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

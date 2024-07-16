import axios from "axios";
import { CircleX } from "lucide-react";
import { ActionFunctionArgs, useFetcher, useNavigate } from "react-router-dom";
import { Button } from "./ui/button.tsx";
import { Card, CardHeader, CardTitle } from "./ui/card.tsx";
import { Checkbox } from "./ui/checkbox.tsx";

export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

interface TodoCardProps {
  todo: Todo;
}

export async function deleteTodoAction({ params }: ActionFunctionArgs) {
  const { todoId } = params;
  try {
    const { data } = await axios.delete(
      `http://localhost:8001/todos/${todoId}`
    );
    return data;
  } catch (error) {
    console.log(`TodoCard: `, error);
  }
}
export async function toggleTodoAction({
  params,
  request,
}: ActionFunctionArgs) {
  const { todoId } = params;
  const formData = await request.formData();
  try {
    const { data } = await axios.patch(
      `http://localhost:8001/todos/${todoId}`,
      { isComplete: Object.fromEntries(formData).isComplete === "true" }
    );
    return data;
  } catch (error) {
    console.log(`TodoCard: `, error);
  }
}
export default function TodoCard({ todo }: TodoCardProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  return (
    <>
      <Card onClick={() => navigate(`/${todo.id}`)}>
        <CardHeader className="flex-row gap-4 items-center">
          <Checkbox
            defaultChecked={todo.isComplete}
            onClick={(event) => event.stopPropagation()}
            onCheckedChange={(checked) =>
              fetcher.submit(
                { isComplete: checked },
                { method: "POST", action: `${todo.id}/toggle` }
              )
            }
          />
          <CardTitle>{todo.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={(event) => {
              event.stopPropagation();
              fetcher.submit(
                {},
                { method: "POST", action: `${todo.id}/delete` }
              );
            }}
          >
            <CircleX />
          </Button>
        </CardHeader>
      </Card>
    </>
  );
}

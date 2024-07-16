import { Todo } from "@/components/TodoCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import axios from "axios";
import { CircleX } from "lucide-react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";

interface TodoDetailsProps {}

export async function todoLoader({ params }: LoaderFunctionArgs) {
  const { todoId } = params;
  try {
    const { data } = await axios.get(`http://localhost:8001/todos/${todoId}`);
    console.log(`TodoDetails: `, data);
    return data;
  } catch (error) {
    console.log(`TodoDetails: `, error);
    return null;
  }
}
export async function updateTodoAction({
  params,
  request,
}: ActionFunctionArgs) {
  const { todoId } = params;
  const formData = await request.formData();

  try {
    const { data } = await axios.patch(
      `http://localhost:8001/todos/${todoId}`,
      Object.fromEntries(formData)
    );
    return data;
  } catch (error) {
    console.log(`TodoCard: `, error);
  }
}
export default function TodoDetails({}: TodoDetailsProps) {
  const fetcher = useFetcher();
  const todo = useLoaderData() as Todo;
  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="flex gap-4 items-center">
          <Checkbox
            defaultChecked={todo.isComplete}
            onClick={(event) => event.stopPropagation()}
            onCheckedChange={(checked) =>
              fetcher.submit(
                { isComplete: checked },
                { method: "POST", action: `toggle` }
              )
            }
          />
          <Input
            defaultValue={todo.title}
            onBlur={(event) =>
              fetcher.submit(
                { title: event.currentTarget.value },
                { method: "POST", action: "update" }
              )
            }
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={(event) => {
              event.stopPropagation();
              fetcher.submit({}, { method: "POST", action: `delete` });
            }}
          >
            <CircleX />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

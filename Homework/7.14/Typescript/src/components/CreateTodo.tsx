import axios from "axios";
import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import { Button } from "./ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Input } from "./ui/input.tsx";

interface CreateTodoProps {}

export async function addTodoAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const { data } = await axios.post("http://localhost:8001/todos", {
      ...Object.fromEntries(formData),
      isComplete: false,
    });
    return data;
  } catch (error) {
    console.log(`CreateTodo: `, error);
    return (error as Error).message;
  }
}
export default function CreateTodo({}: CreateTodoProps) {
  const fetcher = useFetcher();
  return (
    <Card>
      <CardHeader>
        <CardTitle> New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <fetcher.Form method="POST" action="/create" className="grid gap-4">
          <Input placeholder="Type here" name="title" />
          <Button> Add </Button>
        </fetcher.Form>
      </CardContent>
    </Card>
  );
}

import {
  DrawingPinFilledIcon,
  DrawingPinIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog.jsx";
import { Button } from "./ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card.jsx";
import { Checkbox } from "./ui/checkbox.jsx";
import { Label } from "./ui/label.jsx";
import { useToast } from "./ui/use-toast.js";

export default function TaskCard({ task }) {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const { toast } = useToast();

  useEffect(() => {
    if (fetcher.state === "loading" && fetcher.data) {
      toast({ description: fetcher.data });
    }
  }, [fetcher.state]);
  return (
    <>
      <Card
        className="relative cursor-pointer"
        onClick={(event) => navigate(`${task._id}`)}
      >
        <div className="absolute right-4 top-4 flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();
              fetcher.submit(
                { isPinned: !task.isPinned },
                { method: "post", action: `${task._id}/update` },
              );
            }}
          >
            {(
              fetcher.formData
                ? fetcher.formData.get("isPinned") === "true"
                : task.isPinned
            ) ? (
              <DrawingPinFilledIcon />
            ) : (
              <DrawingPinIcon />
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={(event) => event.stopPropagation()}
              >
                <TrashIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this task?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(event) => {
                    event.stopPropagation();
                    fetcher.submit(
                      {},
                      { method: "post", action: `${task._id}/delete` },
                    );
                  }}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <p>{task.body}</p>
          <ul className="grid gap-4">
            {task.todoList.map((todo) => {
              return (
                <li key={todo._id} className="flex items-center gap-4">
                  <Checkbox
                    checked={todo.isComplete}
                    onClick={(event) => event.stopPropagation()}
                    onCheckedChange={(checked) => {
                      fetcher.submit(
                        { title: todo.title, isComplete: checked },
                        {
                          method: "post",
                          action: `${task._id}/todo/${todo._id}/update`,
                        },
                      );
                    }}
                  />
                  <Label> {todo.title}</Label>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

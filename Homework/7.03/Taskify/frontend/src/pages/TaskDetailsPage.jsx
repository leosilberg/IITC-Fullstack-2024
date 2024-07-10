import { Button } from "@/components/ui/button.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Dialog, DialogContent } from "@/components/ui/dialog.jsx";
import Editable from "@/components/ui/Editable.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import { TasksService } from "@/services/tasks.service.js";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";

export async function taskDetailLoader({ params }) {
  const { taskId } = params;
  try {
    const task = await TasksService.getTask(taskId);
    return task;
  } catch (error) {
    console.log(`TaskDetailsPage: `, error);
    return error;
  }
}

export default function TaskDetailsPage() {
  const navigate = useNavigate();
  const task = useLoaderData();
  const fetcher = useFetcher();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const bodyRef = useRef();
  const [newTodo, setNewTodo] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      toast({ description: fetcher.data });
    }
  }, [fetcher.state]);
  return (
    <>
      <Dialog defaultOpen onOpenChange={(open) => !open && navigate("..")}>
        <DialogContent>
          <div className="grid gap-8 p-4">
            <Editable
              text={task.title}
              inputRef={titleRef}
              onChange={(changes) => {
                fetcher.submit(changes, {
                  method: "post",
                  action: `update`,
                });
              }}
            >
              <Input ref={titleRef} defaultValue={task.title} name="title" />
            </Editable>
            <Editable
              text={task.description}
              inputRef={descriptionRef}
              onChange={(changes) => {
                fetcher.submit(changes, {
                  method: "post",
                  action: `update`,
                });
              }}
            >
              <Input
                ref={descriptionRef}
                defaultValue={task.description}
                name="description"
              />
            </Editable>
            <Editable
              text={task.body}
              placeholder="Type your tasks here"
              inputRef={bodyRef}
              onChange={(changes) => {
                fetcher.submit(changes, {
                  method: "post",
                  action: `update`,
                });
              }}
            >
              <Textarea
                ref={bodyRef}
                defaultValue={task.body}
                name="body"
                placeholder="Type your tasks here"
                className="min-h-32"
              />
            </Editable>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Todo List</Label>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setNewTodo(true)}
                >
                  <PlusIcon />
                </Button>
              </div>
              <ul className="grid gap-4">
                {task.todoList.map((todo) => {
                  return (
                    <li
                      key={todo._id}
                      className="group flex items-center gap-4"
                    >
                      <Checkbox
                        checked={todo.isComplete}
                        onCheckedChange={(checked) => {
                          fetcher.submit(
                            { title: todo.title, isComplete: checked },
                            {
                              method: "post",
                              action: `todo/${todo._id}/update`,
                            },
                          );
                        }}
                      />
                      <Label>{todo.title}</Label>
                      <Button
                        className="invisible group-hover:visible"
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          fetcher.submit(
                            {},
                            {
                              method: "post",
                              action: `todo/${todo._id}/delete`,
                            },
                          )
                        }
                      >
                        <Cross1Icon />
                      </Button>
                    </li>
                  );
                })}
              </ul>
              {newTodo && (
                <fetcher.Form
                  method="post"
                  action="todo"
                  className="flex items-center gap-4"
                  onSubmit={() => {
                    setNewTodo(false);
                  }}
                >
                  <Checkbox name="isComplete" value={true} />
                  <Input
                    name={`title`}
                    placeholder="New Todo"
                    required
                    onBlur={(event) => {
                      event.target.form.requestSubmit();
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setNewTodo(false)}
                  >
                    <Cross1Icon />
                  </Button>
                </fetcher.Form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

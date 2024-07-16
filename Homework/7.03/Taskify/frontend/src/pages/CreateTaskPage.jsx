import { Button } from "@/components/ui/button.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const navigation = useNavigation();
  const { toast } = useToast();

  useEffect(() => {
    if (navigation.state === "loading") {
      toast({ description: "New task added" });
    }
  }, [navigation.state]);
  return (
    <>
      <Dialog defaultOpen onOpenChange={(open) => !open && navigate("..")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Add a new task to your list</DialogDescription>
          </DialogHeader>
          <Form id="createTask" method="post" className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input name="title" placeholder="New Title" required />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input
                name="description"
                placeholder="New Description"
                required
              />
            </div>
            <div className="grid gap-2">
              <Textarea
                name="body"
                placeholder="Type your tasks here"
                className="min-h-32"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Todo List</Label>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setTodoList((prev) => {
                      return prev.concat(prev.at(-1) ? prev.at(-1) + 1 : 1);
                    })
                  }
                >
                  <PlusIcon />
                </Button>
              </div>
              <ul className="grid gap-4 px-4">
                {todoList.map((todo, index) => {
                  return (
                    <li key={todo} className="flex items-center gap-4">
                      <Checkbox
                        name={`todoList[${index}][isComplete]`}
                        value={true}
                      />
                      <Input
                        name={`todoList[${index}][title]`}
                        placeholder="New Todo"
                        required
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          setTodoList((prev) =>
                            prev.slice(0, index).concat(prev.slice(index + 1)),
                          )
                        }
                      >
                        <Cross1Icon />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Form>
          <DialogFooter className="gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="createTask">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

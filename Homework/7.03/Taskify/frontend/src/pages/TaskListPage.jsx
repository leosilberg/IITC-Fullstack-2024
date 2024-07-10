import TaskGrid from "@/components/TaskGrid.jsx";
import { Button } from "@/components/ui/button.jsx";
import { TasksService } from "@/services/tasks.service.js";
import { PlusIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

export async function taskListLoader({ params }) {
  try {
    const tasks = await TasksService.getTasks();
    return tasks;
  } catch (error) {
    console.log(`TaskListPage: `, error);
    return null;
  }
}
export default function TaskListPage() {
  const tasks = useLoaderData();
  const navigate = useNavigate();
  const pinnedTasks = useMemo(() => {
    return tasks.filter((task) => task.isPinned);
  }, [tasks]);
  const unPinnedTasks = useMemo(() => {
    return tasks.filter((task) => !task.isPinned);
  }, [tasks]);

  return (
    <>
      <div className="relative grid gap-8 px-24 py-8">
        <h3>Pinned</h3>
        <TaskGrid tasks={pinnedTasks} />
        <h3>All Tasks</h3>
        <TaskGrid tasks={unPinnedTasks} />
        <Button
          className="fixed bottom-8 right-8 h-12 w-12"
          onClick={() => navigate("create")}
        >
          <PlusIcon />
        </Button>
      </div>
      <Outlet />
    </>
  );
}

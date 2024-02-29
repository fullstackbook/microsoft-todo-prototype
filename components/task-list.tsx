"use client";

import { Task } from "@/types/task";
import { Checkbox } from "./ui/checkbox";
import completeTask from "@/actions/complete-task";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { updateTask } from "@/actions/update-task";
import { Button } from "./ui/button";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type Props = {
  tasks: Task[];
  accentClassName: string;
};

export default function TaskList({ tasks, accentClassName }: Props) {
  async function checkTask(task: Task) {
    await completeTask(task.id, !task.isComplete);
  }

  async function updateTitle(task: Task, title: string) {
    const data = {
      title: title,
    };
    await updateTask(task.id, data);
  }

  async function updateNote(task: Task, note: string) {
    const data = {
      note: note,
    };
    await updateTask(task.id, data);
  }

  async function toggleImportant(task: Task) {
    const data = {
      isImportant: !task.isImportant,
    };
    await updateTask(task.id, data);
  }

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-accent mb-0.5 rounded text-foreground flex items-center"
        >
          <div className="p-3">
            <Checkbox
              checked={task.isComplete ? true : false}
              onClick={() => checkTask(task)}
            />
          </div>
          <div className="flex-auto">
            <Drawer>
              <DrawerTrigger
                className={cn(
                  "w-full text-left p-3",
                  task.isComplete && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Task</DrawerTitle>
                </DrawerHeader>
                <div className="p-5 flex flex-col gap-5">
                  <Input
                    type="text"
                    name="title"
                    defaultValue={task.title ?? ""}
                    onChange={(e) => updateTitle(task, e.target.value)}
                  />
                  <Textarea
                    placeholder="Add note"
                    name="note"
                    defaultValue={task.note ?? ""}
                    onChange={(e) => updateNote(task, e.target.value)}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <Button
            className={cn(accentClassName, `hover:${accentClassName}`)}
            variant="ghost"
            onClick={() => toggleImportant(task)}
          >
            {task.isImportant ? (
              <StarFilledIcon className="w-6 h-6" />
            ) : (
              <StarIcon className="w-6 h-6" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}

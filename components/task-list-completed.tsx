"use client";

import { Task } from "@/types/task";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import TaskList from "./task-list";

type Props = {
  tasks: Task[];
};

export default function TaskListCompleted(props: Props) {
  const { tasks } = props;

  const [open, setOpen] = useState(false);

  return (
    <div>
      {open ? (
        <div className="flex flex-col gap-5">
          <div>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/50"
              onClick={() => setOpen(!open)}
            >
              <ChevronDownIcon className="mr-2" /> Completed {tasks.length}
            </Button>
          </div>
          <TaskList
            tasks={tasks}
            accentClassName="text-accent-blue-foreground"
          />
        </div>
      ) : (
        <div>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/50"
            onClick={() => setOpen(!open)}
          >
            <ChevronRightIcon className="mr-2" /> Completed {tasks.length}
          </Button>
        </div>
      )}
    </div>
  );
}

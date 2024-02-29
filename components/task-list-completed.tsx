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
            <Button onClick={() => setOpen(!open)}>
              <ChevronDownIcon /> Completed
            </Button>
          </div>
          <TaskList tasks={tasks} />
        </div>
      ) : (
        <div>
          <Button onClick={() => setOpen(!open)}>
            <ChevronRightIcon /> Completed
          </Button>
        </div>
      )}
    </div>
  );
}

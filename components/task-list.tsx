"use client";

import { Task } from "@/types/task";
import { Checkbox } from "./ui/checkbox";
import completeTask from "@/actions/complete-task";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  async function checkTask(task: Task) {
    await completeTask(task.id, !task.isComplete);
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
          <div>{task.title}</div>
        </div>
      ))}
    </div>
  );
}

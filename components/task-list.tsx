import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <div>
      {tasks.map((task) => (
        <div>{task.title}</div>
      ))}
    </div>
  );
}

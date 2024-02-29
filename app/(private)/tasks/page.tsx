import AddTask from "@/components/add-task";
import TaskList from "@/components/task-list";
import { db } from "@/lib/db";

export default async function Page() {
  const res = await db.query.tasks.findMany();

  return (
    <div className="flex flex-col text-accent-blue-foreground p-5">
      <h1 className="font-bold text-3xl">Tasks</h1>
      {res.length > 0 ? (
        <div>
          <TaskList tasks={res} />
        </div>
      ) : (
        <div>
          Tasks show up here if they aren't part of any lists you've created.
        </div>
      )}
      <div>Completed Tasks</div>
      <div>
        <AddTask />
      </div>
    </div>
  );
}

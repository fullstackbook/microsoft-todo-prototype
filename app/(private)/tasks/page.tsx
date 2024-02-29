import AddTask from "@/components/add-task";
import TaskList from "@/components/task-list";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export default async function Page() {
  const session = await auth();

  const res = await db.query.tasks.findMany({
    where: and(
      eq(tasks.userId, session?.user.id!),
      eq(tasks.isComplete, false)
    ),
  });

  const resCompleted = await db.query.tasks.findMany({
    where: and(eq(tasks.userId, session?.user.id!), eq(tasks.isComplete, true)),
  });

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
      <div>
        <TaskList tasks={resCompleted} />
      </div>
      <div>
        <AddTask />
      </div>
    </div>
  );
}

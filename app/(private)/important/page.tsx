import AddTask from "@/components/add-task";
import TaskList from "@/components/task-list";
import TaskListCompleted from "@/components/task-list-completed";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export default async function Page() {
  const session = await auth();

  const res = await db.query.tasks.findMany({
    where: and(
      eq(tasks.userId, session?.user.id!),
      eq(tasks.isComplete, false),
      eq(tasks.isImportant, true)
    ),
  });

  const resCompleted = await db.query.tasks.findMany({
    where: and(
      eq(tasks.userId, session?.user.id!),
      eq(tasks.isComplete, true),
      eq(tasks.isImportant, true)
    ),
  });

  return (
    <div className="flex flex-col text-accent-pink-foreground p-5 gap-5">
      <h1 className="font-bold text-3xl">Important</h1>
      {res.length > 0 ? (
        <div>
          <TaskList tasks={res} accentClassName="text-accent-pink-foreground" />
        </div>
      ) : (
        <div>Try starring some tasks to see them here...</div>
      )}
      <div>
        <TaskListCompleted
          tasks={resCompleted}
          accentClassName="text-accent-pink-foreground"
        />
      </div>
      <div>
        <AddTask
          isImportant={true}
          className="text-accent-pink-foreground bg-accent hover:bg-accent/50"
        />
      </div>
    </div>
  );
}

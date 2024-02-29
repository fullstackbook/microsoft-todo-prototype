"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTask(id: number, data: any) {
  const session = await auth();
  if (!session) {
    return {
      message: "unauthenticated",
    };
  }

  const update = {
    title: data.title,
    note: data.note,
    isImportant: data.isImportant,
  };

  await db
    .update(tasks)
    .set(update)
    .where(and(eq(tasks.id, id), eq(tasks.userId, session.user.id)));

  revalidatePath("/tasks");
}

"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function createTask(data: any) {
  const session = await auth();
  if (!session) {
    return {
      message: "unauthenticated",
    };
  }
  const dataToInsert = {
    userId: session.user.id,
    title: data.title,
    isImportant: data.isImportant,
  };
  await db.insert(tasks).values(dataToInsert);
  revalidatePath("/tasks");
}

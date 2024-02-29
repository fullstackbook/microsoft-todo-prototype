"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function createTask(title: string) {
  const session = await auth();
  if (!session) {
    return {
      message: "unauthenticated",
    };
  }
  await db.insert(tasks).values({
    userId: session.user.id,
    title: title,
  });
  revalidatePath("/tasks");
}

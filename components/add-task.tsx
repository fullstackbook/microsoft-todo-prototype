"use client";

import { KeyboardEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { createTask } from "@/actions/create-task";

type Props = {
  className: string;
  isImportant?: boolean;
};

export default function AddTask(props: Props) {
  const { className, isImportant } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  async function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const data = {
        title: title,
        isImportant: isImportant,
      };
      await createTask(data);
      setTitle("");
    }
  }

  return (
    <div>
      {isAdding ? (
        <Input
          type="text"
          name="title"
          placeholder="Try adding pay utilities by Friday 6pm"
          onKeyDown={handleKeyDown}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setIsAdding(false)}
        />
      ) : (
        <Button className={className} onClick={() => setIsAdding(true)}>
          <PlusIcon /> Add Task
        </Button>
      )}
    </div>
  );
}

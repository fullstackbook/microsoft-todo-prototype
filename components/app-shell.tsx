"use client";

import { ReactNode, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { TaskCounts } from "@/types/task-counts";

export default function AppShell({
  children,
  taskCounts,
}: {
  children: ReactNode;
  taskCounts: TaskCounts;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12">
      <div className="sm:col-span-12">
        <Header />
      </div>
      <div
        className={cn(
          "transition -translate-x-full delay-200 absolute top-20 bg-background w-full h-full left-0 sm:col-span-3 sm:relative sm:top-0 sm:left-0 sm:transform-none",
          open && "translate-x-0"
        )}
      >
        <Sidebar taskCounts={taskCounts} onClick={() => setOpen(false)} />
      </div>
      <div className="sm:hidden mt-5">
        <Button
          className={cn(
            pathname === "/tasks" && "text-accent-blue-foreground",
            pathname === "/important" && "text-accent-pink-foreground",
            pathname === "/myday" && "text-accent-green-foreground"
          )}
          variant="link"
          onClick={() => setOpen(true)}
        >
          <ChevronLeftIcon className="w-6 h-6" /> Lists
        </Button>
      </div>
      <div className="sm:col-span-9">{children}</div>
    </div>
  );
}

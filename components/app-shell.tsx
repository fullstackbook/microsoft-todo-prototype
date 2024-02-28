import { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12">
      <div className="sm:col-span-12">header</div>
      <div className="sm:col-span-3">sidebar</div>
      <div className="sm:col-span-9">{children}</div>
    </div>
  );
}

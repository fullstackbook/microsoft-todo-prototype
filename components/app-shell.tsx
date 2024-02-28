import { ReactNode } from "react";
import Header from "./header";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12">
      <div className="sm:col-span-12">
        <Header />
      </div>
      <div className="sm:col-span-3">sidebar</div>
      <div className="sm:col-span-9">{children}</div>
    </div>
  );
}

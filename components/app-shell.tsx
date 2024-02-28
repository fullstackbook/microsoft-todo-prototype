import { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12">
      <div className="sm:col-span-12">
        <Header />
      </div>
      <div className="sm:col-span-3">
        <Sidebar />
      </div>
      <div className="sm:col-span-9">{children}</div>
    </div>
  );
}

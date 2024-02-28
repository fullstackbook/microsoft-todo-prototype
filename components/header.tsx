import { CheckboxIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="flex justify-between p-5 border-b-2">
      <Link href="/">
        <CheckboxIcon className="h-8 w-8" />
      </Link>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

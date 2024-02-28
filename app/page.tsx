import { ModeToggle } from "@/components/mode-toggle";
import SignInBtn from "@/components/signin-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <ModeToggle />
      {session ? <Button>Go to App</Button> : <SignInBtn />}
    </div>
  );
}

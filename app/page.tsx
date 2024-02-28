import { ModeToggle } from "@/components/mode-toggle";
import SignInBtn from "@/components/signin-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col gap-5 text-center">
        <ModeToggle />
        <h1>Microsoft To Do Prototype</h1>
        <div>
          {session ? (
            <Button>
              Go to App <ArrowRightIcon className="ml-2" />
            </Button>
          ) : (
            <SignInBtn />
          )}
        </div>
      </div>
    </div>
  );
}

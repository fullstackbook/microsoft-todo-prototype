"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignInBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user.name} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <div>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}

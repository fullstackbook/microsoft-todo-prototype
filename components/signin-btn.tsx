"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignInBtn() {
  return <Button onClick={() => signIn()}>Sign In</Button>;
}

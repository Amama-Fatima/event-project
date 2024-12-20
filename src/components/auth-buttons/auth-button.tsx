import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import LogOut from "./log-out";
import SignIn from "./sign-in";

const AuthButton = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return <SignIn />;
  }

  if (session && session.user) {
    return <LogOut />;
  }
};

export default AuthButton;

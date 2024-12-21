"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import GradientButton from "../gradient-button";
import { LogIn } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logIn = async () => {
    const signInResponse = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/my-events",
      redirect: false,
    });

    if (signInResponse?.error) {
      toast.error("Sign in error");
    } else {
      window.location.href = "/my-events";
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GradientButton
          spanClassName="px-4 rounded-md flex items-center space-x-2"
          className="rounded-md"
        >
          <span>Sign In</span>
          <LogIn />
        </GradientButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome!</DialogTitle>
          <DialogDescription>
            Log in to create or manage your events.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="test@gmail.com"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <GradientButton
            type="submit"
            onClick={logIn}
            spanClassName="px-4 rounded-md flex items-center space-x-2"
            className="rounded-md"
          >
            <span>Sign In</span>
            <LogIn />
          </GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;

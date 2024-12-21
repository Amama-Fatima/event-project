"use client";

import React from "react";
import { signOut } from "next-auth/react";
import GradientButton from "../gradient-button";
import { LogOut as LogOutIcon } from "lucide-react";

const LogOut = () => {
  return (
    <GradientButton
      onClick={() => {
        console.log("signing out");
        signOut();
      }}
      spanClassName="px-4 rounded-md flex items-center space-x-2"
      className="rounded-md"
    >
      <span className="hidden md:block">Log Out</span>
      <LogOutIcon />
    </GradientButton>
  );
};

export default LogOut;

"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <Button
      onClick={() => {
        console.log("signing out");
        signOut();
      }}
    >
      Log Out
    </Button>
  );
};

export default LogOut;

import Link from "next/link";
import React from "react";
import AuthButton from "../auth-buttons/auth-button";
import { headers } from "next/headers";
import HeaderSearchWrapper from "./header-search-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const pathname = headersList.get("x-url-pathname") || "/";
  console.log(pathname);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="backdrop-blur-md bg-background bg-opacity-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-12">
              <Link href="/" className="font-bold text-xl relative group">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8678F9] to-purple-500">
                  EventCraft
                </span>
              </Link>

              {session?.user && (
                <Link
                  href="/my-events"
                  className="text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {/* <span className="relative"> */}
                  My Events
                  {/* <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#8678F9]/80 via-purple-500 to-[#8678F9]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                  {/* </span> */}
                </Link>
              )}
            </div>

            <nav className="flex items-center gap-2">
              <HeaderSearchWrapper />
              <AuthButton />
            </nav>
          </div>
        </div>

        <div className="relative h-0.5 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8678F9] via-purple-600 to-[#8678F9] blur-lg opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8678F9] via-purple-600 to-[#8678F9] opacity-100" />
        </div>
      </div>
    </header>
  );
};

export default Header;

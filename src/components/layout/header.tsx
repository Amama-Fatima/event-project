import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="backdrop-blur-md bg-black bg-opacity-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-bold text-xl relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8678F9] to-purple-500">
                Logo
              </span>
            </Link>

            <nav className="flex items-center space-x-8">
              <Link
                href="/my-events"
                className="text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                <span className="relative">
                  My Events
                  <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-[#8678F9]/0 via-[#8678F9]/50 to-[#8678F9]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </Link>

              <Button className="relative group overflow-hidden bg-transparent hover:text-white transition-colors border-0">
                <span className="absolute inset-0 bg-gradient-to-r from-[#8678F9]/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Logout</span>
              </Button>
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

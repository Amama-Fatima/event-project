import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/75 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-lg">
            Logo
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/events"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              My Events
            </Link>

            {/* Logout Button */}
            <button
              className="flex items-center space-x-1 px-4 py-2 rounded-lg 
                             bg-gray-100 hover:bg-gray-200 text-gray-700
                             transition-colors"
            >
              <span>Logout</span>
              {/* <LogOut size={16} /> */}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

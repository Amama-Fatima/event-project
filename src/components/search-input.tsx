"use client";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchStore } from "@/lib/store";

const SearchInput = () => {
  const divRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const { resetEventName, resetDateFilter, resetEventType } = useSearchStore();

  // const eventType = useSearchStore((state) => state.eventType);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const getSearchUrl = () => {
    resetEventName();
    resetDateFilter();
    resetEventType();
    const baseUrl = `/${searchValue}`;
    // if (eventType) {
    //   return `${baseUrl}?type=${eventType}`;
    // }
    return baseUrl;
  };

  return (
    <div className="flex gap-3">
      <div className="relative w-full">
        <Input
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          autoComplete="off"
          placeholder="Search for a city"
          type="text"
          name="city"
          className="h-12 w-full cursor-default rounded-md border border-gray-800 bg-gray-950 p-3.5 text-foreground transition-colors duration-500 placeholder:select-none placeholder:text-gray-500 focus:border-[#8678F9] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Input
          ref={divRef}
          onChange={(e) => {
            console.log("input 2 ", e.target.value);
          }}
          disabled
          style={{
            border: "1px solid #8678F9",
            opacity,
            WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-md border border-[#8678F9] bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <Link
        className="h-12 px-6 flex justify-center items-center bg-gray-950 border rounded-md border-gray-800 hover:border-[#8678F9] transition-all duration-500 hover:bg-gray-900"
        href={getSearchUrl()}
      >
        <Search className="w-5 h-5 text-foreground text-center" />
      </Link>
    </div>
  );
};

export default SearchInput;

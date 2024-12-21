"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSearchStore } from "@/lib/store";

const NameFilter = () => {
  const router = useRouter();
  const { eventName, setEventName, resetEventName } = useSearchStore();

  const updateURL = (name: string | null) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    if (name && name.trim()) {
      searchParams.set("name", name.trim());
    } else {
      searchParams.delete("name");
      resetEventName();
    }

    const newURL = searchParams.toString()
      ? `${url.pathname}?${searchParams.toString()}`
      : url.pathname;
    console.log("new url is ", newURL);

    router.push(newURL);
  };

  const debouncedUpdateURL = useDebouncedCallback((value: string) => {
    updateURL(value || null);
  }, 300);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEventName(newName);
    debouncedUpdateURL(newName);
  };

  return (
    <Input
      type="text"
      placeholder="Search by event name"
      value={eventName || ""}
      onChange={handleNameChange}
      className="w-[180px]"
    />
  );
};

export default NameFilter;

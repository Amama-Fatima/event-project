"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSearchStore } from "@/lib/store";

const NameFilter = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { eventName, setEventName, resetEventName } = useSearchStore();

  const updateURL = (name: string | null) => {
    // Match the pattern used in other filters
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    if (name && name.trim()) {
      searchParams.set("name", name.trim());
    } else {
      searchParams.delete("name");
    }

    const newURL = searchParams.toString()
      ? `${url.pathname}?${searchParams.toString()}`
      : url.pathname;

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

  useEffect(() => {
    const url = new URL(window.location.href);
    const nameParam = url.searchParams.get("name");
    if (nameParam && !eventName) {
      setEventName(nameParam);
    }
  }, []);

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

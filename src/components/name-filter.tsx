"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSearchStore } from "@/lib/store";

const NameFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { eventName, setEventName, resetEventName } = useSearchStore();

  const updateURL = (name: string | null) => {
    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (name && name.trim()) {
      params.set("eventName", name.trim());
    } else {
      params.delete("eventName");
    }

    // Use pathname instead of window.location
    const newURL = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.push(newURL);
  };

  const debouncedUpdateURL = useDebouncedCallback((value: string) => {
    if (!value || value.trim() === "") {
      resetEventName();
      updateURL(null);
    } else {
      setEventName(value);
      updateURL(value);
    }
  }, 300);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEventName(newName);
    debouncedUpdateURL(newName);
  };

  // Initialize from URL params
  React.useEffect(() => {
    const nameParam = searchParams.get("eventName");
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

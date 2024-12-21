"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore } from "@/lib/store";
import { EventType } from "@/lib/types";
import { useRouter } from "next/navigation";

const eventTypes = [
  "Conference",
  "Meeting",
  "Dining",
  "Studying",
  "Working",
  "Other",
] as const;

const EventTypeFilter = () => {
  const router = useRouter();
  const { eventType, setEventType, resetEventType } = useSearchStore();
  // const pathname = usePathname();

  const updateURL = (type: EventType | null) => {
    // const city = pathname.slice(1);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    if (type) {
      searchParams.set("type", type);
    } else {
      searchParams.delete("type");
    }

    const newURL = searchParams.toString()
      ? `${url.pathname}?${searchParams.toString()}`
      : url.pathname;

    router.push(newURL);
  };

  return (
    <Select
      value={eventType || ""}
      onValueChange={(value) => {
        if (value === "all") {
          resetEventType();
          updateURL(null);
          return;
        }
        const newType = value as EventType | null;
        setEventType(newType);
        updateURL(newType);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select event type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Events</SelectItem>
        {eventTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EventTypeFilter;

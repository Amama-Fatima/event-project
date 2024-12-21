"use client";

import { useSearchStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import React from "react";
import { DayPicker } from "react-day-picker";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

const DateFilter = () => {
  const router = useRouter();
  const { dateFilter, setDateFilter, resetDateFilter } = useSearchStore();

  const updateURL = (date: Date | null) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    if (date) {
      // Format date in local timezone
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      searchParams.set("date", formattedDate);
    } else {
      searchParams.delete("date");
    }

    const newURL = searchParams.toString()
      ? `${url.pathname}?${searchParams.toString()}`
      : url.pathname;

    router.push(newURL);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDateFilter(date);
      updateURL(date);
    } else {
      resetDateFilter();
      updateURL(null);
    }
  };

  const handleReset = () => {
    resetDateFilter();
    updateURL(null);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-auto justify-start text-left font-normal")}
          >
            <CalendarIcon />
            {dateFilter
              ? new Date(dateFilter).toLocaleDateString()
              : "Select a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <DayPicker
            className="p-3"
            mode="single"
            // required={true}
            selected={dateFilter || new Date()}
            onSelect={handleDateSelect}
          />
          <Button variant={"ghost"} onClick={handleReset}>
            Reset
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilter;

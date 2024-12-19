"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema, EventSchemaType, EventType } from "@/lib/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import "react-day-picker/style.css";

import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker";
import TimePicker from "./ui/time-picker";
import { TimeValue } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const AddEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const form = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: "",
      location: "",
      date: undefined,
      time: "",
      address: "",
      organizer_name: "",
      event_type: "Conference",
    },
  });

  const onsubmit: SubmitHandler<EventSchemaType> = async (data) => {
    setIsLoading(true);
    const body = {
      eventData: data,
      userId: session?.user?.id,
    };
    const response = await fetch("/api/add-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      toast.success("Event added successfully");
      console.log("Event added successfully");
    } else {
      toast.error("Failed to add event");
      console.error("Failed to add event");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          action=""
          className="mx-auto grid w-full max-w-md gap-6 "
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <div className="flex gap-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event Name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="organizer_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Organizer Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Organizer Name" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event Location" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Event Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event Address" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-2">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-auto justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon />
                      {field.value
                        ? new Date(field.value).toLocaleDateString()
                        : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DayPicker
                      className="p-3"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            name="time"
            control={form.control}
            render={({ field }) => {
              const parseTimeString = (timeStr: string): TimeValue => {
                if (!timeStr) {
                  return { hour: "", minute: "", period: "" };
                }
                const [time, period] = timeStr.split(" ");
                const [hour, minute] = time.split(":");
                const obj = {
                  hour: hour,
                  minute: minute,
                  period: period,
                };
                console.log("Parsed time string", obj);
                return {
                  hour: hour, // Keep as string
                  minute: minute,
                  period: period,
                };
              };

              return (
                <FormItem>
                  <FormLabel>Event Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      value={parseTimeString(field.value)}
                      onChange={(timeValue) => {
                        field.onChange(timeValue);
                      }}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="event_type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EventType.map((t, i) => (
                      <SelectItem key={i} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding Event..." : "Add Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddEventForm;

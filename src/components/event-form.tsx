"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema, EventSchemaType, EventType } from "@/lib/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker";
import TimePicker from "./ui/time-picker";
import { DefaultFormValues, TimeValue } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import GradientButton from "./gradient-button";
import "react-day-picker/style.css";

type EventFormProps = {
  defaultValues: DefaultFormValues;
  onSubmit: (data: EventSchemaType, userId: string, eventId: string) => void;
  buttonText: string;
  eventId?: string;
};

const EventForm = ({
  defaultValues,
  onSubmit,
  buttonText,
  eventId = "0",
}: EventFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const form = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
    defaultValues: defaultValues,
  });

  const onFormSubmit: SubmitHandler<EventSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      if (!session?.user?.id) {
        toast.error("User not found");
        return;
      }

      await onSubmit(data, session.user.id, eventId);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("is loading is ", isLoading);
  }, [isLoading]);

  return (
    <Form {...form}>
      <form
        action=""
        className="mx-auto grid w-full max-w-md gap-6 mt-4"
        onSubmit={form.handleSubmit(onFormSubmit)}
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
                    className={cn("w-auto justify-start text-left font-normal")}
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
                hour: hour,
                minute: minute,
                period: period,
              };
            };

            const { hour, minute, period } = parseTimeString(field.value);

            return (
              <FormItem>
                <FormLabel>Event Time</FormLabel>
                <FormControl>
                  <TimePicker
                    // value={parseTimeString(field.value)}
                    h={hour}
                    m={minute}
                    p={period}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <GradientButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            buttonText
          )}
        </GradientButton>
      </form>
    </Form>
  );
};

export default EventForm;

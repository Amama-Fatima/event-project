'use client'

import toast from "react-hot-toast";
import { EventSchemaType } from "./schema";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addEvent = async (data: EventSchemaType, userId: string, eventId: string) => {
  console.log('e')
  const body = {
    eventData: data,
    userId: userId,
  };
  const response = await fetch("/api/event", {
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
};

export const updateEvent = async (data: EventSchemaType, userId: string, eventId: string) => {
  const body = {
    eventData: data,
    userId: userId,
    eventId: eventId,
  };
  const response = await fetch("/api/event", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    toast.success("Event updated successfully");
    console.log("Event updated successfully");
  } else {
    toast.error("Failed to update event");
    console.error("Failed to update event");
  }
}


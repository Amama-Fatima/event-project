import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EventSchemaType } from './schema';
import toast from 'react-hot-toast';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addEvent = async (data: EventSchemaType, userId: string) => {
  const body = {
    eventData: data,
    userId: userId,
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
};
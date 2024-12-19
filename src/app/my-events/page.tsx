import EventsTable from "@/components/events-table";
import { authOptions } from "@/lib/auth";
import { Event } from "@/lib/types";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";
import Link from "next/link";
import React from "react";

const MyEventsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const getUserEvents = (userId: string): Event[] => {
    try {
      const csvFilePath = path.join(process.cwd(), "data", "events.csv");

      if (!fs.existsSync(csvFilePath)) {
        return [];
      }

      const fileContent = fs.readFileSync(csvFilePath, "utf-8");

      const lines = fileContent
        .split("\n")
        .filter((line) => line.trim() !== "");

      const headers = lines[0].split(",");

      const events = lines
        .slice(1) // Skip header row
        .map((line) => {
          const values = line.split(",");
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || "";
            return obj;
          }, {} as Record<string, string>) as Event;
        })
        .filter((event) => event.user_id === userId);

      return events;
    } catch (error) {
      console.error("Error reading events:", error);
      return [];
    }
  };

  const myEvents: Event[] = getUserEvents(userId);
  console.log(myEvents);

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/add-event"
        className="inline-block mb-4 text-blue-600 hover:text-blue-700 font-medium"
      >
        Create Event
      </Link>
      <EventsTable events={myEvents} />
    </div>
  );
};

export default MyEventsPage;

import EventsTable from "@/components/events-table";
import { authOptions } from "@/lib/auth";
import { Event } from "@/lib/types";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import Link from "next/link";
import React from "react";

const MyEventsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return <div>Unauthorized</div>;
  }

  let userEvents: Event[] = [];
  try {
    const csvFilePath = path.join(process.cwd(), "data", "events.csv");

    if (!fs.existsSync(csvFilePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(csvFilePath, "utf-8");

    // Parse the CSV file
    const records: Event[] = parse(fileContent, {
      columns: true, // Automatically use the first row as headers
      skip_empty_lines: true, // Ignore empty lines
    });

    // Filter records by userId
    userEvents = records.filter((event) => event.user_id === userId);
  } catch (error) {
    console.error("Error reading events:", error);
    return [];
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/add-event"
        className="inline-block mb-4 text-blue-600 hover:text-blue-700 font-medium"
      >
        Create Event
      </Link>
      <EventsTable events={userEvents} />
    </div>
  );
};

export default MyEventsPage;

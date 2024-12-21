import React from "react";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Event } from "@/lib/types";
import PageDescriptionHeader from "@/components/layout/heading";
import EventCard from "@/components/event-card";
import EventTypeFilter from "@/components/event-type-filter";
import DateFilter from "@/components/date-filter";

type EventInCityPage = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ type?: string; date?: string }>;
};

const EventInCityPage = async ({ params, searchParams }: EventInCityPage) => {
  const { name } = await params;
  const { type: eventType, date: dateFilter } = await searchParams;

  const decodedName = decodeURIComponent(name);

  const csvFilePath = path.join(process.cwd(), "data", "events.csv");
  let filteredEvents: Event[] = [];

  try {
    if (!fs.existsSync(csvFilePath)) {
      console.error("Events file not found.");
    } else {
      const fileContent = fs.readFileSync(csvFilePath, "utf-8");

      const allEvents = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
      }) as Event[];

      // Filter events based on city, event type, and date
      filteredEvents = allEvents.filter((event) => {
        const cityMatch = event.address
          .toLowerCase()
          .includes(decodedName.toLowerCase());

        const typeMatch = !eventType || event.event_type === eventType;

        let dateMatch = true;
        if (dateFilter) {
          const eventDate = event.date.split("T")[0];
          dateMatch = eventDate === dateFilter;
        }

        return cityMatch && typeMatch && dateMatch;
      });
    }
  } catch (error) {
    console.error("Error reading events:", error);
  }

  return (
    <section className="container mt-6 p-6 flex flex-col gap-10">
      <PageDescriptionHeader
        title="Events"
        description="Check out the upcoming events!"
      />
      <EventTypeFilter />
      <DateFilter />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventInCityPage;

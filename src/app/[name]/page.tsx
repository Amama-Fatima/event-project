import React from "react";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Event } from "@/lib/types";
import PageDescriptionHeader from "@/components/layout/heading";
import EventCard from "@/components/event-card";
import EventTypeFilter from "@/components/event-type-filter";
import DateFilter from "@/components/date-filter";
import NameFilter from "@/components/name-filter";

type EventInCityPage = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ type?: string; date?: string; name?: string }>;
};

const EventInCityPage = async ({ params, searchParams }: EventInCityPage) => {
  const { name } = await params;
  const {
    type: eventType,
    date: dateFilter,
    name: nameFilter,
  } = await searchParams;

  console.log("name is filter is", nameFilter);

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

        let nameMatch = true;
        if (nameFilter) {
          nameMatch = event.name
            .toLowerCase()
            .includes(nameFilter.toLowerCase());
        }

        return cityMatch && typeMatch && dateMatch && nameMatch;
      });
    }
  } catch (error) {
    console.error("Error reading events:", error);
  }

  console.log("filtered events", filteredEvents);

  return (
    <section className="container mt-6 p-6 flex flex-col gap-10">
      <PageDescriptionHeader
        title="Events"
        description="Check out the upcoming events!"
      />
      <div className="flex flex-col gap-2 self-end">
        <h3>Filters</h3>
        <div className="flex gap-2">
          <EventTypeFilter />
          <DateFilter />
          <NameFilter />
        </div>
      </div>
      {filteredEvents.length === 0 && (
        <p className="text-foreground text-center">No events found</p>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventInCityPage;

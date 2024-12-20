import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import EventCard from "@/components/event-card";
import { Event } from "@/lib/types";
import PageDescriptionHeader from "@/components/layout/heading";

export default function Home() {
  let allEvents = [] as Event[];
  try {
    const csvFilePath = path.join(process.cwd(), "data", "events.csv");

    if (!fs.existsSync(csvFilePath)) {
      console.error("Events file not found.");
    }

    const fileContent = fs.readFileSync(csvFilePath, "utf-8");

    allEvents = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }) as Event[];
  } catch (error) {
    console.error("Error reading events:", error);
    return [];
  }
  return (
    <section className="container mt-6 p-6 flex flex-col gap-10">
      <PageDescriptionHeader
        title="Events"
        description="Check out the upcoming events!"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allEvents.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </section>
  );
}

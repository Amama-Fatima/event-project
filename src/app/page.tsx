// import fs from "fs";
// import path from "path";
// import { parse } from "csv-parse/sync";
// import EventCard from "@/components/event-card";
// import { Event } from "@/lib/types";
// import PageDescriptionHeader from "@/components/layout/heading";

import SearchInput from "@/components/search-input";

export default function Home() {
  // let allEvents = [] as Event[];
  // try {
  //   const csvFilePath = path.join(process.cwd(), "data", "events.csv");

  //   if (!fs.existsSync(csvFilePath)) {
  //     console.error("Events file not found.");
  //   }

  //   const fileContent = fs.readFileSync(csvFilePath, "utf-8");

  //   allEvents = parse(fileContent, {
  //     columns: true,
  //     skip_empty_lines: true,
  //   }) as Event[];
  // } catch (error) {
  //   console.error("Error reading events:", error);
  //   return [];
  // }
  return (
    <section className="container mt-6 p-6 flex flex-col gap-10">
      {/* <PageDescriptionHeader
        title="Events"
        description="Check out the upcoming events!"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allEvents.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div> */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
              Search City
            </h1>
            <p className="text-gray-400 text-lg">Find your next event</p>
          </div>

          <div className="w-full transform transition-all">
            <SearchInput />
          </div>
        </div>
      </div>
    </section>
  );
}

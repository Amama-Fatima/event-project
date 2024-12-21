// import fs from "fs";
// import path from "path";
// import { parse } from "csv-parse/sync";
// import EventCard from "@/components/event-card";
// import { Event } from "@/lib/types";
// import PageDescriptionHeader from "@/components/layout/heading";

import SearchInput from "@/components/search-input";

export default function Home() {
  return (
    <section className="container mt-6 p-6 flex flex-col gap-10">
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

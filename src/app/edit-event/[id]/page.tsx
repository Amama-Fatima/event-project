import React from "react";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { DefaultFormValues, Event } from "@/lib/types";
import PageDescriptionHeader from "@/components/layout/heading";
import EventForm from "@/components/event-form";
import { updateEvent } from "@/lib/helpers";

type EditEventPageProps = {
  params: { id: string };
};

const EditEvent = async ({ params }: EditEventPageProps) => {
  const { id } = await params;

  // Read and parse the CSV file
  const csvFilePath = path.join(process.cwd(), "data", "events.csv");
  const fileContent = fs.readFileSync(csvFilePath, "utf-8");
  const records: Event[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Find the event with matching ID
  const event = records.find((record: Event) => record.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  // Transform the event data to match your form's expected format
  const defaultValues: DefaultFormValues = {
    name: event.name || "",
    location: event.location || "",
    date: event.date ? new Date(event.date) : undefined,
    time: event.time || "",
    address: event.address || "",
    organizer_name: event.organizer_name || "",
    event_type: ([
      "Conference",
      "Meeting",
      "Dining",
      "Studying",
      "Working",
      "Other",
    ].includes(event.event_type)
      ? event.event_type
      : "Conference") as
      | "Conference"
      | "Meeting"
      | "Dining"
      | "Studying"
      | "Working"
      | "Other",
  };

  return (
    <div>
      <PageDescriptionHeader
        title="Edit Event"
        description="Update event details"
      />
      <EventForm
        defaultValues={defaultValues}
        onSubmit={updateEvent}
        buttonText="Update Event"
        eventId={id}
      />
    </div>
  );
};

export default EditEvent;

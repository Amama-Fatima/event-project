import { Event } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

const TableHeaders = [
  "Name",
  "Date",
  "Time",
  "Location",
  "Address",
  "Organizer",
  "Type",
  "Actions",
];

const EventsTable = ({ events }: { events: Event[] }) => {
  const hasEvents = events.length > 0;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-secondary min-h-[400px]">
      <table className="w-full text-sm">
        <thead className="bg-gray-900/50 border-b border-secondary">
          <tr>
            {TableHeaders.map((header, i) => (
              <th
                key={i}
                className="whitespace-nowrap px-6 py-4 text-left text-primary font-bold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {hasEvents ? (
            events.map((event) => (
              <tr
                key={event.id}
                className="bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-colors hover:bg-gray-800"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-100">{event.name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                  {event.time}
                </td>
                <td className="px-6 py-4 text-gray-300">{event.location}</td>
                <td className="px-6 py-4 text-gray-300">{event.address}</td>
                <td className="px-6 py-4">
                  <div className="text-gray-300">{event.organizer_name}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      getEventTypeStyles(event.event_type)
                    )}
                  >
                    {event.event_type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/edit-event/${event.id}`}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                  >
                    <Pencil size={14} />
                    <span className="sr-only">Edit Event</span>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={TableHeaders.length} className="text-center">
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-400 mb-4">No events found</p>
                  <Link
                    href="/add-event"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                    Add a new event and get started
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to get event type badge styles
const getEventTypeStyles = (eventType: string) => {
  switch (eventType.toLowerCase()) {
    case "conference":
      return "bg-blue-400/10 text-blue-400";
    case "workshop":
      return "bg-purple-400/10 text-purple-400";
    case "webinar":
      return "bg-green-400/10 text-green-400";
    case "meetup":
      return "bg-yellow-400/10 text-yellow-400";
    default:
      return "bg-gray-400/10 text-gray-400";
  }
};

export default EventsTable;

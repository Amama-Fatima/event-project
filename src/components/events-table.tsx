import { Event } from "@/lib/types";
import { Pencil } from "lucide-react";
import Link from "next/link";

const EventsTable = ({ events }: { events: Event[] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Time</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Address</th>
            <th className="px-4 py-3 text-left">Organizer</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id} className=" hover:bg-gray-800 bg-gray-900">
              <td className="px-4 py-3 font-medium">{event.name}</td>
              <td className="px-4 py-3">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">{event.time}</td>
              <td className="px-4 py-3">{event.location}</td>
              <td className="px-4 py-3">{event.address}</td>
              <td className="px-4 py-3">{event.organizer_name}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded-full">
                  {event.event_type}
                </span>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/events/edit/${event.id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Pencil size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;

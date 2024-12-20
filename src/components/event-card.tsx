import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Card } from "./ui/card";
import { Event } from "@/lib/types";

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8678F9] to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-all duration-500" />

      <Card className="relative p-6 rounded-lg border-0 flex flex-col gap-4">
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#8678F9] to-purple-600 text-white">
            {event.event_type}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2">{event.name}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8678F9]" />
            <span className="text-muted-foreground">
              {formatDate(event.date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="text-foreground">{event.time}</span>
          </div>

          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="w-4 h-4 text-[#8678F9]" />
            <span className="text-foreground">{event.location}</span>
          </div>

          <div className="col-span-2 pl-6 text-gray-400 text-sm">
            {event.address}
          </div>

          <div className="flex items-center gap-2 col-span-2">
            <User className="w-4 h-4 text-purple-500" />
            <span className="text-foreground">
              Organized by {event.organizer_name}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventCard;

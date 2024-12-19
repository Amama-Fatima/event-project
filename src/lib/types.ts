export type TimeValue = {
    hour: string;
    minute: string;
    period: string;
}

export type Event = {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  address: string;
  organizer_name: string;
  event_type: string;
  user_id: string;
};

export type DefaultFormValues = {
    name: string;
    location: string;
    date: Date | undefined;
    time: string;
    address: string;
    organizer_name: string;
    event_type:
      | "Conference"
      | "Meeting"
      | "Dining"
      | "Studying"
      | "Working"
      | "Other";
  };
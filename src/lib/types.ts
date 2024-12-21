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

export type EventType = 'Conference' | 'Meeting' | 'Dining' | 'Studying' | 'Working' | 'Other';


export type DefaultFormValues = {
    name: string;
    location: string;
    date: Date | undefined;
    time: string;
    address: string;
    organizer_name: string;
    event_type: EventType
  };


  export type  SearchState = {
    city: string
    eventType: EventType | null
    dateFilter: Date | null
    eventName: string | null
    setCity: (city: string) => void
    setEventType: (type: EventType | null) => void
    setDateFilter: (date: Date) => void
    setEventName: (name: string) => void
    resetEventType: () => void
    resetDateFilter: () => void
    resetEventName: () => void
    reset: () => void
  }
import EventForm from "@/components/event-form";
import PageDescriptionHeader from "@/components/layout/heading";
import { addEvent } from "@/lib/helpers";
import { DefaultFormValues } from "@/lib/types";

const AddEventPage = () => {
  const defaultValues = {
    name: "",
    location: "",
    date: undefined,
    time: "",
    address: "",
    organizer_name: "",
    event_type: "Conference",
  };
  return (
    <div>
      <PageDescriptionHeader
        title="Add Event"
        description="Create an exciting new event!"
      />
      <EventForm
        defaultValues={defaultValues as DefaultFormValues}
        onSubmit={addEvent}
        buttonText="Add Event"
      />
    </div>
  );
};

export default AddEventPage;

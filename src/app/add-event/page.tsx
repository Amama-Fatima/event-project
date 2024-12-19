import AddEventForm from "@/components/add-event-form";
import PageDescriptionHeader from "@/components/layout/heading";

const AddEventPage = () => {
  return (
    <div>
      <PageDescriptionHeader
        title="Add Event"
        description="Create an exciting new event!"
      />
      <AddEventForm />
    </div>
  );
};

export default AddEventPage;

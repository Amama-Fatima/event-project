import AddEventForm from "@/components/add-event-form";
import PageDescriptionHeader from "@/components/layout/heading";

const AddEventPage = () => {
  return (
    <div>
      <PageDescriptionHeader
        title="Add Event"
        description="Create a new exciting event!"
      />
      <AddEventForm />
    </div>
  );
};

export default AddEventPage;

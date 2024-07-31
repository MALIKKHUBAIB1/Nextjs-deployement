import { useRouter } from "next/router";
import NewMeetups from "../../components/meetups/NewMeetupForm";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(meetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    if (response.ok) {
      router.push("/");
    }
  }
  return <NewMeetups onAddMeetup={addMeetupHandler} />;
}
export default NewMeetupPage;

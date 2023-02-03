import { listItemInterface } from "@/utils/commonInterfaces";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const MeetupForm = () => {
    const router = useRouter();
  const addFormData = async (data: listItemInterface) => {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push('/')
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
    <Head>
      <title>Create new meetup</title>
      <meta name="description" content="Create a new meetup for any place."/>
    </Head>
    <NewMeetupForm onAddMeetup={addFormData} />
    </>
  )
};

export default MeetupForm;

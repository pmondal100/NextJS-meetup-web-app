import MeetupList from "@/components/meetups/MeetupList";
import { listInterface } from "@/utils/commonInterfaces";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function Home(props: listInterface) {
  return (
    <>
      <Head>
        <title>NextJS Meetup Application</title>
        <meta
          name="description"
          content="This is a web application that renders a list of meetups from the database."
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://mondalprabhakar29:shatenks@cluster0.rchayli.mongodb.net/Discord?retryWrites=true&w=majority"
    );
    const db = client.db();
    const collectionRef = db.collection("meetups");
    const meetups = await collectionRef.find().toArray();
    client.close();
    return {
      props: {
        meetups: meetups.map((currEle) => {
          return {
            title: currEle.title,
            address: currEle.address,
            image: currEle.image,
            description: currEle.description,
            id: currEle._id.toString(),
          };
        }),
      },
      revalidate: 1,
    };
  } catch (e) {
    return { notFound: true };
  }
};

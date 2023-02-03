import MeetupDetails from "@/components/meetups/MeetupDetails";
import Head from "next/head";
import { listItemInterface } from "@/utils/commonInterfaces";
import { Context } from "vm";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetailsPage = (props: listItemInterface) => {
  return (
    <>
    <Head><title>{props.title}</title><meta name="description" content={props.content} /></Head>
      <MeetupDetails
        title={props.title}
        id={props.id}
        image={props.image}
        content={props.content}
        address={props.address}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://mondalprabhakar29:shatenks@cluster0.rchayli.mongodb.net/Discord?retryWrites=true&w=majority"
    );
    const db = client.db();
    const collectionRef = db.collection("meetups");
    //@ts-ignore
    const meetups = await collectionRef.find({}, { _id: 1 }).toArray();
    client.close();
    return {
      fallback: "blocking",
      paths: meetups.map((meetup) => {
        return {
          params: {
            meetupId: meetup._id.toString(),
          },
        };
      }),
    };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticProps = async (context: Context) => {
  const meetupId = context.params.meetupId;
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://mondalprabhakar29:shatenks@cluster0.rchayli.mongodb.net/Discord?retryWrites=true&w=majority"
    );
    const db = client.db();
    const collectionRef = db.collection("meetups");
    const meetup = await collectionRef.findOne({ _id: new ObjectId(meetupId) });
    client.close();
    return {
      props: {
        title: meetup?.title,
        id: meetupId,
        image: meetup?.image,
        content: meetup?.description,
        address: meetup?.address,
      },
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
};

export default MeetupDetailsPage;

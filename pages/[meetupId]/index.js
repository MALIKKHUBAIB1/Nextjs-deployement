import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import classes from "./meetupdetail.module.css";
function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetups.title}</title>
        <meta name="description" content={props.meetups.description} />
      </Head>
      <section className={classes.detail}>
        <img src={props.meetups.image} />
        <h1>{props.meetups.title}</h1>
        <address>{props.meetups.address}</address>
        <p>{props.meetups.description}</p>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://khubaib9221:mongo123@cluster0.xr3ng0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("nextjs-meetup");
  const meetupCollection = db.collection("meetup");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray(); // Fetch only _id
  const paths = meetups.map((meetup) => {
    return { params: { meetupId: meetup._id.toString() } };
  });
  client.close();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://khubaib9221:mongo123@cluster0.xr3ng0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("nextjs-meetup");
  const meetupCollection = db.collection("meetup");
  const meetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetups: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}
export default MeetupDetailPage;

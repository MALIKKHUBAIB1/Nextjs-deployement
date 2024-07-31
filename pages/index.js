import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "first meetups",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    description: "A first meetup",
    address: "vill bagahwa city newYork City ",
  },
  {
    id: "m2",
    title: "first meetups",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    description: "A first meetup",
    address: "vill bagahwa city newYork City ",
  },
  {
    id: "m3",
    title: "first meetups",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    description: "A first meetup",
    address: "vill bagahwa city newYork City ",
  },
];
function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
//it will regenrate the page for every incoming request

// export function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  // Api call or fetched Data
  const client = await MongoClient.connect(
    "mongodb+srv://khubaib9221:mongo123@cluster0.xr3ng0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db("nextjs-meetup");
  const meetupCollection = db.collection("meetup");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}
export default HomePage;

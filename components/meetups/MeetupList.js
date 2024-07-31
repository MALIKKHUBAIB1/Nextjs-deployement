import Head from "next/head";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <>
      <Head>
        <title>All Meetups</title>
        <meta name="description" content="All Meetups" />
      </Head>
      <ul className={classes.list}>
        {props.meetups.map((meetup) => (
          <MeetupItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
          />
        ))}
      </ul>
    </>
  );
}

export default MeetupList;

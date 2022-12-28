import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

/* export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  // fetch data from an API

  return {
    props: { meetups: DUMMY_MEETUPS },
  };
} */

export async function getStaticProps() {
  //fetch data from API
  //need to return an object
  const client = await MongoClient.connect(
    "mongodb+srv://mars:1234@reactudemy.4yyddfw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600,
  };
}

export default HomePage;

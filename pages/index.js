import Head from 'next/head';
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";


const HomePage = (props) => {


  return (
      <>
      <Head>
          <title>React Meetups</title>
          <meta name='description' content='Browse a huge list of meetups' />
      </Head>
      <MeetupList meetups={props.meetups} />
      </>
  );
};


// export async function getServerSideProps (context) {
//     const req = context.req;
//     const res = context.res;

//     return{
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };


export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://khayal:xeyal123321@cluster0.0pazmth.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupCollection = db.collection('meetups')

        const meetups = await meetupCollection.find().toArray();

        client.close();

    return{
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
};

export default HomePage;

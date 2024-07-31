import { MongoClient } from "mongodb";

async function handleMeetup(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);

    let client;

    try {
      client = await MongoClient.connect("mongodb://localhost:27017");
      const db = client.db("nextjs-meetup"); // Use your actual database name
      const meetupCollection = db.collection("meetup");

      const result = await meetupCollection.insertOne(data);
      // console.log(result);

      res.status(201).json({ message: "Meetup inserted successfully" });
    } catch (err) {
      console.error("Failed to insert meetup", err);
      res.status(500).json({ message: "Failed to insert meetup" });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" }); // Handle other HTTP methods
  }
}

export default handleMeetup;

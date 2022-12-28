import {MongoClient} from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://mars:1234@reactudemy.4yyddfw.mongodb.net/meetups?retryWrites=true&w=majority", {
        method: "GET"
      }
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    // const result = await meetupsCollection.
  }
}

export default handler;
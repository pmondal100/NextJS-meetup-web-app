import { MongoClient } from "mongodb";

const handler = async (req: any, res: any) => {
  try {
    if (req.method === "POST") {
      const data = req.body;
      const client = await MongoClient.connect(
        "mongodb+srv://mondalprabhakar29:shatenks@cluster0.rchayli.mongodb.net/Discord?retryWrites=true&w=majority"
      );
      const db = client.db();
      const collectionRef = db.collection("meetups");
      await collectionRef.insertOne(data);
      res.status(201).json({ message: "Meetup Created." });
      client.close();
    } else {
      throw new Error("Request method not correct.");
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e });
  }
};

export default handler;

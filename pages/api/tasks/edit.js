import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    const { taskId, text } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();

    const tasksCollection = db.collection("tasks");

    await tasksCollection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { text: text } }
    );

    client.close();
    res.status(200).json({ message: "Task updated." });
  }
}

export default handler;

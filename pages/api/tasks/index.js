import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();

    const tasksCollection = db.collection("tasks");
    const result = await tasksCollection.insertOne(data);

    client.close();
    res
      .status(201)
      .json({ message: "Task inserted.", insertedId: result.insertedId });
  }

  if (req.method === "DELETE") {
    const taskId = req.body.taskId;

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();

    const tasksCollection = db.collection("tasks");
    await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });

    client.close();
    res.status(200).json({ message: "Task deleted." });
  }

  if (req.method === "PUT") {
    const { taskId, completed } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db();

    const tasksCollection = db.collection("tasks");
    await tasksCollection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { completed: completed } }
    );

    client.close();
    res.status(200).json({ message: "Task updated." });
  }
}

export default handler;

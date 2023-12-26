import React, { useState } from "react";
import { MongoClient } from "mongodb";

const CompletedTasks = ({ fetchedTasks }) => {
  const [completedTasks, setCompletedTasks] = useState(fetchedTasks);

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Completed Tasks</h1>
      <ul className="grid gap-4">
        {completedTasks.map((task) => (
          <li key={task._id} className="bg-gray-100 rounded-lg p-4 shadow-md ">
            <h2 className="text-lg font-medium mb-2 overflow-ellipsis overflow-hidden">
              {task.text}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db();
  const tasksCollection = db.collection("tasks");
  const tasks = await tasksCollection.find({ completed: true }).toArray();
  client.close();
  return {
    props: {
      fetchedTasks: JSON.parse(JSON.stringify(tasks)),
    },
  };
}

export default CompletedTasks;

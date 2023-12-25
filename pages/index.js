import React, { useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import axios from "axios";

import TasksList from "../components/TasksList";
import AddTaskForm from "../components/AddTaskForm";

export default function HomePage({ fetchedTasks }) {
  const [tasks, setTasks] = useState(fetchedTasks);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = async (newTaskText) => {
    const response = await axios.post("/api/tasks", {
      text: newTaskText,
      completed: false,
    });
    const data = response.data;
    setTasks((oldTasks) => [
      ...oldTasks,
      { _id: data.insertedId, text: newTaskText, completed: false },
    ]);
  };

  const handleMarkCompleted = async (taskId) => {
    // find returns 1st object here satisfying the condition
    const taskToComplete = tasks.find((task) => task._id === taskId);
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? { ...task, completed: !taskToComplete.completed }
        : task
    );
    setTasks(updatedTasks);

    const response = await axios.put("/api/tasks", {
      taskId: taskId,
      completed: !taskToComplete.completed,
    });
    const data = response.data;
    console.log(data);
  };

  const handleDelete = async (taskId) => {
    setTasks((oldTasks) => {
      return oldTasks.filter((task) => task._id != taskId);
    });
    const response = await axios.delete("/api/tasks", {
      data: { taskId: taskId },
    });

    const data = response.data;
  };

  const handleEdit = async (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    // console.log(taskToEdit);
    setEditingTask(taskToEdit);
  };

  const handleUpdateTask = async (taskId, newTaskText) => {
    // First, update the task in the local state
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task._id === taskId ? { ...task, text: newTaskText } : task
      )
    );
    await axios.put(`/api/tasks/edit`, {
      taskId: taskId,
      text: newTaskText,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>To-Do App</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        />
      </Head>
      <h1 className="text-2xl font-bold mb-4">My To-Do List</h1>
      <AddTaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
      />
      <TasksList
        tasks={tasks}
        onMarkCompleted={handleMarkCompleted}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

// Yeh function server side pe run hota hai jab page load hota hai
export async function getServerSideProps() {
  // MongoClient se MongoDB server se connect kar rahe hai
  const client = await MongoClient.connect(process.env.MONGODB_URL);

  // Database ka instance le rahe hai
  const db = client.db();

  // 'tasks' naam ke collection ko access kar rahe hai
  const tasksCollection = db.collection("tasks");

  // .find: select document/object in collection; .toArray(): convert that to array
  const tasks = await tasksCollection.find().toArray();

  // MongoDB server se connection close kar rahe hai
  client.close();
  return {
    props: {
      // Next.js ko data ko network transmission ke liye serialize karna padta hai. MongoDB ke ObjectId ko seedha serialize nahi kiya ja sakta.
      // Isliye, hum JSON.parse(JSON.stringify(tasks)) ka use karke ObjectId ko ek serializable string format me convert karte hai.
      fetchedTasks: JSON.parse(JSON.stringify(tasks)),
    },
  };
}

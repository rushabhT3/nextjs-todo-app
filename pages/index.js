import React, { useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import TasksList from "../components/TasksList";
import AddTaskForm from "../components/AddTaskForm";

export default function HomePage({ fetchedTasks }) {
  const [tasks, setTasks] = useState(fetchedTasks);

  const handleAddTask = async (newTaskText) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        text: newTaskText,
        completed: false,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    // console.log(data);
    setTasks((oldTasks) => [
      ...oldTasks,
      { id: data.insertedId, text: newTaskText, completed: false },
    ]);
  };

  // taskId got from below level
  const handleMarkCompleted = async (taskId) => {
    const taskToComplete = tasks.find((task) => task._id === taskId);
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? { ...task, completed: !taskToComplete.completed }
        : task
    );
    setTasks(updatedTasks);

    const response = await fetch("/api/tasks", {
      method: "PUT",
      body: JSON.stringify({
        taskId: taskId,
        completed: !taskToComplete.completed,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  };

  const handleDelete = async (taskId) => {
    setTasks((oldTasks) => {
      return oldTasks.filter((task) => task._id != taskId);
    });
    const response = await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ taskId: taskId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    // console.log(data);
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
      <AddTaskForm onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onMarkCompleted={handleMarkCompleted}
        onDelete={handleDelete}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db();

  const tasksCollection = db.collection("tasks");
  const tasks = await tasksCollection.find().toArray();

  client.close();
  // console.log(JSON.parse(JSON.stringify(tasks)));
  return {
    props: {
      fetchedTasks: JSON.parse(JSON.stringify(tasks)),
    },
  };
}

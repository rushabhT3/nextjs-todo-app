import React, { useState } from "react";
import Head from "next/head";

import TasksList from "../components/TasksList";
import AddTaskForm from "../components/AddTaskForm";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTaskText) => {
    setTasks((oldTasks) => [
      ...oldTasks,
      { id: Date.now(), text: newTaskText, completed: false },
    ]);
  };

  // taskId got from below level
  const handleMarkCompleted = (taskId) => {
    setTasks((oldTasks) => {
      return oldTasks.map((task) => {
        return task.id == taskId
          ? { ...task, completed: !task.completed }
          : task;
      });
    });
  };

  const handleDelete = (taskId) => {
    setTasks((oldTasks) => {
      return oldTasks.filter((task) => task.id != taskId);
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
      <AddTaskForm onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onMarkCompleted={handleMarkCompleted}
        onDelete={handleDelete}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";

const AddTaskForm = ({ onAddTask, editingTask, onUpdateTask }) => {
  const [newTaskText, setNewTaskText] = useState(
    editingTask ? editingTask.text : ""
  );

  useEffect(() => {
    setNewTaskText(editingTask ? editingTask.text : "");
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      console.log(editingTask);
      onUpdateTask(editingTask._id, newTaskText);
    } else {
      onAddTask(newTaskText);
    }
    setNewTaskText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between mt-4"
    >
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-4/5"
        placeholder="Add a new task"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;

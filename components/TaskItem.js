import React from "react";

const TaskItem = ({ task, onMarkCompleted, onDelete }) => {
  return (
    <li
      className={`flex items-center justify-between py-4 px-4 rounded-lg border border-gray-200 shadow-sm ${
        task.completed ? "line-through text-black-400 bg-black-100" : "bg-white"
      }`}
    >
      <span className="text-lg font-medium text-gray-700">{task.text}</span>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onMarkCompleted(task.id)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Mark Completed
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

import React from "react";
import TaskItem from "./TaskItem";

const TasksList = ({ tasks, onMarkCompleted, onEdit, onDelete }) => {
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <ul className="grid gap-4">
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onMarkCompleted={() => onMarkCompleted(task._id)}
              onEdit={() => onEdit(task._id)}
              onDelete={() => onDelete(task._id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default TasksList;

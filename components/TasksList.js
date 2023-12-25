import React from "react";
import TaskItem from "./TaskItem";

const TasksList = ({ tasks, onMarkCompleted, onEdit, onDelete }) => {
  return (
    <ul className="list-disc pl-8 mt-4">
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
  );
};

export default TasksList;

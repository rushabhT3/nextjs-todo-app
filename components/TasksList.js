import React from "react";
import TaskItem from "./TaskItem";

const TasksList = ({ tasks, onMarkCompleted, onDelete }) => {
  return (
    <ul className="list-disc pl-8 mt-4">
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onMarkCompleted={() => onMarkCompleted(task.id)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
    </ul>
  );
};

export default TasksList;
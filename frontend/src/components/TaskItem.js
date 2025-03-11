import React from 'react';

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="task">
      <span>{task.text}</span>
      <button className="delete-btn" onClick={() => onDelete(task._id)}>🗑</button>
    </div>
  );
};

export default TaskItem;

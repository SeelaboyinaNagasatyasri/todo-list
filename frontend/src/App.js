import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
   try { 
    const response = await fetch('http://localhost:5000/tasks');
    if(!response.ok){
       throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setTasks(data);
  } catch (error) {
    console.error("Failed to fetch tasks: ",error);
  }
};

  const addTask = async () => {
    if (!taskText.trim()) return;
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Task to be done..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
};

export default App;

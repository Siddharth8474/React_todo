import React, { useState } from 'react';
import './Component/Style/app.css'

const App = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [filter, setFilter] = useState('All'); // State for the current filter
  const [taskText, setTaskText] = useState(''); // State for task input

  // Add a new task
  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  // Delete a task by its ID
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Active') return !task.completed;
    return false;
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>

      {/* Task Form */}
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>

      {/* Task Filter */}
      <div>
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setFilter('Active')} className={filter === 'Active' ? 'active' : ''}>
          Active
        </button>
        <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>
          Completed
        </button>
      </div>

      {/* Task List */}
      <div>
        {filteredTasks.map((task) => (
          <div key={task.id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

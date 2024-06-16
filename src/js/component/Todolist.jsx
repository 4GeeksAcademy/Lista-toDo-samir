import React, { useState } from "react";

const initialState = {
  tasks: []
};

function App() {
  const [state, setState] = useState(initialState);

  function addTask(task) {
    setState({ tasks: [...state.tasks, task] });
  }

  function deleteTask(taskId) {
    setState({ tasks: state.tasks.filter(task => task.id!== taskId) });
  }

  function updateTask(taskId, task) {
    setState({ tasks: state.tasks.map(t => t.id === taskId? task : t) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const taskName = e.target.elements.task.value;
    if (!taskName) return;
    addTask({ id: Date.now(), name: taskName });
    e.target.elements.task.value = "";
  }

  return (
    <div>
      <h1>My To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="task" placeholder="Add a new task" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {state.tasks.map(task => (
          <li key={task.id}>
            <input
              type="text"
              value={task.name}
              onChange={e => updateTask(task.id, { ...task, name: e.target.value })}
            />
            <button type="button" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
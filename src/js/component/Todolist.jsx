import React, { useState } from "react";

const initialState = {
  tasks: []
};

function Todolist() {
  const [state, setState] = useState(initialState);
    function addTask(task) {
      setState((prevState => {
         return { tasks: [...prevState.tasks, { ...task, isEditable: false }] } }));
  }

  function deleteTask(taskId) {
    setState((prevState) => {
      return { tasks: prevState.tasks.filter((task) => task.id !== taskId) };
    });
  }

  function updateTask(taskId, task) {
    setState((prevState) => {
      return { tasks: prevState.tasks.map(t => t.id === taskId ? (t.isEditable ? { ...t, ...task } : t) : t) };
    });
  }
  
  function toggleTaskCompleted(taskId) {
    setState((prevState) => {
      return { tasks: prevState.tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t) };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const taskName = e.target.elements.task.value;
    if (!taskName) return;
    addTask({ id: Date.now(), name: taskName });
    e.target.elements.task.value = "";
  }

  return (
    <div className="fondo">
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-12">
            <h1>My To-Do List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row justify-content-center">
                <input type="text" name="task" placeholder="Add a new task" className="form-control" />
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 ">
            <ul className="list-group p-2">
              {state.tasks.map(task => (
                <li key={task.id} className="list-group-item px-3" >
                  <div className="d-flex flex-row">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleTaskCompleted(task.id)}
                      className=""
                      id="flexCheckDefault"
                    />
                    <input
                      type="text"
                      value={task.name}
                      onChange={e => updateTask(task.id, { ...task, name: e.target.value })}
                      className="form-control mx-3 form-control-plaintext border-bottom"

                    />
                    <button type="button" onClick={() => deleteTask(task.id)} className="btn btn-1">
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {state.tasks.length > 0 && (
              <div className="footer text-center">
                {state.tasks.filter(task => !task.isCompleted).length === 1 ? (
                  <p>1 remaining task</p>
                ) : (
                  <p>{state.tasks.filter(task => !task.isCompleted).length} remaining task</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todolist
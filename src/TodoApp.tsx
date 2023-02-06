import React, { useState, useEffect, useCallback, useReducer } from "react";

function todoReducer(state: any[], action: { type: any; task: any; index: any; }) {
  switch (action.type) {
    case "add":
      return [...state, { task: action.task, completed: false }];
    case "toggle":
      return state.map((todo, index) => {
        if (index === action.index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    default:
      return state;
  }
}

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(todoReducer, []);

  const handleSubmit = useCallback(
      (    event: { preventDefault: () => void; }) => {
      event.preventDefault();
      dispatch({
          type: "add", task,
          index: undefined
      });
      setTask("");
    },
    [task]
  );

  useEffect(() => {
    document.title = `Todos (${todos.filter(todo => !todo.completed).length})`;
  }, [todos]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={event => setTask(event.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={() => dispatch({
                type: "toggle", index,
                task: undefined
            })}
          >
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

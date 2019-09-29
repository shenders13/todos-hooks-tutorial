import React, { useEffect, useState } from "react";
import "./App.css";

// -----------------------------------------------------
// ------ Todo Component. Show an individual item ------
// -----------------------------------------------------

const Todo = ({ todo, handleTodoClick }) => (
  <li
    className={`todo ${todo.isComplete ? "complete" : ""}`}
    onClick={handleTodoClick}
  >
    {todo.name}
  </li>
);

// -----------------------------------------------------
// ---- Todos. Lists all the todos in a black card -----
// -----------------------------------------------------

const Todos = ({ todos, handleTodoClick }) => {
  return (
    <div className="todos">
      <h2 className="title">Todos</h2>
      {todos.map((todo, index) => (
        <Todo
          todo={todo}
          key={index}
          handleTodoClick={() => handleTodoClick(todo)}
        />
      ))}
    </div>
  );
};

// -----------------------------------------------------
// ----------------- App Component ---------------------
// -----------------------------------------------------

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://classy-snapper.glitch.me/todos")
      .then(response => {
        return response.json();
      })
      .then(json => {
        setTodos(json);
      });
  }, []);

  const handleTodoClick = todoToUpdate => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoToUpdate.id) {
        return {
          ...todo,
          isComplete: !todo.isComplete
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <Todos todos={todos} handleTodoClick={handleTodoClick} />
    </div>
  );
};

export default App;

import React from "react";
import "./App.css";

// -----------------------------------------------------
// ------ Todo Component. Show an individual item ------
// -----------------------------------------------------

const Todo = ({ todo }) => (
  <li className={`todo ${todo.isComplete ? "complete" : ""}`}>{todo.name}</li>
);

// -----------------------------------------------------
// ---- Todos. Lists all the todos in a black card -----
// -----------------------------------------------------

const Todos = ({ todos }) => {
  return (
    <div className="todos">
      <h2 className="title">Todos</h2>
      {todos.map((todo, index) => (
        <Todo todo={todo} key={index} />
      ))}
    </div>
  );
};

// -----------------------------------------------------
// ----------------- App Component ---------------------
// -----------------------------------------------------

const App = () => {
  getTodos(); // ping server & console.log the result.

  return (
    <div className="app">
      <Todos
        todos={[
          { id: 1, name: "Todo 1", isComplete: false },
          { id: 2, name: "Todo 2", isComplete: false },
          {
            id: 3,
            name: "Todo 3.",
            isComplete: false
          }
        ]}
      />
    </div>
  );
};

// -----------------------------------------------------
// ----------------- Helper functions ------------------
// -----------------------------------------------------

// getTodos pings the server and console.logs the response.

const getTodos = () => {
  fetch("https://classy-snapper.glitch.me/todos")
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("json: ", json);
    });
};

export default App;

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
          { id: 1, name: "7am. Wake up in the morning.", isComplete: false },
          { id: 2, name: "Be fresh, gotta go downstairs.", isComplete: false },
          {
            id: 3,
            name: "Have my bowl, gotta have cereal.",
            isComplete: false
          },
          { id: 4, name: "Get down to the bus stop", isComplete: true },
          { id: 5, name: "Choose my seat.", isComplete: false },
          { id: 6, name: "Look forward to the weekend.", isComplete: false }
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

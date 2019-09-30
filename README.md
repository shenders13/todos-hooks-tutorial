# Build a Todo app using React Hooks

## Getting set up

1. Clone this repo from your terminal. `git clone https://github.com/shenders13/todos-hooks-tutorial.git`

2. CD into the repo. `cd todos-hooks-tutorial`

3. Install node modules. `npm install`.

4. Run the local server. `npm start`.

5. Open [http://localhost:3000](http://localhost:3000)

You should see this:

<img src='https://res.cloudinary.com/small-change/image/upload/v1569728414/Screen_Shot_2019-09-28_at_8.29.13_PM_iudmo7.png' />



## The lesson (and it is a lesson)


### Part 1: useEffect hook.

We're going to fetch todos when the `<App/>` component mounts.

- Import `useEffect` from React like this: `import React, { useEffect } from "react";`.
- Fetch data when App component mounts:

```js
  useEffect(() => {
    console.log('Inside useEffect')
    getTodos(); // ping server & console.log the result.
  }, []);
```

Here are the [official docs for for useEffect](https://reactjs.org/docs/hooks-effect.html).

### Part 2: useState hook.

We're going to store the result of the fetch in local state using `useState`.

- Import `useState` from React like this: `import React, { useEffect, useState } from "react";`.
- Initialize local state using `useState` but update it when the GET request comes back:

```jsx
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

  return (
    <div className="app">
      <Todos todos={todos} />
    </div>
  );
};
```

### Part 3: Another example of updating state.

When you click on a todo, we want to toggle whether or not that todo is completed.

In `<App>`, define a `handleTodoClick` handler and pass it down into `<Todos>`

```jsx
  const handleTodoClick = (todo) => {
    console.log('handleTodoClick!')
  }

  return (
    <div className="app">
      <Todos todos={todos} handleTodoClick={handleTodoClick}/>
    </div>
  );
```

Then register the `handleTodoClick` handler as an `onClick` callback on the Todo.

```jsx
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
        <Todo todo={todo} key={index} handleTodoClick={()=>handleTodoClick(todo)} />
      ))}
    </div>
  );
};
```

Now lets add the business logic for `handleTodoClick`.

```jsx
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
```

## Extra content: GQL queries/mutations using React Hooks.

1. Define the query e.g. `CurrentUser` in `Jello/graphql/queries/query.graphql`.

```js
query CurrentUser {
  viewer {
    id
    email
    firstName
    fullName
    profilePhotoUrl
    customerFollowers {
      id
      customerId
      isStarred
    }
  }
}
```

2. Import the hook in component file.

```js
import { useCurrentUserQuery, CurrentUser } from 'Jello/graphql/__generated__/jello-operation-components'
```

3. Fire the query e.g. `FrontPlugin/components/NewOrEditTask/NewTask.tsx`

```jsx
const NewTask = () => {
  const currentUserQuery = useCurrentUserQuery()
  const currentUser: CurrentUser.Viewer | null =
    (currentUserQuery && currentUserQuery.data && currentUserQuery.data.viewer) || null
  ...
```

Using hooks for GQL queries takes the "fetching" outside of the JSX i.e. we don't need to do:

```jsx
    return (
      <CurrentUser>
        {currentUser => {
        ...
```



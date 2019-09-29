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


### Part 1: Fetch data using useEffect.

We're going to fetch todos when the `<App/>` component mounts.

- Import `useEffect` from React like this: `import React, { useEffect } from "react";`.
- Fetch data when App component mounts:

```js
  useEffect(() => {
    console.log('Inside useEffect')
    getTodos(); // ping server & console.log the result.
  }, []);
```

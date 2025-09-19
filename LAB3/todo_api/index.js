
const express = require("express");
const app = express();
const PORT = 3000;

//middleware that tells Express to parse incoming request bodies that are in JSON format text in the request body into a JavaScript object.This object is then attached to the request object as req.body.We need this for POST and PUT.
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build a RESTful API", completed: false },
];

//api routes
app.get("/todos", (req, res) => {
  res.json(todos); //sends the entire todo array back to the client
});

app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id); // The id from the URL (which is always a string) using req.params.id and immediately convert it into a number using parseInt()
  const todo = todos.find((t) => t.id === todoId);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

//POST (create) a new todo
app.post("/todos", (req, res) => {
  //Create a new ID
  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  const newTodo = {
    id: newId,
    task: req.body.task, //get task from the request body
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo); // 201 means "Created"
});

// PUT (update) a todo by ID
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === todoId);

  if (todo) {
    if (req.body.task !== undefined) todo.task = req.body.task;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    res.json(todo);
  } else {
    res.status(404).send("Todo not found.");
  }
});

// DELETE a todo by ID
app.delete("/todos/:id", (req, res) => {
  // Ensure the ID from the URL is converted to a number
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === todoId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1); //this splice method removes elements from an array
    res.status(204).send();
  } else {
    res.status(404).send("Todo not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

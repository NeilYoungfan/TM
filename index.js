import express from "express";
import path from "path";
import cors from "cors";
import tasksModule from path.join(__dirname, "tasks");
const app = express();
const port = 3000;

app.use(cors());

// Parse JSON API requests
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// File path relative to the app.js file
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

// GET all tasks
app.get("/tasks", (req, res) => {
  const tasks = tasksModule.getAllTasks();
  res.json(tasks);
});

// GET a specific task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasksModule.getTaskById(taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// POST a new task
app.post("/tasks", (req, res) => {
  const newTask = req.body;
  const createdTask = tasksModule.createTask(newTask);
  res.status(201).json(createdTask);
});

// PUT/update a task by ID
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  tasksModule.updateTask(taskId, updatedTask);

  res.json({ message: "Task updated successfully" });
});

// DELETE a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasksModule.deleteTask(taskId);

  res.json({ message: "Task deleted successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

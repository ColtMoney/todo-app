import express from "express";
import {
  getLists,
  getListById,
  getTodosByListId,
  createList,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./data.js";

const app = express();
const PORT = 5001;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS to allow frontend (port 3000) to access backend (port 5001)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// API Routes
app.get("/api/lists", (req, res) => {
  res.json(getLists());
});

app.get("/api/lists/:id", (req, res) => {
  const list = getListById(req.params.id);
  if (!list) return res.status(404).json({ error: "List not found" });
  res.json(list);
});

app.get("/api/lists/:id/todos", (req, res) => {
  const todos = getTodosByListId(req.params.id);
  res.json(todos);
});

app.post("/api/lists", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newList = createList(name);
  res.status(201).json(newList);
});

app.post("/api/lists/:id/todos", (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const list = getListById(req.params.id);
  if (!list) return res.status(404).json({ error: "List not found" });
  const newTodo = createTodo(req.params.id, title, completed);
  res.status(201).json(newTodo);
});

app.put("/api/todos/:id", (req, res) => {
  const updatedTodo = updateTodo(req.params.id, req.body);
  if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
  res.json(updatedTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  const success = deleteTodo(req.params.id);
  if (!success) return res.status(404).json({ error: "Todo not found" });
  res.status(204).send();
});

app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Try a different port or stop the conflicting process.`
      );
    } else {
      console.error(err);
    }
  });

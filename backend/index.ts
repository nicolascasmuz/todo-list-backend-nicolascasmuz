const express = require("express");
const cors = require("cors");
// import { createTask } from "./controllers/task";
import { findOrCreateAuth } from "./controllers/auth";

// const port = process.env.PORT || 3000;
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/api/auth", async (req, res) => {
  const user = await findOrCreateAuth(req.body);

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/api/todos", async (req, res) => {});

app.get("/api/todos", async (req, res) => {});

app.get("/api/todos/:id", async (req, res) => {});

app.put("/api/todos/:id", async (req, res) => {});

app.delete("/api/todos/:id", async (req, res) => {});

app.listen(port, console.log(`initialized on http://localhost:${port}`));

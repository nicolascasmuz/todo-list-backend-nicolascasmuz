const express = require("express");
const cors = require("cors");
import { createTask } from "../lib/controllers/task";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.post("/api/todos", async (req, res) => {});

app.get("/api/todos", async (req, res) => {});

app.get("/api/todos/:id", async (req, res) => {});

app.put("/api/todos/:id", async (req, res) => {});

app.delete("/api/todos/:id", async (req, res) => {});

app.listen(port, console.log(`initialized on http://localhost:${port}`));

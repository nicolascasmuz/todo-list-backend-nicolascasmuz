import { Task } from "../models/task";

async function createTask(body) {
  const task = await Task.createTask(body);

  if (task) {
    return task;
  } else {
    const newTask = await Task.pushTask(body);

    return newTask;
  }
}

async function getTasks(email) {
  const tasks = await Task.getTasks(email);

  return tasks;
}

export { createTask, getTasks };

import { api } from "../utils/api.js";
import { createTodo } from "../models/todo.js";

export function createList(id, name) {
  return { id, name, todos: [] };
}

export async function fetchTodosForList(id) {
  const response = await api.get(`/lists/${id}/todos`);
  const todos = response.data.map((todoData) =>
    createTodo(todoData.id, todoData.title, todoData.completed)
  );

  return todos;
}

export async function getLists() {
  const response = await api.get("/lists");
  return response.data;
}

import { api } from "../utils/api.js";

export function createTodo(id, title, completed) {
  return { id, title, completed };
}

export async function addTodo(id, newTodo) {
  const response = await api.post(`/lists/${id}/todos`, {
    title: newTodo.title,
    completed: newTodo.completed,
  });

  return response.data.id
}

export async function deleteTodo(id) {
  await api.delete(`/todos/${id}`);
}

export async function updateTodo(id, todo) {
  await api.put(`/todos/${id}`, todo);
}

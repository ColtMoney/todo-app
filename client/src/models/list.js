import { createTodo } from "../models/todo.js";

export function createList(id, name) {
  return { id, name, todos: [] };
}

export async function fetchTodosForList(list, api) {
  const response = await api.get(`/lists/${list.id}/todos`);
  list.todos = response.data.map((todoData) =>
    createTodo(todoData.id, todoData.title, todoData.completed)
  );
}

import { createTodo, Todo } from './todo.ts';
import { List } from '../viewmodels/useLists.ts';

export function createList(id: number, name: string): List {
  return { id, name, todos: [] };
}

export async function fetchTodosForList(id: number): Promise<Todo[]> {
  const response = await fetch(`/api/lists/${id}/todos`);

  if (!response.ok) {
    throw new Error('Failed to fetch todos for list');
  }

  const data: Todo[] = await response.json();

  return data.map((todoData) => createTodo(todoData.id, todoData.title, todoData.completed));
}

export async function getLists(): Promise<List[]> {
  const response = await fetch('/api/lists');
  if (!response.ok) {
    throw new Error('Failed to fetch lists');
  }
  return response.json();
}

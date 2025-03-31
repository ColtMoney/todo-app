import fetchData from '../../helpers/fetchData.ts';
import { List } from '../../types/api/list.ts';
import { Todo } from '../../types/api/todo.ts';

export async function fetchLists(): Promise<List[]> {
  const data = await fetchData<List[]>('/api/lists', 'GET');
  return data;
}

export async function fetchTodosForList(id: number): Promise<Todo[]> {
  const data = await fetchData<Todo[]>(`/api/lists/${id}/todos`, 'GET');
  return data;
}

export async function fetchAddTodo(id: number, title: string): Promise<Todo> {
  const body = JSON.stringify({ title, completed: false });
  const data = await fetchData<Todo>(`/api/lists/${id}/todos`, 'POST', body);
  return data;
}

export async function fetchDeleteTodo(id: number): Promise<void> {
  await fetchData(`/api/todos/${id}`, 'DELETE');
}

export async function fetchUpdateTodo(id: number, todo: Todo): Promise<void> {
  await fetchData(`/api/todos/${id}`, 'PUT', JSON.stringify(todo));
}

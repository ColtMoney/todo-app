export interface Todo {
  id: number | null;
  title: string;
  completed: boolean;
}

export function createTodo(id: number | null, title: string, completed: boolean): Todo {
  return { id, title, completed };
}

export async function addTodo(listId: number, title: string): Promise<number> {
  const response = await fetch(`/api/lists/${listId}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed: false }),
  });

  if (!response.ok) {
    throw new Error('Failed to add todo');
  }

  const data = await response.json();

  return data.id;
}

export async function deleteTodo(id: number | null): Promise<void> {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
}

export async function updateTodo(id: number | null, todo: Todo): Promise<void> {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
}

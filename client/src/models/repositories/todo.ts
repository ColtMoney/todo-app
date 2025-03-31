import errorHandler from '../../helpers/errorHandler.ts';
import { fetchAddTodo, fetchDeleteTodo, fetchUpdateTodo } from '../services/api.ts';
import { Todo } from '../../types/api/todo.ts';

export async function addTodo(id: number, title: string) {
  try {
    const rawTodo = await fetchAddTodo(id, title);
    return {
      id: rawTodo.id,
      title: rawTodo.title,
      completed: rawTodo.completed,
    };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function deleteTodo(id: number) {
  try {
    await fetchDeleteTodo(id);
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function updateTodo(id: number, todo: Todo) {
  try {
    await fetchUpdateTodo(id, todo);
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

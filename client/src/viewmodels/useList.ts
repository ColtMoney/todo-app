import {
  createTodo, addTodo, deleteTodo, updateTodo, Todo,
} from '../models/todo.ts';
import { List } from './useLists.ts';

export default function useList() {
  return {
    newTodoTitle: '' as string,
    async addTodo(list: List): Promise<void> {
      if (this.newTodoTitle.trim() === '') return;

      const newTodo: Todo = createTodo(null, this.newTodoTitle, false);
      newTodo.id = await addTodo(list.id, this.newTodoTitle);

      list.todos.push(newTodo);
      this.newTodoTitle = '';
    },

    async deleteTodo(list: List, todo: Todo) {
      const updatedList = { ...list, todos: list.todos.filter((t) => t.id !== todo.id) };
      Object.assign(list, updatedList);
      await deleteTodo(todo.id);
    },

    async updateTodo(todo: Todo) {
      await updateTodo(todo.id, todo);
    },
  };
}

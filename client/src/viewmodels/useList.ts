import { addTodo, deleteTodo, updateTodo } from '../models/repositories/todo.ts';
import { List } from '../types/api/list.ts';
import { Todo } from '../types/api/todo.ts';

export default function useList() {
  return {
    newTodoTitle: '' as string,
    async addTodo(list: List): Promise<void> {
      if (this.newTodoTitle.trim() === '') return;
      const newTodo = await addTodo(list.id, this.newTodoTitle);

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

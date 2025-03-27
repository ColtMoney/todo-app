import { createTodo, addTodo, deleteTodo, updateTodo } from "../models/todo.js";

export function useList() {
  return {
    newTodoTitle: "",
    async addTodo(list) {
      if (this.newTodoTitle.trim() === "") return;

      const newTodo = createTodo(null, this.newTodoTitle, false);
      newTodo.id = await addTodo(list.id, newTodo);

      list.todos.push(newTodo);
      this.newTodoTitle = "";
    },

    async deleteTodo(list, todo) {
      list.todos = list.todos.filter((t) => t.id !== todo.id);
      await deleteTodo(todo.id);
    },

    async updateTodo(todo) {
      await updateTodo(todo.id, todo);
    },
  };
}

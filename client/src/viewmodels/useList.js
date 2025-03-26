import { createTodo } from "../models/todo.js";

export function useList(list, api) {
  return {
    newTodoTitle: "",
    addTodo() {
      console.log('Adding new todo:', this.newTodoTitle); // Debug
      if (this.newTodoTitle.trim() === "") return;
      const newTodo = createTodo(null, this.newTodoTitle, false);
      list.todos.push(newTodo);
      api
        .post(`/lists/${list.id}/todos`, {
          title: newTodo.title,
          completed: newTodo.completed,
        })
        .then((response) => {
          newTodo.id = response.data.id;
        });
        this.newTodoTitle = "";
    },
    removeTodo() {
      list.todos = list.todos.filter((t) => t.id !== todo.id);
      api.delete(`/todos/${todo.id}`);
    },
  };
}

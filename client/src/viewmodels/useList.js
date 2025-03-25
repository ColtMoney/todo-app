import { createTodo } from "../models/todo.js";

export function useList(list, api) {
  const state = {
    newTodoTitle: "",
  };

  function addTodo() {
    if (state.newTodoTitle.trim() === "") return;
    const newTodo = createTodo(null, state.newTodoTitle, false);
    list.todos.push(newTodo);
    api
      .post(`/lists/${list.id}/todos`, {
        title: newTodo.title,
        completed: newTodo.completed,
      })
      .then((response) => {
        newTodo.id = response.data.id;
      });
    state.newTodoTitle = "";
  }

  function removeTodo(todo) {
    list.todos = list.todos.filter((t) => t.id !== todo.id);
    api.delete(`/todos/${todo.id}`);
  }

  return {
    state,
    addTodo,
    removeTodo,
  };
}

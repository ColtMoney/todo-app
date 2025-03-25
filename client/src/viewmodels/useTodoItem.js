export function useTodoItem(todo, api) {
  async function updateTodo() {
    await api.put(`/todos/${todo.id}`, todo);
  }

  function deleteTodo() {
    this.$parent.removeTodo(todo);
  }

  return {
    updateTodo,
    deleteTodo,
  };
}

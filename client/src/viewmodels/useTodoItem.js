export function useTodoItem(todo, api) {
  return {
    async updateTodo() {
      await api.put(`/todos/${todo.id}`, todo);
    },
    deleteTodo() {
      this.$parent.removeTodo(todo);
    },
  };
}

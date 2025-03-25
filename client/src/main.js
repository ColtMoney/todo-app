import Alpine from "alpinejs";
import { api } from "./utils/api.js";
import { useLists } from "./viewmodels/useLists.js";
import { useList } from "./viewmodels/useList.js";
import { useTodoItem } from "./viewmodels/useTodoItem.js";

// Make Alpine globally available
window.Alpine = Alpine;

// Register Alpine data components
document.addEventListener("alpine:init", () => {
  Alpine.data("listManager", () => {
    const { state, fetchLists } = useLists(api);
    return {
      lists: state.lists,
      selectedListID: state.selectedListID,
      fetchLists
    };
  });

  Alpine.data("list", (list) => {
    const { state, addTodo, removeTodo } = useList(list, api);
    return {
      list,
      ...state,
      addTodo,
      removeTodo,
    };
  });

  Alpine.data("todoItem", (todo) => {
    const { updateTodo, deleteTodo } = useTodoItem(todo, api);
    return {
      todo,
      updateTodo,
      deleteTodo,
    };
  });
});

// Start Alpine.js
Alpine.start();

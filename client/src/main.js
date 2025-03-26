import Alpine from "alpinejs";
import { api } from "./utils/api.js";
import { useLists } from "./viewmodels/useLists.js";
import { useList } from "./viewmodels/useList.js";
import { useTodoItem } from "./viewmodels/useTodoItem.js";

// Make Alpine globally available
window.Alpine = Alpine;

// Register Alpine data components
document.addEventListener("alpine:init", () => {
  Alpine.data("listManager", () => useLists(api));

  Alpine.data("list", (list) => useList(list, api));

  Alpine.data("todoItem", (todo) => useTodoItem(todo, api));
});

// Start Alpine.js
Alpine.start();

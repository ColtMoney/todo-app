import { createList, fetchTodosForList, getLists } from "../models/list.js";

export function useLists() {
  return {
    lists: {},
    selectedListID: null,
    async fetchLists() {
      const lists = await getLists();
      console.log('API Response:', lists); // Debug

      for (const listData of lists) {
        const list = createList(listData.id, listData.name);
        list.todos = await fetchTodosForList(list.id);
        this.lists[list.id] = list;
      }

      console.log('Lists after fetch:', this.lists); // Debug

      if (Object.keys(this.lists).length > 0) {
        this.selectedListID = Object.keys(this.lists)[0];
      }
    },
  };
}

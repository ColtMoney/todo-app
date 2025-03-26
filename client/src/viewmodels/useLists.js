import { createList, fetchTodosForList } from "../models/list.js";

export function useLists(api) {
  return {
    lists: {},
    selectedListID: null,
    async fetchLists() {
      const response = await api.get("/lists");
      console.log('API Response:', response.data); // Debug
      for (const listData of response.data) {
        const list = createList(listData.id, listData.name);
        await fetchTodosForList(list, api);
        this.lists[list.id] = list;
      }
      console.log('Lists after fetch:', this.lists); // Debug
      if (Object.keys(this.lists).length > 0) {
        this.selectedListID = Object.keys(this.lists)[0];
      }
    },
  };
}

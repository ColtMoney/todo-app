import { createList, fetchTodosForList } from "../models/list.js";

export function useLists(api) {
  const state = {
    lists: { 1: { id: 1, name: "Work", todos: [] }, 2: { id: 1, name: "Personal", todos: [] } },
    selectedListID: null,
  };

  async function fetchLists() {
    const response = await api.get("/lists");
    console.log('API Response:', response.data); // Debug
    for (const listData of response.data) {
      const list = createList(listData.id, listData.name);
      await fetchTodosForList(list, api);
      state.lists[list.id] = list;
    }
    console.log('Lists after fetch:', state.lists); // Debug
    if (Object.keys(state.lists).length > 0) {
      state.selectedListID = Object.keys(state.lists)[0];
    }
  }

  return {
    state,
    fetchLists,
  };
}

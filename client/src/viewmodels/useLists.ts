import { getLists, addTodoToList } from '../models/repositories/list.ts';

import { List } from '../types/api/list.ts';

export default function useLists() {
  return {
    lists: {} as { [key: string]: List },
    selectedListID: null as string | null,
    async loadLists(): Promise<void> {
      const lists: List[] = await getLists();
      console.log('API Response:', lists); // Debug

      await Promise.all(
        lists.map(async (list) => {
          const updatedList = { ...list, todos: await addTodoToList(list.id) };
          this.lists[list.id] = updatedList;
        }),
      );

      console.log('Lists after fetch:', this.lists); // Debug

      const firstKey = Object.keys(this.lists)[0];
      this.selectedListID = firstKey || null;
    },
  };
}

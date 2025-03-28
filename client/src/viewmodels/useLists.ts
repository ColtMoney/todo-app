import { createList, fetchTodosForList, getLists } from '../models/list.ts';
import { Todo } from '../models/todo.ts';

export interface List {
  id: number;
  name: string;
  todos: Todo[];
}

export default function useLists() {
  return {
    lists: {} as { [key: string]: List },
    selectedListID: null as string | null,
    async fetchLists(): Promise<void> {
      const lists: List[] = await getLists();
      console.log('API Response:', lists); // Debug

      await Promise.all(
        lists.map(async ({ id, name }) => {
          const list: List = createList(id, name);
          list.todos = await fetchTodosForList(id);
          this.lists[id] = list;
        }),
      );

      console.log('Lists after fetch:', this.lists); // Debug

      const firstKey = Object.keys(this.lists)[0];
      this.selectedListID = firstKey || null;
    },
  };
}

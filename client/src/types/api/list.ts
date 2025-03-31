import { Todo } from './todo.ts';

export interface List {
  id: number;
  name: string;
  todos: Todo[];
}

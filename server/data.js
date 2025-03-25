// Mocked in-memory data
let lists = [
  { id: 1, name: "Work", todos: [] },
  { id: 2, name: "Personal", todos: [] },
];

let todos = [
  { id: 1, listId: 1, title: "Finish report", completed: false },
  { id: 2, listId: 1, title: "Team meeting", completed: true },
];

let nextListId = 3;
let nextTodoId = 3;

// Mocked API functions
export const getLists = () => lists;

export const getListById = (id) =>
  lists.find((list) => list.id === parseInt(id));

export const getTodosByListId = (listId) =>
  todos.filter((todo) => todo.listId === parseInt(listId));

export const createList = (name) => {
  const newList = { id: nextListId++, name, todos: [] };
  lists.push(newList);
  return newList;
};

export const createTodo = (listId, title, completed = false) => {
  const newTodo = {
    id: nextTodoId++,
    listId: parseInt(listId),
    title,
    completed,
  };
  todos.push(newTodo);
  const list = getListById(listId);
  if (list) list.todos.push(newTodo);
  return newTodo;
};

export const updateTodo = (id, updates) => {
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) return null;
  Object.assign(todo, updates);
  const list = getListById(todo.listId);
  if (list) {
    const listTodo = list.todos.find((t) => t.id === todo.id);
    if (listTodo) Object.assign(listTodo, updates);
  }
  return todo;
};

export const deleteTodo = (id) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  if (todoIndex === -1) return false;
  const todo = todos[todoIndex];
  todos.splice(todoIndex, 1);
  const list = getListById(todo.listId);
  if (list) {
    const listTodoIndex = list.todos.findIndex((t) => t.id === todo.id);
    if (listTodoIndex !== -1) list.todos.splice(listTodoIndex, 1);
  }
  return true;
};

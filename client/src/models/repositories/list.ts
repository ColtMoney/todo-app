import errorHandler from '../../helpers/errorHandler.ts';
import { List } from '../../types/api/list.ts';
import { fetchLists, fetchTodosForList } from '../services/api.ts';

const CACHE_KEY = 'cachedList';
const CACHE_TIMESTAMP_KEY = 'lastFetchTimestamp';
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

// Load initial cache from localStorage
let cachedLists = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
let lastFetchTimestamp = parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY) || '0', 10);

// Helper to update cache and localStorage
const updateCache = (lists: List[]) => {
  cachedLists = lists;
  lastFetchTimestamp = Date.now();
  localStorage.setItem(CACHE_KEY, JSON.stringify(cachedLists));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, lastFetchTimestamp.toString());
};

export async function getLists() {
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetchTimestamp;

  // If less than 1 minute has passed and we have cached data, return it
  if (timeSinceLastFetch < CACHE_DURATION && cachedLists.length > 0) {
    console.log('Returning cached lists');
    return cachedLists;
  }

  try {
    const rawLists = await fetchLists();
    const transformedLists = rawLists.map((data) => ({
      id: data.id,
      name: data.name,
      todos: data.todos,
    }));
    updateCache(transformedLists);
    return transformedLists;
  } catch (e) {
    // Return cached data if available, even on error
    if (cachedLists.length > 0) {
      console.log('Falling back to cached lists due to error');
      return cachedLists;
    }
    throw new Error(errorHandler(e));
  }
}

export async function addTodoToList(id: number) {
  try {
    const rawTodo = await fetchTodosForList(id);
    const newTodo = rawTodo.map((data) => ({
      id: data.id,
      title: data.title,
      completed: data.completed,
    }));
    // Update the cached list with the new todo
    const listIndex = cachedLists.findIndex((list: List) => list.id === id);
    if (listIndex !== -1) {
      cachedLists[listIndex].todos = newTodo;
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachedLists));
    }
    return newTodo;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

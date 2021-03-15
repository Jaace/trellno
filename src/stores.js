import { writable } from 'svelte-persistent-store/local.js';

export const lists = writable('lists', [
  { title: 'To Do', id: Math.random(), cards: [] },
  { title: 'Doing', id: Math.random(), cards: [] },
  { title: 'Done', id: Math.random(), cards: [] },
])

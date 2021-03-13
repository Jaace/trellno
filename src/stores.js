import { writable } from 'svelte-persistent-store/local.js';

export const cards = writable('cards', []);
export const lists = writable('lists', [
  { title: 'To Do', id: Math.random() },
  { title: 'Doing', id: Math.random() },
  { title: 'Done', id: Math.random() },
]);

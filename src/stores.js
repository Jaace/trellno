import { writable } from 'svelte-persistent-store/local.js';

export const version = 1.1;

export const lists = writable('lists', {
  version: 1.1,
  lists: [
    { title: 'To Do', id: Math.random(), cards: [] },
    { title: 'Doing', id: Math.random(), cards: [] },
    { title: 'Done', id: Math.random(), cards: [] },
  ],
});

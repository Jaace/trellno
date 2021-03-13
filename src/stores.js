import { writable } from 'svelte-persistent-store/local.js';

export const cards = writable('cards', []);
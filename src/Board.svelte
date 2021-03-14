<script>
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';

  import { lists } from './stores.js';
  import Cards from './Cards.svelte';

  let listCreateForm = false;
  let list = {};
  const flipDurationMs = 200;

  function createList() {
    list.id = Math.random();
    lists.update((lists) => [...lists, list]);
    toggleCreate();
    list = {};
  }

  function toggleCreate() {
    listCreateForm = !listCreateForm;
  }

  function handleDndConsiderColumns(e) {
    $lists = e.detail.items;
  }
  function handleDndFinalizeColumns(e) {
    $lists = e.detail.items;
  }
</script>

<ul
  use:dndzone={{ items: $lists, flipDurationMs, type: 'columns' }}
  on:consider={handleDndConsiderColumns}
  on:finalize={handleDndFinalizeColumns}
>
  {#each $lists as list (list.id)}
    <li animate:flip={{ duration: flipDurationMs }}>
      <h2 contenteditable bind:textContent={list.title} />
      <Cards listId={list.id} />
    </li>
  {/each}
  <li>
    {#if !listCreateForm}
      <button on:click={toggleCreate}>Add List</button>
    {:else}
      <h2 contenteditable bind:textContent={list.title} />
      <button on:click={toggleCreate}>Cancel</button>
      <button on:click={createList}>Save</button>
    {/if}
  </li>
</ul>

<style>
  ul {
    height: 90vh;
    width: 100%;
    padding: 0.5em;
    margin-bottom: 40px;

    display: grid;
    grid-auto-columns: 272px;
    grid-auto-flow: column;
    grid-gap: 8px;
    overflow: scroll;
    list-style-type: none;
    padding: 0;
    text-align: left;
  }

  li {
    background-color: rgb(235, 236, 240);
    border-radius: 3px;
    padding: 10px;
  }
</style>

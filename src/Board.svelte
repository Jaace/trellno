<script>
  import { lists } from './stores.js';
  import Cards from './Cards.svelte';

  let listCreateForm = false;
  let list = {};

  function createList() {
    list.id = Math.random();
    lists.update((lists) => [...lists, list]);
    toggleCreate();
    list = {};
  }

  function toggleCreate() {
    listCreateForm = !listCreateForm;
  }
</script>

<ul>
  {#each $lists as list}
    <li>
      <h2 contenteditable bind:textContent={list.title}></h2>
      <Cards listId={list.id} />
    </li>
  {/each}
  <li>
    {#if !listCreateForm}
      <button on:click={toggleCreate}>Add List</button>
    {:else}
      <h2 contenteditable bind:textContent={list.title}></h2>
      <button on:click={toggleCreate}>Cancel</button>
      <button on:click={createList}>Save</button>
    {/if}
  </li>
</ul>



<style>
  ul {
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

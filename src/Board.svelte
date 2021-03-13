<script>
  import { lists } from './stores.js';
  import Cards from './Cards.svelte';

  function createList() {
    console.log('Create list...');
  }
</script>

<ul>
  {#each $lists as list}
    <li>
      <h2 contenteditable bind:textContent={list.title}></h2>
      <Cards listId={list.id} />
    </li>
  {/each}
  <li><button on:click={createList}>Add List</button></li>
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

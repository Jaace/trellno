<script>
  import Cards from './Cards.svelte';

  const board = {
    lists: ['To Do', 'Doing', 'Done'],
  };

  function createList() {
    console.log('Create list...');
  }
</script>

<ul>
  {#each board.lists as list}
    <li>
      <h2>{list}</h2>
      <!-- TODO: Need a unique identifier per list as names and order can change. Using name for now. -->
      <Cards listId={list} />
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
  }

  li {
    background-color: rgb(235, 236, 240);
    border-radius: 3px;
    padding: 10px;
  }
</style>

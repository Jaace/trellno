<script>
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';

  import { lists } from './stores.js';
  import Cards from './Cards.svelte';

  let listCreateForm = false;
  let list = {};
  const flipDurationMs = 200;

  function addList() {
    list.id = Math.random();
    list.cards = [];
    $lists = [...lists.lists, list];
  }

  function saveList() {
    if (list.title) {
      addList(list);
      toggleCreate();
      list = {};
    }
  }

  function cancelList() {
    list = {};
    toggleCreate();
  }

  function toggleCreate() {
    listCreateForm = !listCreateForm;
  }

  function keyboardControls(e) {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      return saveList();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      return cancelList();
    }
  }

  function handleDndConsiderColumns(e) {
    $lists.lists = e.detail.items;
  }

  function handleDndFinalizeColumns(e) {
    $lists.lists = e.detail.items;
  }
</script>

<ul
  use:dndzone={{ items: $lists.lists, flipDurationMs, type: 'columns' }}
  on:consider={handleDndConsiderColumns}
  on:finalize={handleDndFinalizeColumns}
>
  {#each $lists.lists as list (list.id)}
    <li animate:flip={{ duration: flipDurationMs }} class="list">
      <h2 contenteditable bind:textContent={list.title} />
      <Cards listId={list.id} />
    </li>
  {/each}
  <li>
    {#if !listCreateForm}
      <button on:click={toggleCreate}>Add List</button>
    {:else}
      <!-- svelte-ignore a11y-autofocus -->
      <h2
        contenteditable
        bind:textContent={list.title}
        autofocus
        on:keydown={keyboardControls}
        placeholder="Enter a title for this list..."
      />

      <button on:click={cancelList}>Cancel</button>
      <button on:click={saveList}>Save</button>
    {/if}
  </li>
</ul>

<style>
  ul {
    display: grid;
    grid-auto-columns: 272px;
    grid-auto-flow: column;
    grid-gap: 8px;
    overflow-x: scroll;
    list-style-type: none;
    padding: 0;
    text-align: left;
  }

  .list {
    background-color: rgb(235, 236, 240);
    border-radius: 3px;
    padding: 10px;

    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 10px;
  }

  h2 {
    cursor: text;
  }

  h2[placeholder]:empty:before {
    color: rgba(0, 0, 0, 0.5);
    content: attr(placeholder);
  }
</style>

<script>
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';

  import { lists } from './stores.js';
  export let listId;

  let card = {};
  let createCardForm = false;
  const flipDurationMs = 200;

  // Note: if this is not reactive, e.g. const listIndex, we get interesting rendering bugs.
  $: listIndex = $lists.lists.findIndex((storedList) => storedList.id === listId);

  function addCard(card) {
    $lists.lists[listIndex].cards = [...$lists.lists[listIndex].cards, card];
  }

  function saveCard() {
    if (card.title) {
      card.id = Math.random();
      addCard(card);
      card = {};
    }
  }

  function cancelCard() {
    card = {};
    toggleCreate();
  }

  function toggleCreate() {
    createCardForm = !createCardForm;
  }

  function keyboardControls(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return saveCard();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      return cancelCard();
    }
  }

  function handleDndConsiderCards(e) {
    $lists.lists[listIndex].cards = e.detail.items;
  }

  function handleDndFinalizeCards(e) {
    $lists.lists[listIndex].cards = e.detail.items;
  }
</script>

<div
  class="list"
  use:dndzone={{ items: $lists.lists[listIndex].cards, flipDurationMs }}
  on:consider={handleDndConsiderCards}
  on:finalize={handleDndFinalizeCards}
>
  {#each $lists.lists[listIndex].cards as card (card.id)}
    <div animate:flip={{ duration: flipDurationMs }} class="card">
      <div>{card.title}</div>
    </div>
  {/each}
</div>
<div>
  {#if createCardForm}
    <!-- svelte-ignore a11y-autofocus -->
    <div
      class="card"
      contenteditable
      bind:textContent={card.title}
      autofocus
      on:keydown={keyboardControls}
      placeholder="Enter a title for this card..."
    />
  {/if}
</div>
<div>
  {#if !createCardForm}
    <button on:click={toggleCreate}>Create Card</button>
  {:else}
    <button on:click={cancelCard}>Cancel</button>
    <button on:click={saveCard}>Save</button>
  {/if}
</div>

<style>
  .list {
    list-style-type: none;
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 10px;
    padding: 0;
    min-height: 38px;
  }

  .card {
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  }

  div .card {
    padding: 10px;
  }

  .card[placeholder]:empty:before {
    color: rgba(0, 0, 0, 0.5);
    content: attr(placeholder);
  }
</style>

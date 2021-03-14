<script>
  import { cards } from './stores.js';
  export let listId;

  let card = { listId };
  let createCardForm = false;

  function addCard(card) {
    cards.update((cards) => [...cards, card]);
  }

  function saveCard() {
    if (card.title) {
      addCard(card);
      card = { listId };
    }
  }

  function cancelCard() {
    card = { listId };
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
</script>

<ul>
  {#each $cards as card}
    {#if card.listId === listId}
      <li contenteditable bind:textContent={card.title} />
    {/if}
  {/each}
  {#if createCardForm}
    <!-- svelte-ignore a11y-autofocus -->
    <li
      contenteditable
      bind:textContent={card.title}
      autofocus
      on:keydown={keyboardControls}
      placeholder="Enter a title for this card..."
    />
  {/if}
</ul>

{#if !createCardForm}
  <button on:click={toggleCreate}>Create Card</button>
{:else}
  <button on:click={cancelCard}>Cancel</button>
  <button on:click={saveCard}>Save</button>
{/if}

<style>
  ul {
    list-style-type: none;
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 10px;
    padding: 0;
  }

  li {
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    padding: 10px;
  }

  li[placeholder]:empty:before {
    color: rgba(0, 0, 0, 0.5);
    content: attr(placeholder);
  }
</style>

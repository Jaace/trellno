<script>
  import { cards } from './stores.js';
  export let listId;

  let card = { listId };
  let createCardForm = false;

  function addCard(card) {
    cards.update((cards) => [...cards, card]);
  }

  function createCard() {
    if (card.title) {
      addCard(card);
    } else {
      throw 'You must enter a title for this card.';
    }
    toggleCreate();
    card = { listId };
  }

  function toggleCreate() {
    createCardForm = !createCardForm;
  }
</script>

<ul>
  {#each $cards as card}
    {#if card.listId === listId }
    <li contenteditable bind:textContent={card.title}></li>
    {/if}
  {/each}
  {#if createCardForm}
    <li contenteditable bind:textContent={card.title}></li>
  {/if}
</ul>

{#if !createCardForm}
  <button on:click={toggleCreate}>Create Card</button>
{:else}
  <button on:click={toggleCreate}>Cancel</button>
  <button on:click={createCard}>Save</button>
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
</style>

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
    card = {};
  }

  function toggleCreate() {
    createCardForm = !createCardForm;
  }
</script>

<ul>
  {#each $cards as card, i}
    {#if card.listId === listId }
    <li>Title: {card.title}<br />Description: {card.description}</li>
    {/if}
  {/each}
</ul>

{#if !createCardForm}
  <button on:click={toggleCreate}>Create Card</button>
{:else}
  <div>
    <label for="title"
      >Title
      <input bind:value={card.title} /></label
    >
    <label for="description"
      >Description
      <textarea bind:value={card.description} /></label
    >
    <div>
      Preview:<br />
      Title: {card.title}<br />
      Description: {card.description}
    </div>
    <button on:click={toggleCreate}>Cancel</button>
    <button on:click={createCard}>Save</button>
  </div>
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

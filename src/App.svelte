<script>
  import Board from './Board.svelte';
  import { version, lists } from './stores.js';
</script>

<main>
  {#if $lists.version !== version}
    This application is currently for demo purposes only.<br />You're running version
    <pre> {$lists.version}</pre>
    and this application has been updated to
    <pre>{version}</pre>
    .<br /><br />
    You need to update and reset your saved local session data in order to keep using. Visit dev tools > Application > Local Storage > Clear All.
  {:else}
    <h1>TrellllllllNo!</h1>
    <Board />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  pre {
    display: inline-block;
    color: #ff3e00;
    background-color: #efefef;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

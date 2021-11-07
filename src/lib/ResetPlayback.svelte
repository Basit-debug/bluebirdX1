<script>
  // import Button from '@smui/button';
  import { play, reset } from '../stores.js';

  function onReset(event) {
    reset.set(true);
    reset.set(false);
    play.pause();
  }
</script>

<button on:click={onReset}> Reset </button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    padding: 1em 2em;
    color: rgb(26, 17, 2);
    background-color: rgba(2, 5, 49, 0.23);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>

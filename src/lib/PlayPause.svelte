<script>
  // import Button from '@smui/button';
  import { play } from '../stores.js';

  function onPlayPause(event) {
    play.toggle();
  }
</script>

<button on:click={onPlayPause}>
  {$play ? 'Pause' : 'Play'}
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    margin-left: 28em;
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

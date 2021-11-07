<script>
  import Video from './Video.svelte';
  import PlayPause from './PlayPause.svelte';
  import ResetPlayback from './ResetPlayback.svelte';
  import { play, reset } from '../stores.js';
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';

  let video;

  onMount(async () => {
    const unsubscribePlay = play.subscribe((status) =>
      status ? video.play() : video.pause()
    );

    const unsubscribeReset = reset.subscribe((reset) => {
      video.reset();
    });
  });

  onDestroy(() => {
    unsubscribePlay();
    unsubscribeReset();
  });
</script>

<PlayPause />
<ResetPlayback />
<Video bind:this={video} />

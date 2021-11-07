<script>
  // lang="ts">
  import Overlay from './Overlay.svelte';
  import { play as splay, reset as sreset, scalingFactor } from '../stores.js';

  let video; //: HTMLVideoElement;
  let canvas;

  export function play() {
    video.play();
  }

  export function pause() {
    video.pause();
  }

  export function reset() {
    pause();
    video.currentTime = 0;
    //play();
  }

  function onLoadedData() {
    if (video) {
      scalingFactor.set(video.videoWidth / video.width);
      video.width = video.videoWidth / $scalingFactor;
      video.height = video.videoHeight / $scalingFactor;
      canvas.width = video.width;
      canvas.height = video.height;
      //console.log(video);
      //console.log(video.videoWidth);
      //console.log(video.videoHeight);
      //console.log(canvas);
    }
  }
  function onEnded() {
    splay.stop();
    sreset.set(true);
  }
</script>

<div id="container">
  <video
    id="video"
    width="960"
    height="540"
    bind:this={video}
    on:loadeddata={onLoadedData}
    on:ended={onEnded}
  >
    <source src="videos/left.mp4" type="video/mp4" />
    <track
      src="captions_en.vtt"
      kind="captions"
      srclang="en"
      label="english_captions"
    />
  </video>

  <canvas id="canvas" width="960" height="540" bind:this={canvas} />

  <Overlay {canvas} />
</div>

<style>
  #container {
    position: relative;
  }
  #canvas {
    position: absolute;
    padding: 0;
    margin-left: 12em;
    z-index: 1;
  }
  #video {
    position: absolute;
    padding: 0;
    margin-left: 12em;
  }
</style>

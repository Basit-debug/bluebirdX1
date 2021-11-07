<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import * as annotations from '../data/data.json';
  import * as annotationsSchema from '../data/dataschema.json';
  import { validate } from 'jsonschema';
  import { play, reset, scalingFactor as sf } from '../stores.js';

  let canvas;
  let scalingFactor;
  let count = 0;
  let frameMs =
    annotations.default[1].utc_time - annotations.default[0].utc_time;
  let ctx;

  onMount(async () => {
    let frameInterval;
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    validate(annotations.default, annotationsSchema.default);

    const unsubscribeScalingFactor = sf.subscribe((factor) => {
      scalingFactor = factor;
    });

    const unsubscribePlay = play.subscribe((status) => {
      if (status) {
        frameInterval = setInterval(() => {
          clearCanvas();
          count++;
          if (annotations.default[count].ball) {
            annotateBall(
              annotations.default[count].ball[0] / scalingFactor,
              annotations.default[count].ball[1] / scalingFactor
            );
          }
          let player;
          annotations.default[count].detections.forEach((player) => {
            annotatePlayer(
              player[0] / scalingFactor,
              player[1] / scalingFactor,
              player[2] / scalingFactor,
              player[3] / scalingFactor
            );
          });
        }, frameMs);
      } else {
        if (frameInterval) {
          clearInterval(frameInterval);
        }
      }
    });

    const unsubscribeReset = reset.subscribe((r) => {
      if (r) {
        clearInterval(frameInterval);
        clearCanvas();
        count = 0;
      }
    });
  });

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function annotateBall(x, y) {
    // console.log("Ball: ", x, y);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  function annotatePlayer(ox, oy, x, y) {
    // console.log("Player: ", ox, oy, x, y);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(ox, oy, x, y);
    ctx.stroke();
  }

  onDestroy(() => {
    if (frameInterval) {
      clearInterval(frameInterval);
    }
    unsubscribePlay();
    unsubscribeReset();
  });
</script>

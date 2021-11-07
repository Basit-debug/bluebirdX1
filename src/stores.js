import { writable } from 'svelte/store';

function createPlay() {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    play: () => set(true),
    pause: () => set(false),
    stop: () => set(false),
    toggle: () => update((status) => !status),
    reset: () => set(false),
  };
}

export const play = createPlay();

export const reset = writable(false);

export const scalingFactor = writable(1);

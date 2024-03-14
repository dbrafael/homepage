<script lang="ts">
  import { CanvasAdapter } from "$lib/js/background/galaxies";
  import { Clock, Position } from "$lib/js/common";
  import type { SiteConfig } from "$lib/js/config";
  import SITE_CONFIG from "$lib/js/config";
  import { onDestroy, onMount } from "svelte";

  const mouse: Position = Position.default();

  export let galaxies = 5;
  export let maxStars = 100;
  export let width = 0;
  export let height = 0;

  let config: SiteConfig = SITE_CONFIG;
  let canvas: HTMLCanvasElement;
  let adapter: CanvasAdapter;
  let context: CanvasRenderingContext2D;
  let clock: Clock;

  $: { if (adapter) adapter.updateSize(width, height); }

  const onTick = (dt: number) => {
    adapter.tick(mouse, dt);
    adapter.render(context);
  };
    
  clock = new Clock(config.background.tickLength, onTick);
  
  onMount(() => {
    context = canvas.getContext("2d")!;
    adapter = new CanvasAdapter({
      width,
      height,
      maxStars,
      galaxies
    });

    clock.start()
  })
  
  onDestroy(() => {
    if (clock) clock.stop();
  })
</script>

<canvas
  id="background"
  bind:this={canvas}
  class="background container flex-col"
  {width}
  {height}
/>

<style lang="scss">
  #background {
    pointer-events: none;
    background: black;
    transform: perspective(1000px);
  }
</style>

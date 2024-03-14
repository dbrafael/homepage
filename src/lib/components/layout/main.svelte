<script>
  import Stars from "$lib/components/background/stars.svelte";
  import { onMount } from "svelte";

  let dom;

  let width = 0;
  let height = 0;

  const onResize = () => {
    width = dom.clientWidth;
    height = dom.clientHeight;
  };

  onMount(onResize);
</script>

<svelte:window on:resize={onResize} />

<div class="main-container container flex-col-start" bind:this={dom}>
  <Stars maxStars={100} galaxies={5} {width} {height} />
  <main class="bg-dark">
    <slot />
  </main>
</div>

<style lang="scss">
  .main-container {
    position: relative;
    margin-top: var(--header-height);
    overflow: hidden;

    > main {
      overflow: auto;
      margin: 20px;
      padding: 20px 40px;
      width: 100%;
      max-width: min(1120px, calc(100% - 120px));
      opacity: 0.95;
    }

    > :global(.background) {
      z-index: -1;
      position: absolute;
      top: 0;
    }
  }
</style>

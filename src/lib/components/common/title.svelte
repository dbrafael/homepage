<script>
  import "$lib/css/animations.scss";

  export let title = "";
  export let href = "";
  export let margin = "0";
  export let padding = "0";

  $: style = `margin: ${margin}; padding: ${padding};`;
</script>

{#if href !== ""}
  <a class="title" {href} {style}>
    <strong>{title}</strong>
    <strong class="outline" aria-hidden="true">{title}</strong>
    <strong class="shadow" aria-hidden="true">{title}</strong>
  </a>
{:else}
  <h1 class="title" {style}>
    <strong>{title}</strong>
    <strong class="outline" aria-hidden="true">{title}</strong>
    <strong class="shadow" aria-hidden="true">{title}</strong>
  </h1>
{/if}

<style lang="scss">
  .title {
    font-size: 2em;
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    animation: bounce 1s;
    color: var(--color-light);
    z-index: 1;

    .outline,
    .shadow {
      position: absolute;
      width: 100%;
      opacity: 0.6;

      animation: fadeIn 0.5s;
    }

    .outline {
      top: 1px;
      left: -1px;
      color: black;
      opacity: 1;
      z-index: -1;
    }

    .shadow {
      position: absolute;
      top: 3px;
      left: -3px;
      color: var(--color-shifting);
      opacity: 1;
      z-index: -2;
    }
  }
</style>

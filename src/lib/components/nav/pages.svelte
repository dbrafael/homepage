<script>
  import Link from "$lib/components/common/link.svelte";
  import SITE_CONFIG from "$lib/js/config";

  export let vertical = false;
  
  const pages = SITE_CONFIG.pages;
</script>

<nav class={vertical ? "flex-col" : "flex-row"}>
  {#each pages as page}
    {#if !page.hidden}
      <Link href={page.path} label={page.title} classes="nav-link light" />
    {/if}
  {/each}
</nav>

<style lang="scss">
  nav > :global(.nav-link) {
    margin: 8px;
  }
</style>

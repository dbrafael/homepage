<script lang="ts">
  import "$lib/css/animations.scss";
  import Nav from "$lib/components/nav/pages.svelte";
  import Title from "../common/title.svelte";

  let title = "Rafael Baptista";
</script>

<header class="container flex-row-center bg-dark">
  <div class="content flex-row-justify">
    <Title {title} href="/" />
    <Nav />
  </div>
</header>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    height: var(--header-height);
  }

  @media (max-width: 800px) {
    :global(header .title) {
      font-size: 1.25em !important;
      width: min-content;
    }
  }
</style>

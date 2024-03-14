<script lang="ts">
  import "$lib/css/common.scss";

  import Footer from "$lib/components/layout/footer.svelte";
  import Header from "$lib/components/layout/header.svelte";
  import Main from "$lib/components/layout/main.svelte";
  import Root from "$lib/components/root.svelte";
</script>
<Root>
  <Header />
  <Main>
    <slot />
  </Main>
  <Footer />
</Root>

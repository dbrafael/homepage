<script>
  import Title from "../common/title.svelte";

  export let title = "Home";
</script>

<div class="flex-col-start bg-dark">
  <Title {title} margin="10px" />
  <slot />
</div>

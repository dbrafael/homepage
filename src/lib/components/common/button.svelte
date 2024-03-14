<script>
  export let cb = () => {};
  export let label = "Button";
  export let classes = "light";
  export let styles = "";
</script>

<button class="btn {classes}" style={styles} on:click={cb}>
  <span class="btn-label">{label}</span>
</button>

<style lang="scss">
  @import "$lib/css/buttons.scss";

  .btn {
    @include button-light;
  }
</style>

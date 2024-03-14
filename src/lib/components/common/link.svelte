<script lang="ts">
  import { navigateTo } from "$lib/js/common";
  import type SessionManager from "$lib/js/store/session";
  import Button from "./button.svelte";
  import { getContext } from "svelte";

  export let href = "";
  export let label = "Button";
  export let classes = "light";
  export let styles = "";

  let session: SessionManager = getContext("session");

  const nav = () => {
    navigateTo(href, session);
  };
</script>

<Button cb={nav} {label} {classes} {styles} />

<style lang="scss">
</style>

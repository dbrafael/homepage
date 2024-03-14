<script lang="ts">
  import { Clock } from "$lib/js/common";
  import SITE_CONFIG from "$lib/js/config";
  import { getCVData, type CVData } from "$lib/js/store/cv";
  import SessionManager from "$lib/js/store/session";
  import { onDestroy, onMount, setContext } from "svelte";
  import { derived, writable, type Writable } from "svelte/store";

  let hue = writable(0);
  $: color = derived(hue, ($hue) => `hsl(${$hue}, 86%, 27%)`);
  let clock: Clock;

  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    let session = SessionManager.init();
    let config = SITE_CONFIG;
    let cv: Writable<Partial<CVData>> = writable({});

    setContext("cv", cv);
    setContext("session", session);

    hue = session.get("hue");

    clock = new Clock(config.gradient.tickLength, (dt) => {
      session.update(
        "hue",
        (hue) => (hue + (dt / config.gradient.fullCycleDuration) * 360) % 360,
      );
    });

    getCVData().then((_cv) => { cv.set(_cv) });
  }

  onMount(() => {
    if (clock) clock.start();
  })

  onDestroy(() => {
    if (clock) clock.stop();
  })
</script>

<div id="root" class="container flex-col-start" style="
  --color-shifting: {$color}
">
  <slot />
</div>

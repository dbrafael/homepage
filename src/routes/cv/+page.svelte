<script lang="ts">
  import Button from "$lib/components/common/button.svelte";
  import Content from "$lib/components/layout/content.svelte";
  import { withCVData } from "$lib/js/common";
  import type { CVData } from "$lib/js/store/cv";
  import jsPDF from "jspdf";

  let cv: CVData;
  let docDom: HTMLDivElement;
  let fileName = "cv.pdf";

  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    withCVData((_cv: CVData) => {
      cv = _cv;
      if (!cv || !cv.user) return;
      const name = cv.user.name.replace(/\s/g, "-").toLowerCase();
      fileName = `cv-${name}.pdf`;
    });
  }
  
  const openPdf = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(docDom, { 
      callback: (doc: jsPDF) => {
        doc.save(fileName);
      }
    });
  };
</script>

<Content title="Resume">
  {#if !cv || !cv.user}
    <p>Loading...</p>
  {:else}
    <div id="cv" class="flex-col-start" bind:this={docDom}>
      <div id="cv-p1" class="flex-col-start">
        <div class="flex-row-center cv-header">
          <div class="flex-col-start cv-header-brief box">
            <h1>{cv.user.name}</h1>
            <h2>{cv.user.title}</h2>
          </div>
          <div class="flex-col-start cv-header-info fill box">
            <span>Email: {cv.user.email}</span>
            <span>Phone: {cv.user.phone}</span>
            <span>Location: {cv.user.location}</span>
          </div>
        </div>
      </div>
      <div id="cv-p2" class="flex-col-start">
        <div class="flex-col-start box">
          <h2>Summary</h2>
          <p>Test</p>
        </div>
      </div>
    </div>
    <Button cb={openPdf} label="Download as PDF" />
  {/if}
</Content>

<style lang="scss">
  #cv {
    color: var(--color-dark);
    margin-bottom: 1em;
    font-size: 12px;

    h1 {
      font-size: 1.5em;
      margin: 0.25em 0;
    }

    h2 {
      font-size: 1.25em;
      margin: 0.25em 0;
    }

    div {
      align-items: start;
    }
  }

  [id^="cv-p"] {
    background-color: var(--color-light);
    width: 424.2px;
    height: 600px;
    aspect-ratio: 0.707;
    margin: 0.5em 0;
    padding: 1em;
  }

  .cv-header {
    width: 100%;

    div {
      height: 100%;
    }
  }

  .box {
    border: 2px solid black;
    padding: 0.25em;
    margin: 0.25em;
  }

  .fill {
    flex-grow: 1;
  }
</style>

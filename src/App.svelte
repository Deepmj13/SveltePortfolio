<script>
  import { onMount } from "svelte";
  import Hero from "./components/Hero.svelte";
  import WorkWithMe from "./components/WorkWithMe.svelte";
  import Loader from "./components/Loader.svelte";
  import Cursor from "./components/Cursor.svelte";

  let loader = true;

  onMount(() => {
    const handleLoad = () => {
      loader = false;
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  });
</script>

<Cursor />

{#if loader}
  <Loader />
{:else}
  <main>
    <Hero />
    <WorkWithMe />
  </main>
{/if}
